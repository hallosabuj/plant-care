package plant

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
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
		Name:     r.FormValue("name"),
		DOB:      strings.ReplaceAll(r.FormValue("dob"), "/", "-"),
		Details:  r.FormValue("details"),
		SoilType: r.FormValue("soilType"),
	}
	// Generate the ID for the plant
	newPlant.ID = fmt.Sprintf("%v", uuid.New())
	//////////////////////////////////////////////////////////
	// The argument to FormFile must match the name attribute
	// of the file input on the frontend
	fileSmall, _, _ := r.FormFile("imageSmall")
	fileMedium, _, _ := r.FormFile("imageMedium")
	fileLarge, fileHeader, _ := r.FormFile("imageLarge")
	// Storing photo in local file system
	imageName, _ := storage.StorePlantImage(newPlant.ID, fileSmall, fileMedium, fileLarge, fileHeader)
	newPlant.ProfileImage = imageName
	// Storing into database
	storage.PlantHandler.AddPlant(&newPlant)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(newPlant)
}

func DeletePlantPhoto(w http.ResponseWriter, r *http.Request) {
	fileName := mux.Vars(r)["imageName"]
	if err := storage.PlantHandler.RemoveImageNameFromDB(fileName); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else if err := storage.DeletePlantImage(fileName); err != nil {
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
	filesSmall := r.MultipartForm.File["imageSmall"]
	filesMedium := r.MultipartForm.File["imageMedium"]
	filesLarge := r.MultipartForm.File["imageLarge"]
	var imageNames []string
	storage.StorePlantImages(plantId, filesSmall, filesMedium, filesLarge, &imageNames)

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

func GetPlantForAFertilizer(w http.ResponseWriter, r *http.Request) {
	var fertilizerId string = mux.Vars(r)["fertilizerId"]
	var allPlants []models.PlantForAFertilizer
	if err := storage.PlantHandler.GetPlantsForAFertilizer(fertilizerId, &allPlants); err != nil {
		json.NewEncoder(w).Encode(err)
	}
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allPlants)
}

func GetPlantForAPesticide(w http.ResponseWriter, r *http.Request) {
	var pesticideId string = mux.Vars(r)["pesticideId"]
	var allPlants []models.PlantForAPesticide
	if err := storage.PlantHandler.GetPlantsForAPesticide(pesticideId, &allPlants); err != nil {
		json.NewEncoder(w).Encode(err)
	}
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allPlants)
}

func UpdatePlant(w http.ResponseWriter, r *http.Request) {
	var field string = mux.Vars(r)["field"]
	var plantId string = mux.Vars(r)["plantId"]
	var value string = mux.Vars(r)["value"]
	if strings.Contains("name dob details profileimage soiltype", field) {
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
	} else if err := storage.DeletePlantImages(plantId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode("Plant Deleted")
}

func DownloadImage(w http.ResponseWriter, r *http.Request) {
	var imageName string = mux.Vars(r)["imageName"]
	var size string = mux.Vars(r)["size"]
	data, err := storage.GetPlantImage(size, imageName)
	if err != nil {
		w.Write(nil)
	}
	w.Write(data)
}

func CompressedImages(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// 32 MB is the default used by FormFile()
	if err := r.ParseMultipartForm(32 << 25); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get a reference to the fileHeaders.
	// They are accessible only after ParseMultipartForm is called
	files := r.MultipartForm.File["image"]

	for i := 0; i < len(files); i++ {
		fileName := files[i].Filename
		// Storing small image
		file, err := files[i].Open()
		if err != nil {
			return
		}
		defer file.Close()
		dst, err := os.Create(fmt.Sprintf("./images/compressed/%s", fileName))
		if err != nil {
			return
		}
		defer dst.Close()

		_, err = io.Copy(dst, file)
		if err != nil {
			return
		}
	}

	json.NewEncoder(w).Encode("Multiple images uploaded")
}
