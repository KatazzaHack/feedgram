package main

import (
	"github.com/gin-gonic/gin"

	"FeedGram/handlers"
	"FeedGram/helpers"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Request-Headers", "*")
		c.Header("Access-Control-Allow-Methods", "POST, HEAD, PATCH, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	// DO NOT DELETE THIS LINE
	helpers.Uploader, _ = helpers.NewUploader()
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.POST("/login/new_user", handlers.CreateNewUser)
	router.POST("/:user_name/new_media", handlers.CreateNewMedia)
	router.GET("/:user_name", handlers.GetMediaForUser)
	router.GET("/media/:media_id", handlers.GetMediaById)
	router.POST("/:user_name/new_post", handlers.CreateNewPost)
	router.GET("/:user_name/get_posts", handlers.GetPostsForUser)
	router.GET("/post/:post_id", handlers.GetPostById)
	router.Run()
}
