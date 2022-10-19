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
	uri.Uri_init_plant(router)
	//////////////////////////////////////////////////////////////
	// Setting database config
	config.Global.DBName = "plant-care"
	config.Global.MongoURL = "mongodb://localhost:27017"
	storage.Connect()
	//////////////////////////////////////////////////////////////

	// fs := http.FileServer(http.Dir("static/"))
	// http.Handle("/static", http.StripPrefix("/static/", fs))

	// router.HandleFunc("/template", func(w http.ResponseWriter, r *http.Request) {
	// 	tepl := template.Must(template.ParseFiles("static/abcd.html"))
	// 	tepl.Execute(w, "Sabuj")
	// })
	fmt.Println("Server started at port 8080")
	http.ListenAndServe("localhost:8080", router)
}
