package uri

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_plant(router *mux.Router) {
	router.HandleFunc("/plant", api.GetAllPlants).Methods(http.MethodGet)
	router.HandleFunc("/plant", api.AddPlant).Methods(http.MethodPost)
	router.HandleFunc("/plant/{plantId}", api.DeletePlant).Methods(http.MethodDelete)
	router.HandleFunc("/plant/{plantId}", api.GetPlant).Methods(http.MethodGet)
	// This can be used to update name, details, dob, imagename
	router.HandleFunc("/plant/update/{field}/{plantId}/{value}", api.UpdatePlant).Methods(http.MethodPut)
	router.HandleFunc("/plant/deleteImage/{imageName}", api.DeletePlantPhoto).Methods(http.MethodDelete)
	router.HandleFunc("/plant/downloadImage/{imageName}", api.DownloadImage).Methods(http.MethodGet)
	router.HandleFunc("/plant/uploadImages", api.AddImages).Methods(http.MethodPost)
}
