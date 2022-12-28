package handlers

import (

	"net/http"
	"os"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"FeedGram/types"
	"FeedGram/utils"
	"cloud.google.com/go/datastore"
	"cloud.google.com/go/logging"
)

func SavePostInformation(
	c *gin.Context,
	de string, t string, uid string, muid string,
	client *datastore.Client) {
    kind := "posts"
    postKey := datastore.NameKey(kind, uid, nil)
	postInfo := types.PostInfo {
		Description: de,
		MediaList: 	 []string{muid},
		Id:			 uid,
		Title:		 t,
	}

	// Saves the new entity.
    if _, err := client.Put(c, postKey, &postInfo); err != nil {
		log.Fatalf("Failed to save user: %v", err)
	}
}

func CreateNewPost(c *gin.Context) {
	projectID := os.Getenv("PROJECTID")
	clientL, errL := logging.NewClient(c, projectID)

	if errL != nil {
      log.Fatalf("Failed to create client: %v", errL)
    }
    defer clientL.Close()

    logName := "my-log"
    logger := clientL.Logger(logName).StandardLogger(logging.Info)
    logger.Println("CreateNewMedia request")
    form, errF := c.MultipartForm()
    if errF != nil {
        logger.Println("Can not get multipart form %v", errF)
    }
    logger.Println("%v", form)

	user_name := c.Param("user_name")
	logger.Println("%v - user to upload data", user_name)

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

	logger.Println("%v - user_id to upload data", user_id)


	q = datastore.NewQuery("user_information").Filter("user_id=", user_id).Limit(1);
	var userInformation []types.UserInfo;
	if _, err := client.GetAll(c, q, &userInformation); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}

	user_media_list := userInformation[0].MediaList;
	user_post_list := userInformation[0].PostList;
	user_key := datastore.NameKey("user_information", user_id, nil)

	media_data, _ := c.FormFile("file_to_upload")
	title := c.PostForm("title")
	description := c.PostForm("description")
	new_media_id := uuid.New().String()
	new_post_id := uuid.New().String()

	user_media_list = append(user_media_list, new_media_id)
	user_post_list = append(user_post_list, new_post_id)

	userInfo := types.UserInfo {
		UserName: userInformation[0].UserName,
		MediaList: user_media_list,
		UserId:  userInformation[0].UserId,
		PostList: user_post_list,
	}

	if _, err := client.Mutate(c, datastore.NewUpdate(user_key, &userInfo)); err != nil {
		log.Fatalf("Failed to update user: %v", err)
	}

	SavePostInformation(c, description, title, new_post_id, new_media_id, client)

	data, _ := media_data.Open()
	utils.UploadFile(data, new_media_id)
	c.JSON(http.StatusOK, gin.H {"id": media_data.Filename})
}