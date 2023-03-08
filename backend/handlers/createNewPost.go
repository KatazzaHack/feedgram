package handlers

import (
	"log"
	"net/http"

	"FeedGram/helpers"
	"FeedGram/types"
	"FeedGram/utils"

	"cloud.google.com/go/datastore"
	"cloud.google.com/go/logging"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func SavePostInformation(
	c *gin.Context,
	de string, t string, uid string, muid string,
	client *datastore.Client) {
	kind := "posts"
	postKey := datastore.NameKey(kind, uid, nil)
	postInfo := types.PostInfo{
		Description: de,
		MediaList:   []string{muid},
		Id:          uid,
		Title:       t,
	}

	// Saves the new entity.
	if _, err := client.Put(c, postKey, &postInfo); err != nil {
		log.Fatalf("Failed to save user: %v", err)
	}
}

func CreateNewPost(c *gin.Context) {

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
	userPostList := userInformation[0].PostList
	userKey := datastore.NameKey("user_information", userID, nil)

	media_data, _ := c.FormFile("file_to_upload")
	title := c.PostForm("title")
	description := c.PostForm("description")
	new_media_id := uuid.New().String()
	new_post_id := uuid.New().String()

	userMediaList = append(userMediaList, new_media_id)
	userPostList = append(userPostList, new_post_id)

	userInfo := types.UserInfo{
		UserName:  userInformation[0].UserName,
		MediaList: userMediaList,
		UserId:    userInformation[0].UserId,
		PostList:  userPostList,
	}

	if _, err := dSClient.Client.Mutate(c, datastore.NewUpdate(userKey, &userInfo)); err != nil {
		log.Fatalf("Failed to update user: %v", err)
	}

	SavePostInformation(c, description, title, new_post_id, new_media_id, dSClient.Client)

	data, _ := media_data.Open()
	utils.UploadFile(data, new_media_id)
	c.JSON(http.StatusOK, gin.H{"id": media_data.Filename})
}
