package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/google/uuid"
	"github.com/hallosabuj/plant-care/server/plant"
	"github.com/hallosabuj/plant-care/server/storage"
)

func GetAllPlants(w http.ResponseWriter, r *http.Request) {
	var allPlants []plant.Plant
	if err := storage.PlantHandler.GetAllPlants(&allPlants); err != nil {
		json.NewEncoder(w).Encode(err)
	}
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allPlants)
}

func AddPlant(w http.ResponseWriter, r *http.Request) {
	bytes, _ := ioutil.ReadAll(r.Body)
	var newPlant plant.Plant
	json.Unmarshal(bytes, &newPlant)
	fmt.Println(newPlant)
	// Generate the ID for the plant
	newPlant.ID = fmt.Sprintf("%v", uuid.New())
	// Storing into database	id := "1"
	storage.PlantHandler.AddPlant(newPlant)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(newPlant)
}
