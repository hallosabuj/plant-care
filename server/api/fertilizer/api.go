package fertilizer

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api/user"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddFertilizer(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// Getting email from newToken
	email := user.ParseAccessToken(newToken).Email

	newFertilizer := models.Fertilizer{
		Name:        r.FormValue("name"),
		Details:     r.FormValue("details"),
		Composition: r.FormValue("composition"),
	}
	// Generating ID for fertilizer
	newFertilizer.ID = fmt.Sprintf("%v", uuid.New())
	// Getting the image from the request
	file, fileHeader, _ := r.FormFile("image")
	StoreFertilizerImage(newFertilizer.ID, file, *fileHeader)
	// Generating the filename
	newFertilizer.ProfileImage = fmt.Sprintf("%s%s", newFertilizer.ID, filepath.Ext(fileHeader.Filename))
	// Storing image for the fertilizer
	FertilizerHandler.AddFertilizer(email, newFertilizer)
	json.NewEncoder(w).Encode(newFertilizer)
}

func GetAllFertilizers(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// Getting email from newToken
	email := user.ParseAccessToken(newToken).Email

	var allFertilizer []models.Fertilizer
	FertilizerHandler.GetAllFertilizers(email, &allFertilizer)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allFertilizer)
}

func GetFertilizer(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var fertilizerId string = mux.Vars(r)["fertilizerId"]
	var fertilizer models.Fertilizer
	err := FertilizerHandler.GetFertilizerDetails(fertilizerId, &fertilizer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(fertilizer)
	}
}

func DownloadFertilizerImage(w http.ResponseWriter, r *http.Request) {
	var imageName string = mux.Vars(r)["imageName"]
	fmt.Println("plantId", imageName)
	data, err := GetFertilizerImage(imageName)
	if err != nil {
		w.Write(nil)
	}
	w.Write(data)
}

func DeleteFertilizer(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var fertilizerId string = mux.Vars(r)["fertilizerId"]
	if err := FertilizerHandler.DeleteFertilizerDetails(fertilizerId); err != nil {
		if strings.Contains(err.Error(), "Error 1451:") {
			http.Error(w, "Can not delete, some plants using this fertilizer", http.StatusInternalServerError)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	} else if err := DeleteFertilizerImage(fertilizerId); err != nil {
		http.Error(w, "Image not deleted", http.StatusOK)
	} else {
		json.NewEncoder(w).Encode("Fertilizer deleted")
	}
}

func UpdateFertilizer(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	queryParams := mux.Vars(r)
	var fertilizerId string = queryParams["fertilizerId"]
	var field string = queryParams["field"]
	var value string = queryParams["value"]

	if !strings.Contains("name details composition available", field) {
		http.Error(w, "unknown field", http.StatusInternalServerError)
		return
	}

	err := FertilizerHandler.UpdateFertilizer(fertilizerId, field, value)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode("Updated")
}
