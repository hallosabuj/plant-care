package repotting

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_repotting(router *mux.Router) {
	router.HandleFunc("/api/repotting", api.AddRepotting).Methods(http.MethodPost)
	router.HandleFunc("/api/repotting/{plantId}", api.GetRepottingForAPlant).Methods(http.MethodGet)
}
