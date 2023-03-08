package handlers

import (
	"context"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"time"

	"FeedGram/helpers"
	"FeedGram/types"

	"cloud.google.com/go/datastore"
	"cloud.google.com/go/logging"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func UploadFile(file multipart.File, object string) error {
	ctx := context.Background()

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	// Upload an object with storage.Writer.
	wc := helpers.Uploader.Cl.Bucket(helpers.Uploader.BucketName).Object(helpers.Uploader.UploadPath + object).NewWriter(ctx)
	if _, err := io.Copy(wc, file); err != nil {
		return fmt.Errorf("io.Copy: %v", err)
	}
	if err := wc.Close(); err != nil {
		return fmt.Errorf("Writer.Close: %v", err)
	}

	return nil
}

func CreateNewMedia(c *gin.Context) {
	loggingClient, _ := helpers.NewLoggingClient()
	defer loggingClient.Client.Close()
	logger := loggingClient.Client.Logger("my-log").StandardLogger(logging.Info)
	logger.Println("CreateNewMedia request")
	form, errF := c.MultipartForm()
	if errF != nil {
		logger.Println("Can not get multipart form %v", errF)
	}
	logger.Println("%v", form)

	userName := c.Param("user_name")
	logger.Println("%v - user to upload data", userName)

	dSClient, _ := helpers.NewDatastoreClient()
	defer dSClient.Client.Close()

	var users []types.User
	q := datastore.NewQuery("user_mapping").Filter("user_name=", userName).Limit(1)
	if _, err := dSClient.Client.GetAll(c, q, &users); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}

	userID := users[0].UserId

	logger.Println("%v - user_id to upload data", userID)

	q = datastore.NewQuery("user_information").Filter("user_id=", userID).Limit(1)
	var userInformation []types.UserInfo
	if _, err := dSClient.Client.GetAll(c, q, &userInformation); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}

	userMediaList := userInformation[0].MediaList
	userKey := datastore.NameKey("user_information", userID, nil)

	mediaData, _ := c.FormFile("file_to_upload")
	newMediaID := uuid.New().String()

	userMediaList = append(userMediaList, newMediaID)

	userInfo := types.UserInfo{
		UserName:  userInformation[0].UserName,
		MediaList: userMediaList,
		UserId:    userInformation[0].UserId,
	}

	if _, err := dSClient.Client.Mutate(c, datastore.NewUpdate(userKey, &userInfo)); err != nil {
		log.Fatalf("Failed to update user: %v", err)
	}
	data, _ := mediaData.Open()
	UploadFile(data, newMediaID)
	c.JSON(http.StatusOK, gin.H{"id": mediaData.Filename})
}
