package uri

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_fertilizer(router *mux.Router) {
	router.HandleFunc("/fertilizer", api.AddFertilizer).Methods(http.MethodPost)
}
