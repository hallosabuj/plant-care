package storage

import (
	"database/sql"
	"fmt"

	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerF interface {
	AddFertilizer(models.Fertilizer) error
	GetAllFertilizers(*[]models.Fertilizer) error
	DeleteFertilizerDetails(string) error
	GetFertilizerDetails(string, *models.Fertilizer) error
	UpdateFertilizer(string, string, string) error
}

var FertilizerHandler HandlerF

type fertilizerHandler struct {
	db *sql.DB
}

func (f fertilizerHandler) AddFertilizer(newFertilizer models.Fertilizer) error {
	sqlQuery := fmt.Sprintf("insert into fertilizers(fertilizerid,name,composition,details,profileimage) values('%s','%s','%s','%s','%s')", newFertilizer.ID, newFertilizer.Name, newFertilizer.Composition, newFertilizer.Details, newFertilizer.ProfileImage)
	_, err := f.db.Exec(sqlQuery)
	if err != nil {
		return err
	}
	return nil
}

func (f fertilizerHandler) GetAllFertilizers(allFertilizers *[]models.Fertilizer) error {
	res, err := f.db.Query("select IFNULL(fertilizerid,''),IFNULL(name,''),IFNULL(composition,''),IFNULL(details,''),IFNULL(profileimage,''),IFNULL(available,'') from fertilizers")
	if err != nil {
		return err
	}
	defer res.Close()

	for res.Next() {
		var fertilizer models.Fertilizer
		err = res.Scan(&fertilizer.ID, &fertilizer.Name, &fertilizer.Composition, &fertilizer.Details, &fertilizer.ProfileImage, &fertilizer.Available)
		if err != nil {
			return err
		}
		fmt.Println(fertilizer)
		*allFertilizers = append(*allFertilizers, fertilizer)
	}
	return nil
}

func (f fertilizerHandler) DeleteFertilizerDetails(fertilizerId string) error {
	_, err := f.db.Query("delete from fertilizers where fertilizerId=?", fertilizerId)
	return err
}

func (f fertilizerHandler) GetFertilizerDetails(fertilizerId string, fertilizer *models.Fertilizer) error {
	res, err := f.db.Query("select IFNULL(fertilizerid,''),IFNULL(name,''),IFNULL(composition,''),IFNULL(details,''),IFNULL(available,''),IFNULL(profileimage,'') from fertilizers where fertilizerId=?", fertilizerId)
	if err != nil {
		return err
	}
	defer res.Close()

	for res.Next() {
		err = res.Scan(&fertilizer.ID, &fertilizer.Name, &fertilizer.Composition, &fertilizer.Details, &fertilizer.Available, &fertilizer.ProfileImage)
		if err != nil {
			return err
		}
	}
	return nil
}

func (f fertilizerHandler) UpdateFertilizer(fertilizerId string, field string, value string) error {
	_, err := f.db.Query("update fertilizers set "+field+"=? where fertilizerid=?", value, fertilizerId)
	return err
}
