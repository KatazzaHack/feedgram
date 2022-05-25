package handlers

import (

	"net/http"

	"github.com/gin-gonic/gin"
	"FeedGram/types"
	"cloud.google.com/go/datastore"
	"log"
	"os"
)

func GetMediaForUser(c *gin.Context) {
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

	user_id := users[0].UserId;
	// TODO: Get the media ids from the database based on the user.
	q = datastore.NewQuery("user_information").Filter("user_id=", user_id).Limit(1);
	var userInformation []types.UserInfo;
	if _, err := client.GetAll(c, q, &userInformation); err != nil {
		log.Fatalf("Failed to get user: %v", err)
	}
	c.JSON(http.StatusOK, gin.H {"ids": userInformation[0].MediaList})
}
