package api

import (
	"encoding/json"
	"fmt"
	"net/http"

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
		Name: r.FormValue("name"),
		DOB:  r.FormValue("dob"),
	}
	// Generate the ID for the plant
	newPlant.ID = fmt.Sprintf("%v", uuid.New())
	//////////////////////////////////////////////////////////
	// The argument to FormFile must match the name attribute
	// of the file input on the frontend
	file, fileHeader, _ := r.FormFile("image")
	// Storing photo in local file system
	imageName, _ := storage.StoreImage(newPlant.ID, file, fileHeader)
	newPlant.ImageName = imageName
	// Storing into database
	storage.PlantHandler.AddPlant(newPlant)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(newPlant)
}

func DeletePhoto(w http.ResponseWriter, r *http.Request) {
	fileName := mux.Vars(r)["imageName"]
	if err := storage.DeleteImage(fileName); err != nil {
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
	storage.StoreMultipleImage(plantId, files)

	json.NewEncoder(w).Encode("Multiple images uploaded")
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
	fmt.Println("plantId", imageName)
	data, err := storage.GetImage(imageName)
	if err != nil {
		w.Write(nil)
	}
	w.Write(data)
}
