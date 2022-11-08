package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/models"
	"github.com/hallosabuj/plant-care/server/storage"
)

func AddFertilizer(w http.ResponseWriter, r *http.Request) {
	newFertilizer := models.Fertilizer{Name: r.FormValue("name"), Details: r.FormValue("details"), Composition: r.FormValue("composition"), ApplyInterval: r.FormValue(("applyInterval"))}
	// Generating ID for fertilizer
	newFertilizer.ID = fmt.Sprintf("%v", uuid.New())
	// Getting the image from the request
	file, fileHeader, _ := r.FormFile("image")
	storage.StoreFertilizerImage(newFertilizer.ID, file, *fileHeader)
	// Generating the filename
	newFertilizer.ImageName = fmt.Sprintf("%s%s", newFertilizer.ID, filepath.Ext(fileHeader.Filename))
	// Storing image for the fertilizer
	storage.FertilizerHandler.AddFertilizer(newFertilizer)
	json.NewEncoder(w).Encode(newFertilizer)
}

func GetFertilizers(w http.ResponseWriter, r *http.Request) {
	var allFertilizer []models.Fertilizer
	storage.FertilizerHandler.GetAllFertilizers(&allFertilizer)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allFertilizer)
}

func DownloadFertilizerImage(w http.ResponseWriter, r *http.Request) {
	var imageName string = mux.Vars(r)["imageName"]
	fmt.Println("plantId", imageName)
	data, err := storage.GetFertilizerImage(imageName)
	if err != nil {
		w.Write(nil)
	}
	w.Write(data)
}

func DeleteFertilizer(w http.ResponseWriter, r *http.Request) {
	var fertilizerId string = mux.Vars(r)["fertilizerId"]
	if err := storage.FertilizerHandler.DeleteFertilizerDetails(fertilizerId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else if err := storage.DeleteFertilizerImage(fertilizerId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode("Fertilizer Deleted")
}
