package repotting

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_repotting(router *mux.Router) {
	router.HandleFunc("/api/repotting", AddRepotting).Methods(http.MethodPost)
	router.HandleFunc("/api/repotting/{plantId}", GetRepottingForAPlant).Methods(http.MethodGet)
}
