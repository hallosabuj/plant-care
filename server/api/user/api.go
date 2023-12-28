package user

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/hallosabuj/plant-care/server/models"
)

var TokenTimeOut time.Duration = 15 * time.Minute

func SignIn(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Signing in")
	userDetails := models.User{
		Email:    r.FormValue("email"),
		Password: r.FormValue("password"),
	}
	isCorrect, _ := UserHandler.SignIn(userDetails)
	if isCorrect == 1 {
		token, err := CreateJWT(userDetails.Email)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{"msg": "login failed"})
		} else {
			http.SetCookie(w, &http.Cookie{
				Name:    "token",
				Value:   token,
				Expires: time.Now().Add(TokenTimeOut),
			})
			json.NewEncoder(w).Encode(map[string]string{"msg": "login success"})
		}
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"msg": "login failed"})
	}
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Signing up")
	newUser := models.User{
		FName:    r.FormValue("fname"),
		MName:    r.FormValue("mname"),
		LName:    r.FormValue("lname"),
		Email:    r.FormValue("email"),
		Password: r.FormValue("password"),
	}
	//Generating ID for the user
	newUser.ID = fmt.Sprintf("%v", uuid.New())
	err := UserHandler.SignUp(newUser)
	if err != nil {
		if strings.Contains(err.Error(), "Duplicate entry") && strings.Contains(err.Error(), "user.email") {
			json.NewEncoder(w).Encode("already registered")
		} else {
			json.NewEncoder(w).Encode("signup failed")
		}
	} else {
		json.NewEncoder(w).Encode("signup success")
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Signing out")
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   "",
		Expires: time.Now(),
	})
}
