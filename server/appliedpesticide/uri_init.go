package appliedpesticide

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_applied_pesticides(router *mux.Router) {
	router.HandleFunc("/api/applied-pesticide", AddAppliedPesticide).Methods(http.MethodPost)
	router.HandleFunc("/api/applied-pesticide", GetAppliedPesticides).Methods(http.MethodGet)
	router.HandleFunc("/api/applied-pesticide/{field}/{value}", GetFilteredAppliedPesticides).Methods(http.MethodGet)
	Connect()
}
