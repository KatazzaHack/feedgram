package handlers

import (
	"FeedGram/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMediaById(c *gin.Context) {
	media_id := c.Param("media_id")
	u, _ := utils.GenerateV4GetObjectSignedURL("blobs/" + media_id)
	c.JSON(http.StatusOK, gin.H{"id": u})
}
