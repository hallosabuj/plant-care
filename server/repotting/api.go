package repotting

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddRepotting(w http.ResponseWriter, r *http.Request) {
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
