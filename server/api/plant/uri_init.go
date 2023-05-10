package plant

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_plant(router *mux.Router) {
	router.HandleFunc("/api/plant", GetAllPlants).Methods(http.MethodGet)
	router.HandleFunc("/api/plant", AddPlant).Methods(http.MethodPost)
	router.HandleFunc("/api/plant/{plantId}", DeletePlant).Methods(http.MethodDelete)
	router.HandleFunc("/api/plant/{plantId}", GetPlant).Methods(http.MethodGet)
	router.HandleFunc("/api/plants/fertilizer/{fertilizerId}", GetPlantForAFertilizer).Methods(http.MethodGet)
	router.HandleFunc("/api/plants/pesticide/{pesticideId}", GetPlantForAPesticide).Methods(http.MethodGet)
	// This can be used to update name, details, dob, imagename
	router.HandleFunc("/api/plant/update/{field}/{plantId}/{value}", UpdatePlant).Methods(http.MethodPost)
	router.HandleFunc("/api/plant/deleteImage/{imageName}", DeletePlantPhoto).Methods(http.MethodDelete)
	router.HandleFunc("/api/plant/downloadImage/{size}/{imageName}", DownloadImage).Methods(http.MethodGet)
	router.HandleFunc("/api/plant/uploadImages", AddImages).Methods(http.MethodPost)
	// This api is for uploading compressed images through the react UI
	router.HandleFunc("/api/plant/compressed", CompressedImages).Methods(http.MethodPost)
	Connect()
}
