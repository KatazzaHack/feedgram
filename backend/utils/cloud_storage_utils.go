package utils

import (
	"FeedGram/helpers"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"time"

	"cloud.google.com/go/storage"
	"golang.org/x/oauth2/google"
)

// generateV4GetObjectSignedURL generates object signed URL with GET method.
func GenerateV4GetObjectSignedURL(object string) (string, error) {

	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		return "", fmt.Errorf("storage.NewClient: %v", err)
	}
	defer client.Close()

	jsonKey, err := ioutil.ReadFile("feedgram-333720-eac863b2f002.json")
	if err != nil {
		return "", fmt.Errorf("cannot read the JSON key file, err: %v", err)
	}

	conf, err := google.JWTConfigFromJSON(jsonKey)
	if err != nil {
		return "", fmt.Errorf("google.JWTConfigFromJSON: %v", err)
	}

	opts := &storage.SignedURLOptions{
		Method:         "GET",
		GoogleAccessID: conf.Email,
		PrivateKey:     conf.PrivateKey,
		Expires:        time.Now().Add(15 * time.Minute),
	}

	u, err := storage.SignedURL(helpers.Uploader.BucketName, object, opts)
	if err != nil {
		return "", fmt.Errorf("Unable to generate a signed URL: %v", err)
	}

	return u, nil
}

func UploadFile(file multipart.File, object string) error {
	ctx := context.Background()

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	// Upload an object with storage.Writer.
	wc := helpers.Uploader.Cl.Bucket(helpers.Uploader.BucketName).Object(helpers.Uploader.UploadPath + object).NewWriter(ctx)
	if _, err := io.Copy(wc, file); err != nil {
		return fmt.Errorf("io.Copy: %v", err)
	}
	if err := wc.Close(); err != nil {
		return fmt.Errorf("Writer.Close: %v", err)
	}

	return nil
}
