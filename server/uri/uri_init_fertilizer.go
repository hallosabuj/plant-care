package uri

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_fertilizer(router *mux.Router) {
	router.HandleFunc("/fertilizer", api.AddFertilizer).Methods(http.MethodPost)
	router.HandleFunc("/fertilizer", api.GetFertilizers).Methods(http.MethodGet)
	router.HandleFunc("/fertilizer/{fertilizerId}", api.DeleteFertilizer).Methods(http.MethodDelete)
	router.HandleFunc("/fertilizer/downloadImage/{imageName}", api.DownloadFertilizerImage).Methods(http.MethodGet)
}
