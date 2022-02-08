package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func GetMediaById(c *gin.Context) {
	media_id := c.Param("media_id")
	c.String(http.StatusOK, "https://storage.cloud.google.com/feedgram-images/blobs/%s", media_id)
}