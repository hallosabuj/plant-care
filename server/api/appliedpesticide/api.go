package appliedpesticide

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api/user"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddAppliedPesticide(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var appliedPesticides []models.AppliedPesticide
	json.NewDecoder(r.Body).Decode(&appliedPesticides)
	result := make(map[string]bool)
	if err := AppliedPesticideHandler.AddAppliedPesticide(appliedPesticides, result); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(result)
}

func GetFilteredAppliedPesticides(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var field string = mux.Vars(r)["field"]
	var value string = mux.Vars(r)["value"]
	var allAppliedPesticide []models.AppliedPesticide
	err := AppliedPesticideHandler.GetFilteredAllAppliedPesticides(field, value, &allAppliedPesticide)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allAppliedPesticide)
}
