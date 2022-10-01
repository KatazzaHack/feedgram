package main

import (

	"github.com/gin-gonic/gin"

	"FeedGram/handlers"
	"FeedGram/types"
	"FeedGram/clients"
)

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // TODO(maffina,antonhulikau): get rid of the unused headers
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
	types.GlobalDatabase = types.NewDatabase()
	clients.Uploader = clients.NewUploader()
	clients.DSClient = clients.NewDatastoreClient()
	
	router := gin.Default()
    router.Use(CORSMiddleware())

	router.POST("/login/new_user", handlers.CreateNewUser)
	// TODO: Get user from the authentificated user.
	router.POST("/:user_name/new_media", handlers.CreateNewMedia)
	router.GET("/:user_name", handlers.GetMediaForUser)
	router.GET("/media/:media_id", handlers.GetMediaById)

	router.Run() // listen and serve on 0.0.0.0:8080
}


