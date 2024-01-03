package fertilizer

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_fertilizer(router *mux.Router) {
	/////////////////////////////////////////////////////
	// APIs for USER
	/////////////////////////////////////////////////////
	// API for addition of a fertilizer
	router.HandleFunc("/api/user/fertilizer", AddFertilizer).Methods(http.MethodPost)
	// API to get fertilizer details
	router.HandleFunc("/api/user/fertilizer", GetAllFertilizers).Methods(http.MethodGet)
	// API to get details of a fertilizer
	router.HandleFunc("/api/user/fertilizer/{fertilizerId}", GetFertilizer).Methods(http.MethodGet)
	// API to delete a fertilizer
	router.HandleFunc("/api/user/fertilizer/{fertilizerId}", DeleteFertilizer).Methods(http.MethodDelete)
	// API to update a field value of a fertilizer
	router.HandleFunc(("/api/user/fertilizer/update/{field}/{fertilizerId}/{value}"), UpdateFertilizer).Methods(http.MethodPost)
	// API to download image of the fertilizer
	router.HandleFunc("/api/user/fertilizer/downloadImage/{imageName}", DownloadFertilizerImage).Methods(http.MethodGet)
	Connect()
}
