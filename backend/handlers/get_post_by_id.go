package handlers

import (
	"FeedGram/types"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/datastore"
	"github.com/gin-gonic/gin"
)

func GetPostById(c *gin.Context) {
	projectID := os.Getenv("PROJECTID")
	client, err := datastore.NewClient(c, projectID)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()
	post_id := c.Param("post_id")
	var posts []types.PostInfo
	q := datastore.NewQuery("posts").Filter("post_id=", post_id).Limit(1)
	if _, err := client.GetAll(c, q, &posts); err != nil {
		log.Fatalf("Failed to get post: %v", err)
	}
	c.JSON(http.StatusOK, gin.H{"description": posts[0].Description, "title": posts[0].Title, "media_ids": posts[0].MediaList})
}
