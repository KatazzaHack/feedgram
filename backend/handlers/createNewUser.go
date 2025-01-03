package handlers

import (
	"FeedGram/helpers"
	"FeedGram/types"
	"log"
	"net/http"

	"cloud.google.com/go/datastore"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func SaveUserInformation(c *gin.Context, un string, uid string, client *datastore.Client) {
	kind := "user_information"

	userKey := datastore.NameKey(kind, uid, nil)

	userInfo := types.UserInfo{
		UserName:  un,
		MediaList: []string{},
		UserId:    uid,
		PostList:  []string{},
	}

	// Saves the new entity.
	if _, err := client.Put(c, userKey, &userInfo); err != nil {
		log.Fatalf("Failed to save user: %v", err)
	}
}

func SaveUserMapping(c *gin.Context, un string, uid string, client *datastore.Client) {
	dSClient, _ := helpers.NewDatastoreClient()
	defer dSClient.Client.Close()
	kind := "user_mapping"

	userKey := datastore.NameKey(kind, un, nil)

	user := types.User{
		UserName: un,
		UserId:   uid,
	}

	// Saves the new entity.
	if _, err := client.Put(c, userKey, &user); err != nil {
		log.Fatalf("Failed to save user: %v", err)
	}
}

func userExists(c *gin.Context, un string, cl *datastore.Client) bool {
	var users []types.User
	q := datastore.NewQuery("user_mapping").Filter("user_name=", un).Limit(1)
	if _, err := cl.GetAll(c, q, &users); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}
	return len(users) > 0
}

type NewUsername struct {
	UserName string `form:"user_name"`
}

func CreateNewUser(c *gin.Context) {
	username := NewUsername{}
	c.Bind(&username)
	dSClient, _ := helpers.NewDatastoreClient()
	defer dSClient.Client.Close()

	userID := uuid.New().String()
	userName := username.UserName
	if userExists(c, userName, dSClient.Client) {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "username": userName})
		return
	}
	SaveUserInformation(c, userName, userID, dSClient.Client)
	SaveUserMapping(c, userName, userID, dSClient.Client)
	c.JSON(http.StatusOK, gin.H{"status": "ok", "username": userName})
}
