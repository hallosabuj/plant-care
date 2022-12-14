package uri

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_needed_fertilizers(router *mux.Router) {
	router.HandleFunc("/api/plant-fertilizer", api.AddNeededFertilizer).Methods(http.MethodPost)
	router.HandleFunc("/api/plant-fertilizer", api.GetNeededFertilizers).Methods(http.MethodGet)
	router.HandleFunc("/api/plant-fertilizer/{field}/{value}", api.GetFilteredNeededFertilizers).Methods(http.MethodGet)
}
