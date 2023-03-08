package helpers

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/storage"
)

type ClientUploader struct {
	Cl         *storage.Client
	ProjectID  string
	BucketName string
	UploadPath string
	SAccount   string
}

var (
	Uploader *ClientUploader
)

func NewUploader() (*ClientUploader, error) {
	client, err := storage.NewClient(context.Background())
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
		return nil, err
	}

	return &ClientUploader{
		Cl:         client,
		BucketName: os.Getenv("BUCKETSTORAGENAME"),
		ProjectID:  os.Getenv("PROJECTID"),
		UploadPath: "blobs/",
		SAccount:   os.Getenv("SACCOUNT"),
	}, nil
}
