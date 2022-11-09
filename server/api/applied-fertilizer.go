package api

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/models"
	"github.com/hallosabuj/plant-care/server/storage"
)

func AddAppliedFertilizer(w http.ResponseWriter, r *http.Request) {
	newAppliedFertilizer := models.AppliedFertilizer{
		PlantId:      r.FormValue("plantId"),
		FertilizerID: r.FormValue("fertilizerId"),
		Date:         strings.ReplaceAll(r.FormValue("date"), "/", "-"),
	}
	if err := storage.AppliedFertilizerHandler.AddEntry(newAppliedFertilizer); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(newAppliedFertilizer)
}

func GetAppliedFertilizers(w http.ResponseWriter, r *http.Request) {
	var allAppliedFertilizer []models.AppliedFertilizer
	storage.AppliedFertilizerHandler.GetAllAppliedFertilizers(&allAppliedFertilizer)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allAppliedFertilizer)
}

func GetFilteredAppliedFertilizers(w http.ResponseWriter, r *http.Request) {
	var field string = mux.Vars(r)["field"]
	var value string = mux.Vars(r)["value"]
	var allAppliedFertilizer []models.AppliedFertilizer
	storage.AppliedFertilizerHandler.GetFilteredAllAppliedFertilizers(field, value, &allAppliedFertilizer)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allAppliedFertilizer)
}
