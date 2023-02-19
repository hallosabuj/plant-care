package fertilizer

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_fertilizer(router *mux.Router) {
	router.HandleFunc("/api/fertilizer", AddFertilizer).Methods(http.MethodPost)
	router.HandleFunc("/api/fertilizer", GetAllFertilizers).Methods(http.MethodGet)
	router.HandleFunc("/api/fertilizer/{fertilizerId}", GetFertilizer).Methods(http.MethodGet)
	router.HandleFunc("/api/fertilizer/{fertilizerId}", DeleteFertilizer).Methods(http.MethodDelete)
	// This API can be used to update
	router.HandleFunc(("/api/fertilizer/update/{field}/{fertilizerId}/{value}"), UpdateFertilizer).Methods(http.MethodPut)
	router.HandleFunc("/api/fertilizer/downloadImage/{imageName}", DownloadFertilizerImage).Methods(http.MethodGet)
	Connect()
}
