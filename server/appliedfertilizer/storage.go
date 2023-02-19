package appliedfertilizer

import (
	"database/sql"
	"fmt"

	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerAF interface {
	AddEntry([]models.AppliedFertilizer, map[string]bool) error
	GetAllAppliedFertilizers(*[]models.AppliedFertilizer) error
	GetFilteredAllAppliedFertilizers(string, string, *[]models.AppliedFertilizer) error
}

var AppliedFertilizerHandler HandlerAF

type appliedFertilizeHnadler struct {
	db *sql.DB
}

func Connect() {
	var err error
	DB, err := sql.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/plantcare")
	if err != nil {
		fmt.Println("Database connection filed")
	}
	fmt.Println("Connected to database")
	AppliedFertilizerHandler = appliedFertilizeHnadler{db: DB}
}

func (a appliedFertilizeHnadler) AddEntry(appliedFertilizers []models.AppliedFertilizer, result map[string]bool) error {
	for _, appliedFertilizer := range appliedFertilizers {
		_, err := a.db.Query("insert into AppliedFertilizer(plantId,fertilizerId,appliedDate) values(?,?,?)", appliedFertilizer.PlantId, appliedFertilizer.FertilizerID, appliedFertilizer.AppliedDate)
		if err != nil {
			result[appliedFertilizer.PlantId] = false
		}
		result[appliedFertilizer.PlantId] = true
	}
	return nil
}

func (a appliedFertilizeHnadler) GetAllAppliedFertilizers(allAppliedFertilizers *[]models.AppliedFertilizer) error {
	res, err := a.db.Query("select IFNULL(a.plantid,''), IFNULL(p.name,''), IFNULL(a.fertilizerid,''), IFNULL(f.name,''), IFNULL(a.appliedDate,'') from appliedfertilizer a,plants p, fertilizers f where a.plantId=p.plantId and a.fertilizerId=f.fertilizerId order by a.appliedDate desc")
	if err != nil {
		return nil
	}
	defer res.Close()
	for res.Next() {
		var appliedFertilizer models.AppliedFertilizer
		err := res.Scan(&appliedFertilizer.PlantId, &appliedFertilizer.PlantName, &appliedFertilizer.FertilizerID, &appliedFertilizer.FertilizerName, &appliedFertilizer.AppliedDate)
		if err != nil {
			return err
		}
		*allAppliedFertilizers = append(*allAppliedFertilizers, appliedFertilizer)
	}
	return nil
}

func (a appliedFertilizeHnadler) GetFilteredAllAppliedFertilizers(field, value string, filteredAppliedFertilizers *[]models.AppliedFertilizer) error {
	res, err := a.db.Query("select IFNULL(a.plantid,''), IFNULL(p.name,''), IFNULL(a.fertilizerid,''), IFNULL(f.name,''), IFNULL(a.appliedDate,'') from appliedfertilizer a,plants p, fertilizers f where a.plantId=p.plantId and a.fertilizerId=f.fertilizerId and a."+field+"=? order by a.appliedDate desc", value)
	if err != nil {
		return nil
	}
	defer res.Close()
	for res.Next() {
		var appliedFertilizer models.AppliedFertilizer
		err := res.Scan(&appliedFertilizer.PlantId, &appliedFertilizer.PlantName, &appliedFertilizer.FertilizerID, &appliedFertilizer.FertilizerName, &appliedFertilizer.AppliedDate)
		if err != nil {
			return err
		}
		*filteredAppliedFertilizers = append(*filteredAppliedFertilizers, appliedFertilizer)
	}
	return nil
}
