package storage

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/hallosabuj/plant-care/server/models"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type HandlerP interface {
	AddPlant(models.Plant) error
	GetAllPlants(*[]models.Plant) error
	DeleteDetails(string) error
	GetPlantDetails(string, *models.Plant) error
	UpdatePlant(field, plantId, value string) error
}

var PlantHandler HandlerP

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

func (p plantMongoHandler) AddPlant(newPlant models.Plant) error {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, err := p.col.InsertOne(ctx, newPlant)
	if err != nil {
		return errors.New(fmt.Sprintf("error while inserting license: %s", err))
	}

	return nil
}

func (p plantMongoHandler) GetAllPlants(allPlants *[]models.Plant) error {
	cur, err := p.col.Find(context.Background(), bson.D{})
	if err != nil {
		return err
	}

	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var plant models.Plant
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

func (p plantMongoHandler) GetPlantDetails(plantId string, plant *models.Plant) error {
	res := p.col.FindOne(context.Background(), bson.M{"id": plantId})
	err := res.Err()
	if err != nil {
		return err
	} else {
		_ = res.Decode(plant)
	}
	return nil
}

func (p plantMongoHandler) UpdatePlant(field, plantId, value string) error {
	fmt.Println(field)
	fmt.Println(plantId)
	fmt.Println(value)
	filter := bson.M{"id": plantId}
	update := bson.D{
		{"$set", bson.D{
			{strings.ToLower(field), value},
		}},
	}
	p.col.UpdateOne(context.Background(), filter, update)
	return nil
}
