package main

import (
	// TODO: Introduce useful logging.
	// "log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type userInfo struct {
	UserName  string
	MediaList []string
}

var user_name_to_id = make(map[string]string)
var user_information = make(map[string]userInfo)
var media_to_data = make(map[string]string)

func main() {
	router := gin.Default()

	router.POST("/login/new_user", CreateNewUser)
	// TODO: Get user from the authentificated user.
	router.POST("/:user_name/new_media", CreateNewMedia)
	router.GET("/:user_name", GetMediaForUser)
	router.GET("/media/:media_id", GetMediaById)

	router.Run() // listen and serve on 0.0.0.0:8080
}

func CreateNewUser(c *gin.Context) {
	user_name := c.PostForm("user_name")
	user_id := uuid.New().String()
	// TODO: Create a new user in the database.
	user_name_to_id[user_name] = user_id
	// TODO: Create a new user media entry in the database.
	user_information[user_id] = userInfo{
		UserName:  user_name,
		MediaList: []string{}}
}

func CreateNewMedia(c *gin.Context) {
	user_name := c.Param("user_name")
	user_id := user_name_to_id[user_name]
	media_data := c.PostForm("media_data")
	new_media_id := uuid.New().String()
	// TODO: Append new media to the user's media list in database.
	user_info := user_information[user_id]
	user_info.MediaList = append(
		user_info.MediaList, new_media_id)
	user_information[user_id] = user_info
	// TODO: Save the media at the `new_media_id` in database.
	media_to_data[new_media_id] = media_data
}

func GetMediaForUser(c *gin.Context) {
	user_name := c.Param("user_name")
	user_id := user_name_to_id[user_name]
	// TODO: Get the media ids from the database based on the user.
	user_media_ids := user_information[user_id].MediaList
	c.String(http.StatusOK, "Media of the %s: %s",
		user_name,
		strings.Join(user_media_ids[:], ", "))
}

func GetMediaById(c *gin.Context) {
	media_id := c.Param("media_id")
	media_data := media_to_data[media_id]
	// TODO: Get the media from the blob storage.
	c.String(http.StatusOK, "Media data received = %s", media_data)
}
