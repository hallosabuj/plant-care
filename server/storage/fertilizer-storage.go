package storage

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/hallosabuj/plant-care/server/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type HandlerF interface {
	AddFertilizer(models.Fertilizer) error
}

var FertilizerHandler HandlerF

type fertilizerMongoHandler struct {
	col *mongo.Collection
}

func (f fertilizerMongoHandler) AddFertilizer(newFertilizer models.Fertilizer) error {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, err := f.col.InsertOne(ctx, newFertilizer)
	if err != nil {
		return errors.New(fmt.Sprintf("error while inserting license: %s", err))
	}

	return nil
}
