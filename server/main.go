package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/config"
	"github.com/hallosabuj/plant-care/server/storage"
	"github.com/hallosabuj/plant-care/server/uri"
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

	uri.Uri_init_plant(router)
	uri.Uri_init_fertilizer(router)
	uri.Uri_init_applied_fertilizer(router)
	uri.Uri_init_needed_fertilizers(router)
	uri.Uri_init_repotting(router)
	//////////////////////////////////////////////////////////////
	// Setting database config
	config.Global.DBName = "plant-care"
	config.Global.MongoURL = "mongodb://localhost:27017"
	storage.Connect()
	////////////////////////////////////////////////////////////
	// Setting up the http server to embed the UI also
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		//////////////////////////////////////////////////////////////////////////////////////////
		// We can not navigate directly by clicking the url so we are redirecting to the base url
		// if strings.HasPrefix(r.URL.Path, "/web") {
		// 	http.Redirect(w, r, "/", http.StatusFound)
		// 	return
		// }
		//////////////////////////////////////////////////////////////////////////////////////////
		if strings.HasPrefix(r.URL.Path, "/api") {
			router.ServeHTTP(w, r)
			return
		} else {
			http.FileServer(getFileSystem()).ServeHTTP(w, r)
		}
	})
	////////////////////////////////////////////////////////////

	fmt.Println("Server started at port 80")
	http.ListenAndServe(":80", nil)
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
