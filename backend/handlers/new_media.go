package handlers

import (

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"FeedGram/types"
)

func CreateNewMedia(c *gin.Context) {
	user_name := c.Param("user_name")
	user_id := types.GlobalDatabase.UserNameToId[user_name]
	media_data := c.PostForm("media_data")
	new_media_id := uuid.New().String()
	// TODO: Append new media to the user's media list in database.
	user_info := types.GlobalDatabase.UserInformation[user_id]
	user_info.MediaList = append(
		user_info.MediaList, new_media_id)
	types.GlobalDatabase.UserInformation[user_id] = user_info
	// TODO: Save the media at the `new_media_id` in database.
	types.GlobalDatabase.MediaToData[new_media_id] = media_data
}