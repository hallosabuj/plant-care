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

	plant.Uri_init_plant(router)
	fertilizer.Uri_init_fertilizer(router)
	appliedfertilizer.Uri_init_applied_fertilizer(router)
	neededfertilizer.Uri_init_needed_fertilizers(router)
	repotting.Uri_init_repotting(router)
	pesticide.Uri_init_pesticides(router)
	appliedpesticide.Uri_init_applied_pesticides(router)
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
