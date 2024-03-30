package appliedfertilizer

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api/user"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddAppliedFertilizer(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var appliedFertilizers []models.AppliedFertilizer
	json.NewDecoder(r.Body).Decode(&appliedFertilizers)
	result := make(map[string]bool)
	if err := AppliedFertilizerHandler.AddAppliedFertilizer(appliedFertilizers, result); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(result)
}

func GetFilteredAppliedFertilizers(w http.ResponseWriter, r *http.Request) {
	var field string = mux.Vars(r)["field"]
	var value string = mux.Vars(r)["value"]
	var allAppliedFertilizer []models.AppliedFertilizer
	err := AppliedFertilizerHandler.GetFilteredAllAppliedFertilizers(field, value, &allAppliedFertilizer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allAppliedFertilizer)
}
