package handlers

import (

	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"FeedGram/types"
)

func GetMediaForUser(c *gin.Context) {
	user_name := c.Param("user_name")
	user_id := types.GlobalDatabase.UserNameToId[user_name]
	// TODO: Get the media ids from the database based on the user.
	user_media_ids := types.GlobalDatabase.UserInformation[user_id].MediaList
	c.String(http.StatusOK, "Media of the %s: %s",
		user_name,
		strings.Join(user_media_ids[:], ", "))
}