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
	router.HandleFunc("/plant/deleteImage/{imageName}", api.DeletePhoto).Methods(http.MethodDelete)
	router.HandleFunc("/plant/uploadImages", api.AddImages).Methods(http.MethodPost)
}
