package pesticide

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_pesticides(router *mux.Router) {
	///////////////////////////////////////////////////////
	// APIs for a USER
	///////////////////////////////////////////////////////
	// API to add a pesticide
	router.HandleFunc("/api/user/pesticide", AddPesticides).Methods(http.MethodPost)
	// API to get all pesticides of a user
	router.HandleFunc("/api/user/pesticide", GetAllPesticides).Methods(http.MethodGet)
	// API to get pesticide details
	router.HandleFunc("/api/user/pesticide/{pesticideId}", GetPesticide).Methods(http.MethodGet)
	// API to delete a pesticide
	router.HandleFunc("/api/user/pesticide/{pesticideId}", DeletePesticide).Methods(http.MethodDelete)
	// API to update a pesticide
	router.HandleFunc(("/api/user/pesticide/update/{field}/{pesticideId}/{value}"), UpdatePesticide).Methods(http.MethodPost)
	// API to download image of a pesticide
	router.HandleFunc("/api/user/pesticide/downloadImage/{imageName}", DownloadPesticideImage).Methods(http.MethodGet)
	Connect()
}
