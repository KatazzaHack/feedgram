package handlers

import (

	"net/http"
	"log"
	"os"

	"cloud.google.com/go/datastore"
	"cloud.google.com/go/logging"
	"github.com/gin-gonic/gin"

	"FeedGram/types"
)

func GetPostsForUser(c *gin.Context) {
	projectID := os.Getenv("PROJECTID")

	client, err := datastore.NewClient(c, projectID)
    if err != nil {
        log.Fatalf("Failed to create client: %v", err)
	}
    defer client.Close()

	user_name := c.Param("user_name")
	var users []types.User;
	q := datastore.NewQuery("user_mapping").Filter("user_name=", user_name).Limit(1);
	if _, err := client.GetAll(c, q, &users); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}

	clientL, errL := logging.NewClient(c, projectID)

    if errL != nil {
        log.Fatalf("Failed to create client: %v", errL)
    }
    defer clientL.Close()

    logName := "my-log"
    logger := clientL.Logger(logName).StandardLogger(logging.Info)

	user_id := users[0].UserId;
	// TODO: Get the media ids from the database based on the user.
	q = datastore.NewQuery("user_information").Filter("user_id=", user_id).Limit(1);
	var userInformation []types.UserInfo;
	if _, err := client.GetAll(c, q, &userInformation); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}
	logger.Println("Returned media for user %v %v", user_id, userInformation)
	c.JSON(http.StatusOK, gin.H {"post_ids": userInformation[0].PostList})
}
