package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/models"
	"github.com/hallosabuj/plant-care/server/storage"
)

func GetAllPlants(w http.ResponseWriter, r *http.Request) {
	var allPlants []models.Plant
	if err := storage.PlantHandler.GetAllPlants(&allPlants); err != nil {
		json.NewEncoder(w).Encode(err)
	}
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allPlants)
}

func AddPlant(w http.ResponseWriter, r *http.Request) {
	// bytes, _ := ioutil.ReadAll(r.Body)
	var newPlant models.Plant = models.Plant{
		Name:    r.FormValue("name"),
		DOB:     strings.ReplaceAll(r.FormValue("dob"), "/", "-"),
		Details: r.FormValue("details"),
	}
	// Generate the ID for the plant
	newPlant.ID = fmt.Sprintf("%v", uuid.New())
	//////////////////////////////////////////////////////////
	// The argument to FormFile must match the name attribute
	// of the file input on the frontend
	file, fileHeader, _ := r.FormFile("image")
	// Storing photo in local file system
	imageName, _ := storage.StoreImage(newPlant.ID, file, fileHeader)
	newPlant.ProfileImage = imageName
	// Storing into database
	storage.PlantHandler.AddPlant(newPlant)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(newPlant)
}

func DeletePlantPhoto(w http.ResponseWriter, r *http.Request) {
	fileName := mux.Vars(r)["imageName"]
	if err := storage.DeletePlantImage(fileName); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode("Image deleted")
}

func AddImages(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// 32 MB is the default used by FormFile()
	if err := r.ParseMultipartForm(32 << 20); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	plantId := r.FormValue("id")
	// Get a reference to the fileHeaders.
	// They are accessible only after ParseMultipartForm is called
	files := r.MultipartForm.File["image"]
	var imageNames []string
	storage.StoreMultipleImage(plantId, files, &imageNames)

	// Now store image names to the database
	storage.PlantHandler.UpdateImageNames(plantId, imageNames)

	json.NewEncoder(w).Encode("Multiple images uploaded")
}

func GetPlant(w http.ResponseWriter, r *http.Request) {
	var plantId string = mux.Vars(r)["plantId"]
	var plant models.Plant
	plant.ImageNames = make(map[int]string)
	err := storage.PlantHandler.GetPlantDetails(plantId, &plant)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(plant)
	}
}

func UpdatePlant(w http.ResponseWriter, r *http.Request) {
	var field string = mux.Vars(r)["field"]
	var plantId string = mux.Vars(r)["plantId"]
	var value string = mux.Vars(r)["value"]
	if strings.Contains("name dob details profileimage", field) {
		// List of string field
		if err := storage.PlantHandler.UpdatePlant(field, plantId, value); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		json.NewEncoder(w).Encode("Updated")
	} else if strings.Contains("", field) {
		// List of fileds that need special type of updation
	} else {
		http.Error(w, "unknown field", http.StatusInternalServerError)
	}
}

func DeletePlant(w http.ResponseWriter, r *http.Request) {
	var plantId string = mux.Vars(r)["plantId"]
	if err := storage.PlantHandler.DeleteDetails(plantId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else if err := storage.DeleteImages(plantId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode("Plant Deleted")
}

func DownloadImage(w http.ResponseWriter, r *http.Request) {
	var imageName string = mux.Vars(r)["imageName"]
	data, err := storage.GetImage(imageName)
	if err != nil {
		w.Write(nil)
	}
	w.Write(data)
}
