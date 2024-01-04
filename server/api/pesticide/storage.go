package pesticide

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerPest interface {
	AddPesticides(string, models.Pesticides) error
	GetAllPesticides(string, *[]models.Pesticides) error
	GetPesticideDetails(string, *models.Pesticides) error
	DeletePesticideDetails(string) error
	UpdatePesticide(string, string, string) error
}

var PesticideHandler HandlerPest

type pesticideHandler struct {
	db *sql.DB
}

func Connect() {
	var err error
	DB, err := sql.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/plantcare")
	if err != nil {
		fmt.Println("Database connection filed")
	}
	fmt.Println("Connected to database")
	PesticideHandler = pesticideHandler{db: DB}
}

func (f pesticideHandler) AddPesticides(email string, newPesticide models.Pesticides) error {
	sqlQuery := fmt.Sprintf("insert into pesticides(pesticideid,name,composition,details,profileimage, user_email) values('%s','%s','%s','%s','%s','%s')", newPesticide.ID, newPesticide.Name, newPesticide.Composition, newPesticide.Details, newPesticide.ProfileImage, email)
	_, err := f.db.Exec(sqlQuery)
	if err != nil {
		return err
	}
	return nil
}

func (f pesticideHandler) GetAllPesticides(email string, allPesticides *[]models.Pesticides) error {
	sqlQuery := fmt.Sprintf("select IFNULL(pesticideid,''),IFNULL(name,''),IFNULL(composition,''),IFNULL(details,''),IFNULL(profileimage,''),IFNULL(available,'') from pesticides where user_email='%v' order by name", email)
	res, err := f.db.Query(sqlQuery)
	if err != nil {
		return err
	}
	defer res.Close()

	for res.Next() {
		var pesticide models.Pesticides
		err = res.Scan(&pesticide.ID, &pesticide.Name, &pesticide.Composition, &pesticide.Details, &pesticide.ProfileImage, &pesticide.Available)
		if err != nil {
			return err
		}
		fmt.Println(pesticide)
		*allPesticides = append(*allPesticides, pesticide)
	}
	return nil
}

func (f pesticideHandler) GetPesticideDetails(pesticideId string, pesticide *models.Pesticides) error {
	res, err := f.db.Query("select IFNULL(pesticideid,''),IFNULL(name,''),IFNULL(composition,''),IFNULL(details,''),IFNULL(available,''),IFNULL(profileimage,'') from pesticides where pesticideId=?", pesticideId)
	if err != nil {
		return err
	}
	defer res.Close()

	for res.Next() {
		err = res.Scan(&pesticide.ID, &pesticide.Name, &pesticide.Composition, &pesticide.Details, &pesticide.Available, &pesticide.ProfileImage)
		if err != nil {
			return err
		}
	}
	return nil
}

func (f pesticideHandler) DeletePesticideDetails(pesticideId string) error {
	_, err := f.db.Query("delete from pesticides where pesticideId=?", pesticideId)
	return err
}

func (f pesticideHandler) UpdatePesticide(pesticideId string, field string, value string) error {
	_, err := f.db.Query("update pesticides set "+field+"=? where pesticideId=?", value, pesticideId)
	return err
}
