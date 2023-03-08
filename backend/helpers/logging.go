package helpers

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/logging"
)

type LoggingClient struct {
	Client *logging.Client
}

var (
	LGClient *LoggingClient
)

func NewLoggingClient() (*LoggingClient, error) {
	client, err := logging.NewClient(context.Background(), os.Getenv("PROJECTID"))
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	return &LoggingClient{
		Client: client,
	}, nil
}
