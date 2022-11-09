package storage

import (
	"context"
	"strings"

	"github.com/hallosabuj/plant-care/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type HandlerAF interface {
	AddEntry(models.AppliedFertilizer) error
	GetAllAppliedFertilizers(*[]models.AppliedFertilizer) error
	GetFilteredAllAppliedFertilizers(string, string, *[]models.AppliedFertilizer) error
}

var AppliedFertilizerHandler HandlerAF

type appliedFertilizerMongoHnadler struct {
	col *mongo.Collection
}

func (a appliedFertilizerMongoHnadler) AddEntry(applied models.AppliedFertilizer) error {
	_, err := a.col.InsertOne(context.Background(), applied)
	return err
}

func (a appliedFertilizerMongoHnadler) GetAllAppliedFertilizers(allAppliedFertilizers *[]models.AppliedFertilizer) error {
	cur, err := a.col.Find(context.Background(), bson.D{})
	if err != nil {
		return err
	}

	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var appliedFertilizer models.AppliedFertilizer
		err := cur.Decode(&appliedFertilizer)
		if err != nil {
			return err
		}
		*allAppliedFertilizers = append(*allAppliedFertilizers, appliedFertilizer)
	}

	return cur.Err()
}

func (a appliedFertilizerMongoHnadler) GetFilteredAllAppliedFertilizers(field, value string, allAppliedFertilizers *[]models.AppliedFertilizer) error {
	cur, err := a.col.Find(context.Background(), bson.M{strings.ToLower(field): value})
	if err != nil {
		return err
	}

	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var appliedFertilizer models.AppliedFertilizer
		err := cur.Decode(&appliedFertilizer)
		if err != nil {
			return err
		}
		*allAppliedFertilizers = append(*allAppliedFertilizers, appliedFertilizer)
	}

	return cur.Err()
}
