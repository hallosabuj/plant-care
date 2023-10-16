package user

import (
	"database/sql"
	"fmt"

	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerU interface {
	SignIn(models.User) error
	SignUp(models.User) error
}

var UserHandler HandlerU

type userHandler struct {
	db *sql.DB
}

func Connect() {
	var err error
	DB, err := sql.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/plantcare")
	if err != nil {
		fmt.Println("Database connection filed")
	}
	fmt.Println("Connected to database")
	UserHandler = userHandler{db: DB}
}

func (u userHandler) SignIn(models.User) error {
	return nil
}

func (u userHandler) SignUp(models.User) error {
	return nil
}
