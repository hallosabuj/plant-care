package repotting

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api/user"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddRepotting(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var repotting models.Repotting
	json.NewDecoder(r.Body).Decode(&repotting)
	fmt.Println(repotting)
	err := RepottingHandler.AddRepotting(repotting)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(repotting)
}

func GetRepottingForAPlant(w http.ResponseWriter, r *http.Request) {
	var repottingList []models.Repotting
	plantId := mux.Vars(r)["plantId"]
	err := RepottingHandler.GetRepottingForAPlant(plantId, &repottingList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(repottingList)
}
