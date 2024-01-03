package plant

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_plant(router *mux.Router) {
	// List all plants for public view
	router.HandleFunc("/api/plant", GetAllPlants).Methods(http.MethodGet)
	// API to show details of a plant in public view
	router.HandleFunc("/api/plant/{plantId}", GetPlant).Methods(http.MethodGet)
	// This API can be used to download an image of a plant
	router.HandleFunc("/api/plant/downloadImage/{size}/{imageName}", DownloadImage).Methods(http.MethodGet)

	////////////////////////////////////////////////
	// User specific APIs
	// All user APIs would require a valid cookie
	////////////////////////////////////////////////
	// API to add one plant
	router.HandleFunc("/api/user/plant", AddPlant).Methods(http.MethodPost)
	// API to list all plants belongs to an user
	router.HandleFunc("/api/user/plant", GetAllPlantsOfUser).Methods(http.MethodGet)
	// API to show details of a plant in private view
	router.HandleFunc("/api/user/plant/{plantId}", GetUserPlant).Methods(http.MethodGet)
	// API to delete one plant
	router.HandleFunc("/api/user/plant/{plantId}", DeletePlant).Methods(http.MethodDelete)
	// This API can be used to delete an image of a plant
	router.HandleFunc("/api/user/plant/deleteImage/{imageName}", DeletePlantPhoto).Methods(http.MethodDelete)
	// This API can be used to upload images for a plant
	router.HandleFunc("/api/user/plant/uploadImages", AddImages).Methods(http.MethodPost)
	// API to list all plants that uses a fertilizer
	router.HandleFunc("/api/user/plants/fertilizer/{fertilizerId}", GetPlantForAFertilizer).Methods(http.MethodGet)
	// API to list all plants that uses a pesticide
	router.HandleFunc("/api/user/plants/pesticide/{pesticideId}", GetPlantForAPesticide).Methods(http.MethodGet)
	// This API can be used to update name, details, dob, imagename
	router.HandleFunc("/api/user/plant/update/{field}/{plantId}/{value}", UpdatePlant).Methods(http.MethodPost)

	// This api is for uploading compressed images through the react UI not related to plant
	router.HandleFunc("/api/plant/compressed", CompressedImages).Methods(http.MethodPost)
	Connect()
}
