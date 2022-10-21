package storage

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/hallosabuj/plant-care/server/config"
	"github.com/hallosabuj/plant-care/server/plant"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Handler interface {
	AddPlant(plant.Plant) error
	GetAllPlants(*[]plant.Plant) error
	DeleteDetails(string) error
}

var PlantHandler Handler

func Connect() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	MongoClient, err := mongo.Connect(ctx, options.Client().ApplyURI(config.Global.MongoURL))
	fatalf("Problem while connecting to Mongo: %s", err)

	PlantHandler = plantMongoHandler{MongoClient.Database(config.Global.DBName).Collection("plants")}
}

func fatalf(format string, err error) {
	if err != nil {
		logrus.Fatalf(format, err)
	}
}

type plantMongoHandler struct {
	col *mongo.Collection
}

// func (p plantMongoHandler) AddPlant(newPlant plant.Plant) error {
// 	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

// 	filter := bson.M{"id": newPlant.ID}
// 	res := p.col.FindOne(ctx, filter)
// 	err := res.Err()
// 	if err != nil {
// 		if err != mongo.ErrNoDocuments {
// 			return err
// 		}
// 	} else {
// 		var existingPlant plant.Plant
// 		_ = res.Decode(&existingPlant)
// 		return errors.New(fmt.Sprintf("there is already such plant with ID: %s", newPlant.ID))
// 	}

// 	update := bson.M{"$set": newPlant}
// 	_, err = p.col.UpdateOne(ctx, filter, update, options.Update().SetUpsert(true))
// 	if err != nil {
// 		return errors.New(fmt.Sprintf("error while inserting license: %s", err))
// 	}

// 	return nil
// }

func (p plantMongoHandler) AddPlant(newPlant plant.Plant) error {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, err := p.col.InsertOne(ctx, newPlant)
	if err != nil {
		return errors.New(fmt.Sprintf("error while inserting license: %s", err))
	}

	return nil
}

func (p plantMongoHandler) GetAllPlants(allPlants *[]plant.Plant) error {
	cur, err := p.col.Find(context.Background(), bson.D{})
	if err != nil {
		return err
	}

	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var plant plant.Plant
		err := cur.Decode(&plant)
		if err != nil {
			return err
		}
		*allPlants = append(*allPlants, plant)
	}

	return cur.Err()
}

func (p plantMongoHandler) DeleteDetails(plantId string) error {
	_, err := p.col.DeleteOne(context.Background(), bson.M{"id": plantId})
	if err != nil {
		return err
	}
	return nil
}
