package uri

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_plant(router *mux.Router) {
	router.HandleFunc("/api/plant", api.GetAllPlants).Methods(http.MethodGet)
	router.HandleFunc("/api/plant", api.AddPlant).Methods(http.MethodPost)
	router.HandleFunc("/api/plant/{plantId}", api.DeletePlant).Methods(http.MethodDelete)
	router.HandleFunc("/api/plant/{plantId}", api.GetPlant).Methods(http.MethodGet)
	// This can be used to update name, details, dob, imagename
	router.HandleFunc("/api/plant/update/{field}/{plantId}/{value}", api.UpdatePlant).Methods(http.MethodPut)
	router.HandleFunc("/api/plant/deleteImage/{imageName}", api.DeletePlantPhoto).Methods(http.MethodDelete)
	router.HandleFunc("/api/plant/downloadImage/{imageName}", api.DownloadImage).Methods(http.MethodGet)
	router.HandleFunc("/api/plant/uploadImages", api.AddImages).Methods(http.MethodPost)
}
