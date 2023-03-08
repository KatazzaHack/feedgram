package handlers

import (
	"FeedGram/helpers"
	"FeedGram/types"
	"log"
	"net/http"

	"cloud.google.com/go/datastore"
	"github.com/gin-gonic/gin"
)

func GetPostById(c *gin.Context) {
	dSClient, _ := helpers.NewDatastoreClient()
	defer dSClient.Client.Close()
	postID := c.Param("post_id")
	var posts []types.PostInfo
	q := datastore.NewQuery("posts").Filter("post_id=", postID).Limit(1)
	if _, err := dSClient.Client.GetAll(c, q, &posts); err != nil {
		log.Fatalf("Failed to get post: %v", err)
	}
	c.JSON(http.StatusOK, gin.H{"description": posts[0].Description, "title": posts[0].Title, "media_ids": posts[0].MediaList})
}
