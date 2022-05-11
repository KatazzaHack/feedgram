package utils

import (
        "context"
        "fmt"
        "time"
		"FeedGram/clients"
        "cloud.google.com/go/storage"
)

// generateV4GetObjectSignedURL generates object signed URL with GET method.
func GenerateV4GetObjectSignedURL(object string) (string, error) {

        ctx := context.Background()
        client, err := storage.NewClient(ctx)
        if err != nil {
                return "", fmt.Errorf("storage.NewClient: %v", err)
        }
        defer client.Close()

        // Signing a URL requires credentials authorized to sign a URL. You can pass
        // these in through SignedURLOptions with one of the following options:
        //    a. a Google service account private key, obtainable from the Google Developers Console
        //    b. a Google Access ID with iam.serviceAccounts.signBlob permissions
        //    c. a SignBytes function implementing custom signing.
        // In this example, none of these options are used, which means the SignedURL
        // function attempts to use the same authentication that was used to instantiate
        // the Storage client. This authentication must include a private key or have
        // iam.serviceAccounts.signBlob permissions.
        opts := &storage.SignedURLOptions{
                Scheme:  storage.SigningSchemeV4,
                Method:  "GET",
                Expires: time.Now().Add(30 * time.Minute),
        }

        u, err := client.Bucket(clients.Uploader.BucketName).SignedURL(object, opts)
        if err != nil {
                return "", fmt.Errorf("Bucket(%q).SignedURL: %v", clients.Uploader.BucketName, err)
        }
        return u, nil
}