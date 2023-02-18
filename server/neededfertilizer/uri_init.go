package neededfertilizer

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_needed_fertilizers(router *mux.Router) {
	router.HandleFunc("/api/plant-fertilizer", AddNeededFertilizer).Methods(http.MethodPost)
	router.HandleFunc("/api/plant-fertilizer", GetNeededFertilizers).Methods(http.MethodGet)
	router.HandleFunc("/api/plant-fertilizer/{field}/{value}", GetFilteredNeededFertilizers).Methods(http.MethodGet)
}
