//	Plant Care.
//
//	the purpose of this application is to provide an application
//	that will help gardeners in maintaining their planta
//
//	Other detils about the application
//
//	Terms Of Service:
//
//	there are no TOS at this moment
//
//	Schemes: http
//	Host: localhost:8080
//	BasePath: /api
//	Version: 0.0.1
//	Contact: Sabuj Mondal<hallosabuj@gmail.com>
//
//	Consumes:
//	- application/json
//
//	Produces:
//	- application/json
//
// swagger:meta
package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api/appliedfertilizer"
	"github.com/hallosabuj/plant-care/server/api/appliedpesticide"
	"github.com/hallosabuj/plant-care/server/api/fertilizer"
	"github.com/hallosabuj/plant-care/server/api/neededfertilizer"
	"github.com/hallosabuj/plant-care/server/api/pesticide"
	"github.com/hallosabuj/plant-care/server/api/plant"
	"github.com/hallosabuj/plant-care/server/api/repotting"
	"github.com/hallosabuj/plant-care/server/api/user"
)

//go:embed build
var embeddedFiles embed.FS

var router = mux.NewRouter()

func main() {
	//////////////////////////////////////////////////////////////////////////
	// URI initialization
	router.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Take care of your plants")
	})
	router.HandleFunc("/api/index", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-type", "text/html")
		http.ServeFile(w, r, "static/index.html")
	})

	router.HandleFunc("/api/docs/swagger.json", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Content-type", "application/json")
		http.ServeFile(w, r, "swagger.json")
	}).Methods(http.MethodGet)

	plant.Uri_init_plant(router)
	fertilizer.Uri_init_fertilizer(router)
	appliedfertilizer.Uri_init_applied_fertilizer(router)
	neededfertilizer.Uri_init_needed_fertilizers(router)
	repotting.Uri_init_repotting(router)
	pesticide.Uri_init_pesticides(router)
	appliedpesticide.Uri_init_applied_pesticides(router)
	user.Uri_init_user(router)
	////////////////////////////////////////////////////////////
	// Setting up the http server to embed the UI also
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/api") {
			router.ServeHTTP(w, r)
			return
		} else {
			http.FileServer(getFileSystem()).ServeHTTP(w, r)
		}
	})
	////////////////////////////////////////////////////////////

	fmt.Println("Server started at port 8080")
	http.ListenAndServe(":8080", nil)
}

func getFileSystem() http.FileSystem {

	// Get the build subdirectory as the
	// root directory so that it can be passed
	// to the http.FileServer
	fsys, err := fs.Sub(embeddedFiles, "build")
	if err != nil {
		panic(err)
	}

	return http.FS(fsys)
}
