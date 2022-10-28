package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/config"
	"github.com/hallosabuj/plant-care/server/storage"
	"github.com/hallosabuj/plant-care/server/uri"
)

var router = mux.NewRouter()

func main() {
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Take care of your plants")
	})

	router.HandleFunc("/index", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-type", "text/html")
		http.ServeFile(w, r, "static/index.html")
	})

	uri.Uri_init_plant(router)
	uri.Uri_init_fertilizer(router)
	//////////////////////////////////////////////////////////////
	// Setting database config
	config.Global.DBName = "plant-care"
	config.Global.MongoURL = "mongodb://localhost:27017"
	storage.Connect()
	//////////////////////////////////////////////////////////////

	fmt.Println("Server started at port 8080")
	http.ListenAndServe("localhost:8080", router)
}
