package neededfertilizer

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_needed_fertilizers(router *mux.Router) {
	// API to list fertilizers needed for a plant
	router.HandleFunc("/api/plant-fertilizer/{field}/{value}", GetFilteredNeededFertilizers).Methods(http.MethodGet)
	//////////////////////////////////////////////////////////
	// APIs for USER
	//////////////////////////////////////////////////////////
	// Add needed fertilizer for a plant
	router.HandleFunc("/api/user/plant-fertilizer", AddNeededFertilizer).Methods(http.MethodPost)
	Connect()
}
