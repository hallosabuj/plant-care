package repotting

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_repotting(router *mux.Router) {
	// Get all repotting details of a plant
	router.HandleFunc("/api/repotting/{plantId}", GetRepottingForAPlant).Methods(http.MethodGet)

	////////////////////////////////////////////////////////////////
	// APIs related to an USER
	////////////////////////////////////////////////////////////////
	// Adding repotting details for a plant
	router.HandleFunc("/api/user/repotting", AddRepotting).Methods(http.MethodPost)

	Connect()
}
