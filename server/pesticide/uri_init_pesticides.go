package pesticide

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api"
)

func Uri_init_pesticides(router *mux.Router) {
	router.HandleFunc("/api/pesticide", api.AddPesticides).Methods(http.MethodPost)
	router.HandleFunc("/api/pesticide", api.GetAllPesticides).Methods(http.MethodGet)
	router.HandleFunc("/api/pesticide/{pesticideId}", api.GetPesticide).Methods(http.MethodGet)
	router.HandleFunc("/api/pesticide/{pesticideId}", api.DeletePesticide).Methods(http.MethodDelete)
	// This API can be used to update
	router.HandleFunc(("/api/pesticide/update/{field}/{pesticideId}/{value}"), api.UpdatePesticide).Methods(http.MethodPut)
	router.HandleFunc("/api/pesticide/downloadImage/{imageName}", api.DownloadPesticideImage).Methods(http.MethodGet)
}
