package appliedfertilizer

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_applied_fertilizer(router *mux.Router) {
	router.HandleFunc("/api/applied-fertilizer", api.AddAppliedFertilizer).Methods(http.MethodPost)
	router.HandleFunc("/api/applied-fertilizer", api.GetAppliedFertilizers).Methods(http.MethodGet)
	router.HandleFunc("/api/applied-fertilizer/{field}/{value}", api.GetFilteredAppliedFertilizers).Methods(http.MethodGet)
}
