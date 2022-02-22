package handlers

import (

	"context"
	"time"
	"mime/multipart"
	"io"
	"fmt"
	"net/http"
	"os"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"FeedGram/types"
	"FeedGram/clients"
	"cloud.google.com/go/datastore"
)

func UploadFile(file multipart.File, object string) error {
	ctx := context.Background()

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	// Upload an object with storage.Writer.
	wc := clients.Uploader.Cl.Bucket(clients.Uploader.BucketName).Object(clients.Uploader.UploadPath + object).NewWriter(ctx)
	if _, err := io.Copy(wc, file); err != nil {
		return fmt.Errorf("io.Copy: %v", err)
	}
	if err := wc.Close(); err != nil {
		return fmt.Errorf("Writer.Close: %v", err)
	}

	return nil
}

func CreateNewMedia(c *gin.Context) {
	projectID := os.Getenv("PROJECTID")

	user_name := c.Param("user_name")

	client, err := datastore.NewClient(c, projectID)
    if err != nil {
        log.Fatalf("Failed to create client: %v", err)
	}
    defer client.Close()

	var users []types.User;
	q := datastore.NewQuery("user_mapping").Filter("user_name=", user_name).Limit(1);
	if _, err := client.GetAll(c, q, &users); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}

	user_id := users[0].UserId;


	q = datastore.NewQuery("user_information").Filter("user_id=", user_id).Limit(1);
	var userInformation []types.UserInfo;
	if _, err := client.GetAll(c, q, &userInformation); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}

	user_media_list := userInformation[0].MediaList;
	user_key := datastore.NameKey("user_information", user_id, nil)


	media_data, _ := c.FormFile("media_data")
	new_media_id := uuid.New().String()

	user_media_list = append(user_media_list, new_media_id)

	userInfo := types.UserInfo {
		UserName: userInformation[0].UserName,
		MediaList: user_media_list,
		UserId:  userInformation[0].UserId,
	}

	if _, err := client.Mutate(c, datastore.NewUpdate(user_key, &userInfo)); err != nil {
		log.Fatalf("Failed to update user: %v", err)
	}
	data, _ := media_data.Open()
	UploadFile(data, new_media_id)
	c.JSON(http.StatusOK, gin.H {"id": media_data.Filename})
}