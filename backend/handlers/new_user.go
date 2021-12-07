package handlers

import (

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"FeedGram/types"
	"fmt"
)

func CreateNewUser(c *gin.Context) {
	user_name := c.PostForm("user_name")
	user_id := uuid.New().String()
	// TODO: Create a new user in the database.
	types.GlobalDatabase.UserNameToId[user_name] = user_id
	// TODO: Create a new user media entry in the database.
	types.GlobalDatabase.UserInformation[user_id] = types.UserInfo{
		UserName:  user_name,
		MediaList: []string{}}
	fmt.Print(user_id)

}