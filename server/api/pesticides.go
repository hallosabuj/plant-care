package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/models"
	"github.com/hallosabuj/plant-care/server/storage"
)

func AddPesticides(w http.ResponseWriter, r *http.Request) {
	newPesticide := models.Pesticides{
		Name:        r.FormValue("name"),
		Details:     r.FormValue("details"),
		Composition: r.FormValue("composition"),
	}
	// Generating ID for fertilizer
	newPesticide.ID = fmt.Sprintf("%v", uuid.New())
	// Getting the image from the request
	file, fileHeader, _ := r.FormFile("image")
	storage.StorePesticideImage(newPesticide.ID, file, *fileHeader)
	// Generating the filename
	newPesticide.ProfileImage = fmt.Sprintf("%s%s", newPesticide.ID, filepath.Ext(fileHeader.Filename))
	// Storing image for the fertilizer
	storage.PesticideHandler.AddPesticides(newPesticide)
	json.NewEncoder(w).Encode(newPesticide)
}

func GetAllPesticides(w http.ResponseWriter, r *http.Request) {
	var allPesticides []models.Pesticides
	storage.PesticideHandler.GetAllPesticides(&allPesticides)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allPesticides)
}

func GetPesticide(w http.ResponseWriter, r *http.Request) {
	var pesticideId string = mux.Vars(r)["pesticideId"]
	var pesticide models.Pesticides
	err := storage.PesticideHandler.GetPesticideDetails(pesticideId, &pesticide)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(pesticide)
	}
}

func DeletePesticide(w http.ResponseWriter, r *http.Request) {
	var pesticideId string = mux.Vars(r)["pesticideId"]
	if err := storage.PesticideHandler.DeletePesticideDetails(pesticideId); err != nil {
		if strings.Contains(err.Error(), "Error 1451:") {
			http.Error(w, "Can not delete, some plants using this pesticide", http.StatusInternalServerError)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	} else if err := storage.DeletePesticideImage(pesticideId); err != nil {
		http.Error(w, "Image not deleted", http.StatusOK)
	} else {

	}
}

func DownloadPesticideImage(w http.ResponseWriter, r *http.Request) {
	var imageName string = mux.Vars(r)["imageName"]
	fmt.Println("plantId", imageName)
	data, err := storage.GetPesticideImage(imageName)
	if err != nil {
		w.Write(nil)
	}
	w.Write(data)
}

func UpdatePesticide(w http.ResponseWriter, r *http.Request) {
	queryParams := mux.Vars(r)
	var pesticideId string = queryParams["pesticideId"]
	var field string = queryParams["field"]
	var value string = queryParams["value"]

	if !strings.Contains("name details composition available", field) {
		http.Error(w, "unknown field", http.StatusInternalServerError)
		return
	}

	err := storage.PesticideHandler.UpdatePesticide(pesticideId, field, value)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode("Updated")
}
