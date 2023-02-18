package fertilizer

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_fertilizer(router *mux.Router) {
	router.HandleFunc("/api/fertilizer", api.AddFertilizer).Methods(http.MethodPost)
	router.HandleFunc("/api/fertilizer", api.GetAllFertilizers).Methods(http.MethodGet)
	router.HandleFunc("/api/fertilizer/{fertilizerId}", api.GetFertilizer).Methods(http.MethodGet)
	router.HandleFunc("/api/fertilizer/{fertilizerId}", api.DeleteFertilizer).Methods(http.MethodDelete)
	// This API can be used to update
	router.HandleFunc(("/api/fertilizer/update/{field}/{fertilizerId}/{value}"), api.UpdateFertilizer).Methods(http.MethodPut)
	router.HandleFunc("/api/fertilizer/downloadImage/{imageName}", api.DownloadFertilizerImage).Methods(http.MethodGet)
}
