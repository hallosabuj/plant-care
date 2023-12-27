package neededfertilizer

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api/user"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddNeededFertilizer(w http.ResponseWriter, r *http.Request) {
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

	var neededFertilizer models.NeededFertilizer
	json.NewDecoder(r.Body).Decode(&neededFertilizer)
	fmt.Println(neededFertilizer)
	err = PlantsFertilizersHandler.AddNeededFertilizer(neededFertilizer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(neededFertilizer)
}

func GetNeededFertilizers(w http.ResponseWriter, r *http.Request) {
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

	var neededFertilizers []models.NeededFertilizer
	err = PlantsFertilizersHandler.GetNeededFertilizer(&neededFertilizers)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(neededFertilizers)
}

func GetFilteredNeededFertilizers(w http.ResponseWriter, r *http.Request) {
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

	field := mux.Vars(r)["field"]
	value := mux.Vars(r)["value"]
	var neededFertilizers []models.NeededFertilizer
	err = PlantsFertilizersHandler.GetFilteredNeededFertilizers(field, value, &neededFertilizers)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(neededFertilizers)
}
