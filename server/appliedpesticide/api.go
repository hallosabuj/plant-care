package appliedpesticide

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/models"
	"github.com/hallosabuj/plant-care/server/storage"
)

func AddAppliedPesticide(w http.ResponseWriter, r *http.Request) {
	var appliedPesticides []models.AppliedPesticide
	json.NewDecoder(r.Body).Decode(&appliedPesticides)
	result := make(map[string]bool)
	if err := storage.AppliedPesticideHandler.AddEntry(appliedPesticides, result); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(result)
}

func GetAppliedPesticides(w http.ResponseWriter, r *http.Request) {
	var allAppliedPesticide []models.AppliedPesticide
	err := storage.AppliedPesticideHandler.GetAllAppliedPesticides(&allAppliedPesticide)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allAppliedPesticide)
}

func GetFilteredAppliedPesticides(w http.ResponseWriter, r *http.Request) {
	var field string = mux.Vars(r)["field"]
	var value string = mux.Vars(r)["value"]
	var allAppliedPesticide []models.AppliedPesticide
	err := storage.AppliedPesticideHandler.GetFilteredAllAppliedPesticides(field, value, &allAppliedPesticide)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allAppliedPesticide)
}
