package user

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Uri_init_user(router *mux.Router) {
	// API used for signing in to the server
	// Input: username and password in formData
	router.HandleFunc("/api/signin", SignIn).Methods(http.MethodPost)
	// API used to signing up
	router.HandleFunc("/api/signup", SignUp).Methods(http.MethodPost)
	// API for signing out
	router.HandleFunc("/api/signout", Logout).Methods(http.MethodGet)
	// API to check whether the user is logged in or not
	router.HandleFunc("/api/checklogin", CheckLogin).Methods(http.MethodGet)
	Connect()
}
