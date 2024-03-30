package pesticide

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

func AddPesticides(w http.ResponseWriter, r *http.Request) {
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

	newPesticide := models.Pesticides{
		Name:        r.FormValue("name"),
		Details:     r.FormValue("details"),
		Composition: r.FormValue("composition"),
	}
	// Generating ID for fertilizer
	newPesticide.ID = fmt.Sprintf("%v", uuid.New())
	// Getting the image from the request
	file, fileHeader, _ := r.FormFile("image")
	StorePesticideImage(newPesticide.ID, file, *fileHeader)
	// Generating the filename
	newPesticide.ProfileImage = fmt.Sprintf("%s%s", newPesticide.ID, filepath.Ext(fileHeader.Filename))
	// Storing image for the fertilizer
	PesticideHandler.AddPesticides(email, newPesticide)
	json.NewEncoder(w).Encode(newPesticide)
}

func GetAllPesticides(w http.ResponseWriter, r *http.Request) {
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

	var allPesticides []models.Pesticides
	PesticideHandler.GetAllPesticides(email, &allPesticides)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allPesticides)
}

func GetPesticide(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var pesticideId string = mux.Vars(r)["pesticideId"]
	var pesticide models.Pesticides
	err := PesticideHandler.GetPesticideDetails(pesticideId, &pesticide)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(pesticide)
	}
}

func DeletePesticide(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var pesticideId string = mux.Vars(r)["pesticideId"]
	if err := PesticideHandler.DeletePesticideDetails(pesticideId); err != nil {
		if strings.Contains(err.Error(), "Error 1451:") {
			http.Error(w, "Can not delete, some plants using this pesticide", http.StatusInternalServerError)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	} else if err := DeletePesticideImage(pesticideId); err != nil {
		http.Error(w, "Image not deleted", http.StatusOK)
	} else {

	}
}

func DownloadPesticideImage(w http.ResponseWriter, r *http.Request) {

	var imageName string = mux.Vars(r)["imageName"]
	fmt.Println("plantId", imageName)
	data, err := GetPesticideImage(imageName)
	if err != nil {
		w.Write(nil)
	}
	w.Write(data)
}

func UpdatePesticide(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	isValid, newToken := user.VerifyJWT(authHeader)
	if isValid {
		w.Header().Add("Authorization", "Bearer "+newToken)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	queryParams := mux.Vars(r)
	var pesticideId string = queryParams["pesticideId"]
	var field string = queryParams["field"]
	var value string = queryParams["value"]

	if !strings.Contains("name details composition available", field) {
		http.Error(w, "unknown field", http.StatusInternalServerError)
		return
	}

	err := PesticideHandler.UpdatePesticide(pesticideId, field, value)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode("Updated")
}
