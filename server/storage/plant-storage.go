package storage

import (
	"database/sql"
	"fmt"

	"github.com/hallosabuj/plant-care/server/models"
	"github.com/sirupsen/logrus"
)

type HandlerP interface {
	AddPlant(models.Plant) error
	GetAllPlants(*[]models.Plant) error
	DeleteDetails(string) error
	GetPlantDetails(string, *models.Plant) error
	UpdatePlant(field, plantId, value string) error
	UpdateImageNames(string, []string) error
}

var PlantHandler HandlerP

func fatalf(format string, err error) {
	if err != nil {
		logrus.Fatalf(format, err)
	}
}

type plantHandler struct {
	db *sql.DB
}

func (p plantHandler) AddPlant(newPlant models.Plant) error {
	fmt.Println(newPlant)
	sqlQuery := fmt.Sprintf("insert into plants(plantId,name,dob,details,profileimage) values('%s','%s','%s','%s','%s')", newPlant.ID, newPlant.Name, newPlant.DOB, newPlant.Details, newPlant.ProfileImage)
	_, err := p.db.Exec(sqlQuery)
	if err != nil {
		return err
	}
	sqlQuery = fmt.Sprintf("insert into plantimages(plantid,name) values('%s','%s')", newPlant.ID, newPlant.ProfileImage)
	_, err = p.db.Exec(sqlQuery)
	if err != nil {
		return err
	}
	return nil
}

func (p plantHandler) GetAllPlants(allPlants *[]models.Plant) error {
	res, err := p.db.Query("select * from plants")
	if err != nil {
		return nil
	}
	defer res.Close()
	for res.Next() {
		var plant models.Plant
		err := res.Scan(&plant.ID, &plant.Name, &plant.DOB, &plant.Details, &plant.ProfileImage)
		if err != nil {
			return err
		}
		*allPlants = append(*allPlants, plant)
	}
	return nil
}

func (p plantHandler) DeleteDetails(plantId string) error {
	_, err := p.db.Query("delete from plants where plantId=?", plantId)
	return err
}

func (p plantHandler) UpdatePlant(field, plantId, value string) error {
	_, err := p.db.Query("update plants set "+field+"=? where plantid=?", value, plantId)
	return err
}

func (p plantHandler) UpdateImageNames(plantId string, newImageNames []string) error {
	for _, imageName := range newImageNames {
		sqlQuery := fmt.Sprintf("insert into plantimages(plantid,name) values('%s','%s')", plantId, imageName)
		_, err := p.db.Exec(sqlQuery)
		if err != nil {
			return err
		}
	}
	return nil
}

func (p plantHandler) GetPlantDetails(plantId string, plant *models.Plant) error {
	// Getting plant details
	res, err := p.db.Query("select * from plants where plantid=?", plantId)
	if err != nil {
		return nil
	}
	defer res.Close()
	for res.Next() {
		err := res.Scan(&plant.ID, &plant.Name, &plant.DOB, &plant.Details, &plant.ProfileImage)
		if err != nil {
			return err
		}
	}
	// Getting imagenames
	res, err = p.db.Query("select imageid,name from plantimages where plantid=?", plantId)
	if err != nil {
		return nil
	}
	defer res.Close()
	for res.Next() {
		var imageId int
		var imageName string
		err := res.Scan(&imageId, &imageName)
		if err != nil {
			return nil
		}
		plant.ImageNames[imageId] = imageName
	}
	return nil
}
