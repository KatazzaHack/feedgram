package clients

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/datastore"
)

type DatastoreClient struct {
	cl *datastore.Client
}

var (
	DSClient *DatastoreClient
)

func NewDatastoreClient() *DatastoreClient {
	client, err := datastore.NewClient(context.Background(), os.Getenv("PROJECTID"))
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	return &DatastoreClient{
		cl: client,
	}
}
