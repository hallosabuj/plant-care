package storage

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/hallosabuj/plant-care/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type HandlerF interface {
	AddFertilizer(models.Fertilizer) error
	GetAllFertilizers(*[]models.Fertilizer) error
	DeleteFertilizerDetails(string) error
	GetFertilizerDetails(string, *models.Fertilizer) error
}

var FertilizerHandler HandlerF

type fertilizerMongoHandler struct {
	col *mongo.Collection
}

func (f fertilizerMongoHandler) AddFertilizer(newFertilizer models.Fertilizer) error {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, err := f.col.InsertOne(ctx, newFertilizer)
	if err != nil {
		return errors.New(fmt.Sprintf("error while inserting fertilizer: %s", err))
	}

	return nil
}

func (f fertilizerMongoHandler) GetAllFertilizers(allFertilizers *[]models.Fertilizer) error {
	cur, err := f.col.Find(context.Background(), bson.D{})
	if err != nil {
		return err
	}

	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var fertilizer models.Fertilizer
		err := cur.Decode(&fertilizer)
		if err != nil {
			return err
		}
		*allFertilizers = append(*allFertilizers, fertilizer)
	}

	return cur.Err()
}

func (f fertilizerMongoHandler) DeleteFertilizerDetails(fertilizerId string) error {
	_, err := f.col.DeleteOne(context.Background(), bson.M{"id": fertilizerId})
	return err
}

func (f fertilizerMongoHandler) GetFertilizerDetails(fertilizerId string, fertilizer *models.Fertilizer) error {
	res := f.col.FindOne(context.Background(), bson.M{"id": fertilizerId})
	err := res.Err()
	if err != nil {
		return err
	} else {
		_ = res.Decode(fertilizer)
	}
	return nil
}
