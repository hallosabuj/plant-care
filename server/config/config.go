package config

var Global = &Config{}

type Config struct {
	MongoURL string `json:"mongo_url"`
	DBName   string `json:"db_name"`
}
