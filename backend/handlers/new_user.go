package handlers

import (

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"cloud.google.com/go/datastore"
	"FeedGram/types"
    "log"
    "os"
)

func CreateNewUser(c *gin.Context) {

	projectID := os.Getenv("PROJECTID")

	client, err := datastore.NewClient(c, projectID)
    if err != nil {
        log.Fatalf("Failed to create client: %v", err)
	}
    defer client.Close()

    kind := "user_information"

	user_name := c.PostForm("user_name")
	user_id := uuid.New().String()

	userKey := datastore.NameKey(kind, user_id, nil)

	userInfo := types.UserInfo {
		UserName: user_name,
		MediaList: []string{"foo"},
		UserId:  user_id,
	}

	// Saves the new entity.
    if _, err := client.Put(c, userKey, &userInfo); err != nil {
		log.Fatalf("Failed to save user: %v", err)
	}
}
