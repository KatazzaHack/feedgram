package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func GetMediaById(c *gin.Context) {
	media_id := c.Param("media_id")
	c.JSON(http.StatusOK, gin.H {
		"id": "https://storage.cloud.google.com/feedgram-images/blobs/" + media_id})
}