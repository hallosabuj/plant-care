package appliedpesticide

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_applied_pesticides(router *mux.Router) {
	// API to add applied pesticide for a plant
	router.HandleFunc("/api/applied-pesticide", AddAppliedPesticide).Methods(http.MethodPost)
	router.HandleFunc("/api/applied-pesticide/{field}/{value}", GetFilteredAppliedPesticides).Methods(http.MethodGet)
	Connect()
}
