package main

import (

	"github.com/gin-gonic/gin"

	"FeedGram/handlers"
	"FeedGram/types"
	"FeedGram/clients"
)

func main() {
	types.GlobalDatabase = types.NewDatabase()
	clients.Uploader = clients.NewUploader()
	clients.DSClient = clients.NewDatastoreClient()
	
	router := gin.Default()

	router.POST("/login/new_user", handlers.CreateNewUser)
	// TODO: Get user from the authentificated user.
	router.POST("/:user_name/new_media", handlers.CreateNewMedia)
	router.GET("/:user_name", handlers.GetMediaForUser)
	router.GET("/media/:media_id", handlers.GetMediaById)

	router.Run() // listen and serve on 0.0.0.0:8080
}


