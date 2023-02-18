package appliedpesticide

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_applied_pesticides(router *mux.Router) {
	router.HandleFunc("/api/applied-pesticide", api.AddAppliedPesticide).Methods(http.MethodPost)
	router.HandleFunc("/api/applied-pesticide", api.GetAppliedPesticides).Methods(http.MethodGet)
	router.HandleFunc("/api/applied-pesticide/{field}/{value}", api.GetFilteredAppliedPesticides).Methods(http.MethodGet)
}
