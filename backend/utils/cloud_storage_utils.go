package utils

import (
        "context"
		"io/ioutil"
        "fmt"
        "time"
		"FeedGram/clients"
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
			Method: "GET",
			GoogleAccessID: conf.Email,
			PrivateKey:     conf.PrivateKey,
			Expires:        time.Now().Add(15*time.Minute),
		}

		u, err := storage.SignedURL(clients.Uploader.BucketName, object, opts)
		if err != nil {
			return "", fmt.Errorf("Unable to generate a signed URL: %v", err)
		}

        return u, nil
}