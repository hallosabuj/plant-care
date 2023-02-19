package appliedpesticide

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerAP interface {
	AddEntry([]models.AppliedPesticide, map[string]bool) error
	GetAllAppliedPesticides(*[]models.AppliedPesticide) error
	GetFilteredAllAppliedPesticides(string, string, *[]models.AppliedPesticide) error
}

var AppliedPesticideHandler HandlerAP

type appliedPesticideHnadler struct {
	db *sql.DB
}

func Connect() {
	var err error
	DB, err := sql.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/plantcare")
	if err != nil {
		fmt.Println("Database connection filed")
	}
	fmt.Println("Connected to database")
	AppliedPesticideHandler = appliedPesticideHnadler{db: DB}
}

func (a appliedPesticideHnadler) AddEntry(appliedPesticides []models.AppliedPesticide, result map[string]bool) error {
	for _, appliedPesticide := range appliedPesticides {
		_, err := a.db.Query("insert into AppliedPesticide(plantId,pesticideId,appliedDate) values(?,?,?)", appliedPesticide.PlantId, appliedPesticide.PesticideID, appliedPesticide.AppliedDate)
		if err != nil {
			fmt.Println(err)
			result[appliedPesticide.PlantId] = false
		}
		result[appliedPesticide.PlantId] = true
	}
	return nil
}

func (a appliedPesticideHnadler) GetAllAppliedPesticides(allAppliedPesticides *[]models.AppliedPesticide) error {
	res, err := a.db.Query("select IFNULL(a.plantid,''), IFNULL(p.name,''), IFNULL(a.pesticideid,''), IFNULL(pest.name,''), IFNULL(a.appliedDate,'') from appliedPesticide a,plants p, Pesticides pest where a.plantId=p.plantId and a.pesticideId=pest.pesticideId order by a.appliedDate desc")
	if err != nil {
		return nil
	}
	defer res.Close()
	for res.Next() {
		var appliedPesticide models.AppliedPesticide
		err := res.Scan(&appliedPesticide.PlantId, &appliedPesticide.PlantName, &appliedPesticide.PesticideID, &appliedPesticide.PesticideName, &appliedPesticide.AppliedDate)
		if err != nil {
			return err
		}
		*allAppliedPesticides = append(*allAppliedPesticides, appliedPesticide)
	}
	return nil
}

func (a appliedPesticideHnadler) GetFilteredAllAppliedPesticides(field, value string, filteredAppliedPesticides *[]models.AppliedPesticide) error {
	res, err := a.db.Query("select IFNULL(a.plantid,''), IFNULL(p.name,''), IFNULL(a.pesticideid,''), IFNULL(pest.name,''), IFNULL(a.appliedDate,'') from appliedpesticide a,plants p, pesticides pest where a.plantId=p.plantId and a.pesticideId=pest.pesticideId and a."+field+"=? order by a.appliedDate desc", value)
	if err != nil {
		return nil
	}
	defer res.Close()
	for res.Next() {
		var appliedPesticide models.AppliedPesticide
		err := res.Scan(&appliedPesticide.PlantId, &appliedPesticide.PlantName, &appliedPesticide.PesticideID, &appliedPesticide.PesticideName, &appliedPesticide.AppliedDate)
		if err != nil {
			return err
		}
		*filteredAppliedPesticides = append(*filteredAppliedPesticides, appliedPesticide)
	}
	return nil
}
