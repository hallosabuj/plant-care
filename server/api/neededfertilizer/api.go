package neededfertilizer

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api/user"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddNeededFertilizer(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var neededFertilizer models.NeededFertilizer
	json.NewDecoder(r.Body).Decode(&neededFertilizer)
	fmt.Println(neededFertilizer)
	err := PlantsFertilizersHandler.AddNeededFertilizer(neededFertilizer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(neededFertilizer)
}

func AddFertilizerForMultiplePlants(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	fertilizerId := mux.Vars(r)["fertilizerId"]
	var plantList []models.PlantWithFertilizerUsage
	json.NewDecoder(r.Body).Decode(&plantList)
	for _, plant := range plantList {
		// Delete applied fertilizer
		var neededFertilizer models.NeededFertilizer
		neededFertilizer.PlantId = plant.PlantId
		neededFertilizer.FertilizerId = fertilizerId
		neededFertilizer.ApplyInterval = plant.ApplyInterval
		err := PlantsFertilizersHandler.DeleteNeededFertilizer(neededFertilizer)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		// If the plant is not using the fertilizer then we don't need to add the plant again
		if !plant.UsingOrNot {
			continue
		}

		// Add applied fertilizer
		err = PlantsFertilizersHandler.AddNeededFertilizer(neededFertilizer)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
	json.NewEncoder(w).Encode(plantList)
}

func GetFilteredNeededFertilizers(w http.ResponseWriter, r *http.Request) {
	field := mux.Vars(r)["field"]
	value := mux.Vars(r)["value"]
	var neededFertilizers []models.NeededFertilizer
	err := PlantsFertilizersHandler.GetFilteredNeededFertilizers(field, value, &neededFertilizers)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(neededFertilizers)
}
