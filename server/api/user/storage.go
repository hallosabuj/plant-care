package user

import (
	"database/sql"
	"fmt"

	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerU interface {
	SignIn(models.User) (int, error)
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

func (u userHandler) SignIn(userDetails models.User) (int, error) {
	sqlQuery := fmt.Sprintf("select count(*) from user where email='%v' and password='%v'", userDetails.Email, userDetails.Password)
	res, err := u.db.Query(sqlQuery)
	if err != nil {
		return 0, err
	}
	defer res.Close()
	var isCorrect int
	for res.Next() {
		err := res.Scan(&isCorrect)
		if err != nil {
			return 0, err
		}
	}
	return isCorrect, nil
}

func (u userHandler) SignUp(userDetails models.User) error {
	sqlQuery := fmt.Sprintf("insert into user(id, fname, mname, lname, email, password) values('%v', '%v', '%v', '%v', '%v', '%v')", userDetails.ID, userDetails.FName, userDetails.MName, userDetails.LName, userDetails.Email, userDetails.Password)
	_, err := u.db.Exec(sqlQuery)
	if err != nil {
		return err
	}
	return nil
}
