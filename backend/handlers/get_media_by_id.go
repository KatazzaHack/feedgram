package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"FeedGram/utils"
)

func GetMediaById(c *gin.Context) {
	media_id := c.Param("media_id")
	u, _ := utils.GenerateV4GetObjectSignedURL(media_id)
	c.JSON(http.StatusOK, gin.H {
		"id": u,
		});
}