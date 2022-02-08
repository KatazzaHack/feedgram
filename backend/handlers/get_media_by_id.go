package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"context"
	"time"
	"io/ioutil"
	"FeedGram/clients"
	b64 "encoding/base64"
)

func DownloadFile(object string) []byte {
	ctx := context.Background()

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	rc, _ := clients.Uploader.Cl.Bucket(clients.Uploader.BucketName).Object(clients.Uploader.UploadPath + object).NewReader(ctx)
	defer rc.Close()
	slurp, _ := ioutil.ReadAll(rc)
	return slurp;
}

func GetMediaById(c *gin.Context) {
	media_id := c.Param("media_id")
	c.String(http.StatusOK, "https://storage.cloud.google.com/feedgram-images/blobs/%s", media_id)
}