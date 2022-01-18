package handlers

import (

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"cloud.google.com/go/datastore"
	"FeedGram/types"
    "log"
    "os"
)

func SaveUserInformation(c *gin.Context, un string, uid string, client *datastore.Client) {
    kind := "user_information"

    userKey := datastore.NameKey(kind, uid, nil)

	userInfo := types.UserInfo {
		UserName: un,
		MediaList: []string{},
		UserId:  uid,
	}

	// Saves the new entity.
    if _, err := client.Put(c, userKey, &userInfo); err != nil {
		log.Fatalf("Failed to save user: %v", err)
	}
}

func SaveUserMapping(c *gin.Context, un string, uid string, client *datastore.Client) {
	projectID := os.Getenv("PROJECTID")

	client, err := datastore.NewClient(c, projectID)
    if err != nil {
        log.Fatalf("Failed to create client: %v", err)
	}
    defer client.Close()
    kind := "user_mapping"

    userKey := datastore.NameKey(kind, un, nil)

	user := types.User {
		UserName: un,
		UserId:  uid,
	}

	// Saves the new entity.
    if _, err := client.Put(c, userKey, &user); err != nil {
		log.Fatalf("Failed to save user: %v", err)
	}
}

func CreateNewUser(c *gin.Context) {
	projectID := os.Getenv("PROJECTID")

	client, err := datastore.NewClient(c, projectID)
    if err != nil {
        log.Fatalf("Failed to create client: %v", err)
	}
    defer client.Close()
	user_name := c.PostForm("user_name")
	user_id := uuid.New().String()
	SaveUserInformation(c, user_name, user_id, client);
	SaveUserMapping(c, user_name, user_id, client);
}