package uri

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_plant(router *mux.Router) {
	router.HandleFunc("/plant", api.GetAllPlants).Methods("GET")
	router.HandleFunc("/plant", api.AddPlant).Methods("POST")
	router.HandleFunc("/plant/deleteImage/{imageName}", api.DeletePhoto).Methods(http.MethodDelete)
	router.HandleFunc("/plant/uploadImages", api.AddImages).Methods(http.MethodPost)
}
