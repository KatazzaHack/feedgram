package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"FeedGram/types"
)

func GetMediaById(c *gin.Context) {
	media_id := c.Param("media_id")
	media_data := types.GlobalDatabase.MediaToData[media_id]
	// TODO: Get the media from the blob storage.
	c.String(http.StatusOK, "Media data received = %s", media_data)
}