package handlers

import (
	"log"
	"net/http"

	"cloud.google.com/go/datastore"
	"cloud.google.com/go/logging"
	"github.com/gin-gonic/gin"

	"FeedGram/helpers"
	"FeedGram/types"
)

func GetPostsForUser(c *gin.Context) {
	dSClient, _ := helpers.NewDatastoreClient()
	defer dSClient.Client.Close()

	userName := c.Param("user_name")
	var users []types.User
	q := datastore.NewQuery("user_mapping").Filter("user_name=", userName).Limit(1)
	if _, err := dSClient.Client.GetAll(c, q, &users); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}

	loggingClient, _ := helpers.NewLoggingClient()
	defer loggingClient.Client.Close()
	logger := loggingClient.Client.Logger("my-log").StandardLogger(logging.Info)

	userID := users[0].UserId
	// TODO: Get the media ids from the database based on the user.
	q = datastore.NewQuery("user_information").Filter("user_id=", userID).Limit(1)
	var userInformation []types.UserInfo
	if _, err := dSClient.Client.GetAll(c, q, &userInformation); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}
	logger.Println("Returned media for user %v %v", userID, userInformation)
	c.JSON(http.StatusOK, gin.H{"post_ids": userInformation[0].PostList})
}
