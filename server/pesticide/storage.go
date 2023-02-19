package pesticide

import (
	"database/sql"
	"fmt"

	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerPest interface {
	AddPesticides(models.Pesticides) error
	GetAllPesticides(*[]models.Pesticides) error
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

func (f pesticideHandler) AddPesticides(newPesticide models.Pesticides) error {
	sqlQuery := fmt.Sprintf("insert into pesticides(pesticideid,name,composition,details,profileimage) values('%s','%s','%s','%s','%s')", newPesticide.ID, newPesticide.Name, newPesticide.Composition, newPesticide.Details, newPesticide.ProfileImage)
	_, err := f.db.Exec(sqlQuery)
	if err != nil {
		return err
	}
	return nil
}

func (f pesticideHandler) GetAllPesticides(allPesticides *[]models.Pesticides) error {
	res, err := f.db.Query("select IFNULL(pesticideid,''),IFNULL(name,''),IFNULL(composition,''),IFNULL(details,''),IFNULL(profileimage,''),IFNULL(available,'') from pesticides order by name")
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
