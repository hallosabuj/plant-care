package repotting

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api/user"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddRepotting(w http.ResponseWriter, r *http.Request) {
	oldToken, _ := r.Cookie("token")
	if oldToken == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	newToken, err := user.VerifyJWT(oldToken.Value)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   newToken,
		Expires: time.Now().Add(user.TokenTimeOut),
	})

	var repotting models.Repotting
	json.NewDecoder(r.Body).Decode(&repotting)
	fmt.Println(repotting)
	err = RepottingHandler.AddRepotting(repotting)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(repotting)
}

func GetRepottingForAPlant(w http.ResponseWriter, r *http.Request) {
	oldToken, _ := r.Cookie("token")
	if oldToken == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	newToken, err := user.VerifyJWT(oldToken.Value)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   newToken,
		Expires: time.Now().Add(user.TokenTimeOut),
	})

	var repottingList []models.Repotting
	plantId := mux.Vars(r)["plantId"]
	err = RepottingHandler.GetRepottingForAPlant(plantId, &repottingList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(repottingList)
}
