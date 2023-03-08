package handlers

import (
	"FeedGram/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMediaById(c *gin.Context) {
	mediaID := c.Param("media_id")
	u, _ := utils.GenerateV4GetObjectSignedURL("blobs/" + mediaID)
	c.JSON(http.StatusOK, gin.H{"id": u})
}
