package neededfertilizer

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddNeededFertilizer(w http.ResponseWriter, r *http.Request) {
	var neededFertilizer models.NeededFertilizer
	json.NewDecoder(r.Body).Decode(&neededFertilizer)
	fmt.Println(neededFertilizer)
	err := PlantsFertilizersHandler.AddNeededFertilizer(neededFertilizer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(neededFertilizer)
}

func GetNeededFertilizers(w http.ResponseWriter, r *http.Request) {
	var neededFertilizers []models.NeededFertilizer
	err := PlantsFertilizersHandler.GetNeededFertilizer(&neededFertilizers)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(neededFertilizers)
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
