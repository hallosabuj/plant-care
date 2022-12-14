package storage

import (
	"database/sql"
	"fmt"
	"math"
	"strconv"
	"strings"
	"time"

	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerP interface {
	AddPlant(*models.Plant) error
	GetAllPlants(*[]models.Plant) error
	GetPlantsForAFertilizer(string, *[]models.PlantForAFertilizer) error
	DeleteDetails(string) error
	GetPlantDetails(string, *models.Plant) error
	UpdatePlant(field, plantId, value string) error
	UpdateImageNames(string, []string) error
	RemoveImageNameFromDB(string) error
}

var PlantHandler HandlerP

type plantHandler struct {
	db *sql.DB
}

func (p plantHandler) AddPlant(newPlant *models.Plant) error {
	// Fetching max numberId from the plants table
	sqlQuery := "select MAX(numberId) from plants"
	res, err := p.db.Query(sqlQuery)
	if err == nil {
		if res.Next() {
			res.Scan(&newPlant.NumberId)
			newPlant.NumberId = newPlant.NumberId + 1
		}
	}
	sqlQuery = fmt.Sprintf("insert into plants(plantId,name,dob,details,profileimage,soilType,numberId) values('%s','%s','%s','%s','%s','%s',%d)", newPlant.ID, newPlant.Name, newPlant.DOB, newPlant.Details, newPlant.ProfileImage, newPlant.SoilType, newPlant.NumberId)
	_, err = p.db.Exec(sqlQuery)
	if err != nil {
		return err
	}
	sqlQuery = fmt.Sprintf("insert into NeededFertilizers(plantId,fertilizerId,applyInterval,benefit) values('%s',(SELECT fertilizerId FROM fertilizers where name='water'),'%s','%s')", newPlant.ID, "1", "Transportation of nutrients")
	_, err = p.db.Exec(sqlQuery)
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
func (p plantHandler) GetPlantsForAFertilizer(fertilizerId string, plantsForAFertilizer *[]models.PlantForAFertilizer) error {
	res, err := p.db.Query(`
	SELECT IFNULL(plants.plantId,''),IFNULL(plants.name,''),IFNULL(plants.profileImage,''),IFNULL(plants.applyInterval,''), IFNULL(MAX(applied.appliedDate),'') from (
		SELECT n.plantId as plantId,p.name as name,p.profileImage as profileImage, n.applyInterval as applyInterval
		from neededfertilizers n, plants p 
		where n.plantId=p.plantId and n.fertilizerId=?
	) plants LEFT JOIN (
		SELECT plantId, appliedDate FROM appliedfertilizer 
		where fertilizerId=?
	) applied
	on plants.plantId=applied.plantId GROUP BY plants.plantId order by plants.name`,
		fertilizerId, fertilizerId)
	if err != nil {
		return err
	}
	year2, month2, day2 := time.Now().Date()
	defer res.Close()
	for res.Next() {
		var plant models.PlantForAFertilizer
		plant.FertilizerId = fertilizerId
		err := res.Scan(&plant.PlantId, &plant.PlantName, &plant.ProfileImage, &plant.ApplyInterval, &plant.LastAppliedDate)
		if err != nil {
			return err
		}
		if plant.LastAppliedDate == "" {
			plant.NumberOfDaysElapsed = "0"
		} else {
			temp := strings.Split(plant.LastAppliedDate, "-")
			year1, _ := strconv.Atoi(temp[0])
			month1, _ := strconv.Atoi(temp[1])
			day1, _ := strconv.Atoi(temp[2])
			plant.NumberOfDaysElapsed = strings.Split(fmt.Sprintf("%f", DateDifference(year1, month1, day1, year2, int(month2), day2)), ".")[0]
		}
		*plantsForAFertilizer = append(*plantsForAFertilizer, plant)
	}
	return nil
}
func (p plantHandler) GetAllPlants(allPlants *[]models.Plant) error {
	res, err := p.db.Query("select IFNULL(plantId,''),IFNULL(name,''),IFNULL(dob,''),IFNULL(details,''),IFNULL(profileimage,''),IFNULL(soiltype,'') from plants order by name")
	if err != nil {
		return nil
	}
	defer res.Close()
	for res.Next() {
		var plant models.Plant
		err := res.Scan(&plant.ID, &plant.Name, &plant.DOB, &plant.Details, &plant.ProfileImage, &plant.SoilType)
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
	res, err := p.db.Query("select IFNULL(plantId,''),IFNULL(name,''),IFNULL(dob,''),IFNULL(details,''),IFNULL(profileimage,''),IFNULL(soiltype,'') from plants where plantid=?", plantId)
	if err != nil {
		return nil
	}
	defer res.Close()
	for res.Next() {
		err := res.Scan(&plant.ID, &plant.Name, &plant.DOB, &plant.Details, &plant.ProfileImage, &plant.SoilType)
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

func (p plantHandler) RemoveImageNameFromDB(imageName string) error {
	_, err := p.db.Query("delete from plantimages where name=?", imageName)
	return err
}

// First date is small and second date is large
func DateDifference(year1 int, month1 int, day1 int, year2 int, month2 int, day2 int) float64 {
	t1 := time.Date(year1, time.Month(month1), day1, 0, 0, 0, 0, time.UTC)
	t2 := time.Date(year2, time.Month(month2), day2, 0, 0, 0, 0, time.UTC)
	days := math.Ceil(t2.Sub(t1).Hours() / 24)
	return days
}
