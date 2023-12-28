package user

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_user(router *mux.Router) {
	router.HandleFunc("/api/signin", SignIn).Methods(http.MethodPost)
	router.HandleFunc("/api/signup", SignUp).Methods(http.MethodPost)
	router.HandleFunc("/api/signout", Logout).Methods(http.MethodGet)
	Connect()
}
