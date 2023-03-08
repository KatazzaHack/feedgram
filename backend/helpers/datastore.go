package helpers

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/datastore"
)

type DatastoreClient struct {
	Client *datastore.Client
}

var (
	DSClient *DatastoreClient
)

func NewDatastoreClient() (*DatastoreClient, error) {
	client, err := datastore.NewClient(context.Background(), os.Getenv("PROJECTID"))
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	return &DatastoreClient{
		Client: client,
	}, nil
}
