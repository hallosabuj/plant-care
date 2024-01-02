package appliedfertilizer

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_applied_fertilizer(router *mux.Router) {
	router.HandleFunc("/api/applied-fertilizer", AddAppliedFertilizer).Methods(http.MethodPost)
	router.HandleFunc("/api/applied-fertilizer/{field}/{value}", GetFilteredAppliedFertilizers).Methods(http.MethodGet)
	Connect()
}
