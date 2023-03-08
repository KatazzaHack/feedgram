package types

type UserInfo struct {
	UserName  string   `datastore:"user_name"`
	MediaList []string `datastore:"media_ids"`
	UserId    string   `datastore:"user_id"`
	PostList  []string `datastore:"post_ids"`
}

type PostInfo struct {
	Description string   `datastore:"description"`
	MediaList   []string `datastore:"media_ids"`
	Id          string   `datastore:"post_id"`
	Title       string   `datastore:"title"`
}

type User struct {
	UserName string `datastore:"user_name"`
	UserId   string `datastore:"user_id"`
}

type Database struct {
	UserNameToId    map[string]string
	UserInformation map[string]UserInfo
	MediaToData     map[string]string
}

var (
	GlobalDatabase Database
)

func NewDatabase() Database {
	gd := Database{}
	gd.UserNameToId = make(map[string]string)
	gd.UserInformation = make(map[string]UserInfo)
	gd.MediaToData = make(map[string]string)
	return gd
}
