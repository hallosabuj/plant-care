package pesticide

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/hallosabuj/plant-care/server/api/user"
	"github.com/hallosabuj/plant-care/server/models"
)

func AddPesticides(w http.ResponseWriter, r *http.Request) {
	oldToken, _ := r.Cookie("token")
	if oldToken == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	newToken, err := user.VerifyJWT(oldToken.Value)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   newToken,
		Expires: time.Now().Add(user.TokenTimeOut),
	})

	newPesticide := models.Pesticides{
		Name:        r.FormValue("name"),
		Details:     r.FormValue("details"),
		Composition: r.FormValue("composition"),
	}
	// Generating ID for fertilizer
	newPesticide.ID = fmt.Sprintf("%v", uuid.New())
	// Getting the image from the request
	file, fileHeader, _ := r.FormFile("image")
	StorePesticideImage(newPesticide.ID, file, *fileHeader)
	// Generating the filename
	newPesticide.ProfileImage = fmt.Sprintf("%s%s", newPesticide.ID, filepath.Ext(fileHeader.Filename))
	// Storing image for the fertilizer
	PesticideHandler.AddPesticides(newPesticide)
	json.NewEncoder(w).Encode(newPesticide)
}

func GetAllPesticides(w http.ResponseWriter, r *http.Request) {
	oldToken, _ := r.Cookie("token")
	if oldToken == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	newToken, err := user.VerifyJWT(oldToken.Value)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   newToken,
		Expires: time.Now().Add(user.TokenTimeOut),
	})

	var allPesticides []models.Pesticides
	PesticideHandler.GetAllPesticides(&allPesticides)
	w.Header().Add("content-type", "application/json")
	json.NewEncoder(w).Encode(allPesticides)
}

func GetPesticide(w http.ResponseWriter, r *http.Request) {
	oldToken, _ := r.Cookie("token")
	if oldToken == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	newToken, err := user.VerifyJWT(oldToken.Value)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   newToken,
		Expires: time.Now().Add(user.TokenTimeOut),
	})

	var pesticideId string = mux.Vars(r)["pesticideId"]
	var pesticide models.Pesticides
	err = PesticideHandler.GetPesticideDetails(pesticideId, &pesticide)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(pesticide)
	}
}

func DeletePesticide(w http.ResponseWriter, r *http.Request) {
	oldToken, _ := r.Cookie("token")
	if oldToken == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	newToken, err := user.VerifyJWT(oldToken.Value)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   newToken,
		Expires: time.Now().Add(user.TokenTimeOut),
	})

	var pesticideId string = mux.Vars(r)["pesticideId"]
	if err := PesticideHandler.DeletePesticideDetails(pesticideId); err != nil {
		if strings.Contains(err.Error(), "Error 1451:") {
			http.Error(w, "Can not delete, some plants using this pesticide", http.StatusInternalServerError)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	} else if err := DeletePesticideImage(pesticideId); err != nil {
		http.Error(w, "Image not deleted", http.StatusOK)
	} else {

	}
}

func DownloadPesticideImage(w http.ResponseWriter, r *http.Request) {
	oldToken, _ := r.Cookie("token")
	if oldToken == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	newToken, err := user.VerifyJWT(oldToken.Value)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   newToken,
		Expires: time.Now().Add(user.TokenTimeOut),
	})

	var imageName string = mux.Vars(r)["imageName"]
	fmt.Println("plantId", imageName)
	data, err := GetPesticideImage(imageName)
	if err != nil {
		w.Write(nil)
	}
	w.Write(data)
}

func UpdatePesticide(w http.ResponseWriter, r *http.Request) {
	oldToken, _ := r.Cookie("token")
	if oldToken == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	newToken, err := user.VerifyJWT(oldToken.Value)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   newToken,
		Expires: time.Now().Add(user.TokenTimeOut),
	})

	queryParams := mux.Vars(r)
	var pesticideId string = queryParams["pesticideId"]
	var field string = queryParams["field"]
	var value string = queryParams["value"]

	if !strings.Contains("name details composition available", field) {
		http.Error(w, "unknown field", http.StatusInternalServerError)
		return
	}

	err = PesticideHandler.UpdatePesticide(pesticideId, field, value)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode("Updated")
}
