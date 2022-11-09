package storage

import (
	"context"
	"time"

	"github.com/hallosabuj/plant-care/server/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	MongoClient, err := mongo.Connect(ctx, options.Client().ApplyURI(config.Global.MongoURL))
	fatalf("Problem while connecting to Mongo: %s", err)
	FertilizerHandler = fertilizerMongoHandler{MongoClient.Database(config.Global.DBName).Collection("fertilizer")}
	PlantHandler = plantMongoHandler{MongoClient.Database(config.Global.DBName).Collection("plants")}
	AppliedFertilizerHandler = appliedFertilizerMongoHnadler{MongoClient.Database(config.Global.DBName).Collection("applied-fertilizer")}
}
