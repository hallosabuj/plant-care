package pesticide

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_pesticides(router *mux.Router) {
	router.HandleFunc("/api/pesticide", AddPesticides).Methods(http.MethodPost)
	router.HandleFunc("/api/pesticide", GetAllPesticides).Methods(http.MethodGet)
	router.HandleFunc("/api/pesticide/{pesticideId}", GetPesticide).Methods(http.MethodGet)
	router.HandleFunc("/api/pesticide/{pesticideId}", DeletePesticide).Methods(http.MethodDelete)
	// This API can be used to update
	router.HandleFunc(("/api/pesticide/update/{field}/{pesticideId}/{value}"), UpdatePesticide).Methods(http.MethodPost)
	router.HandleFunc("/api/pesticide/downloadImage/{imageName}", DownloadPesticideImage).Methods(http.MethodGet)
	Connect()
}
