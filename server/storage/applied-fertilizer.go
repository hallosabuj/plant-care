package storage

import (
	"database/sql"

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
	res, err := a.db.Query("select a.plantid, p.name, a.fertilizerid, f.name, a.appliedDate from appliedfertilizer a,plants p, fertilizers f where a.plantId=p.plantId and a.fertilizerId=f.fertilizerId")
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
	res, err := a.db.Query("select a.plantid, p.name, a.fertilizerid, f.name, a.appliedDate from appliedfertilizer a,plants p, fertilizers f where a.plantId=p.plantId and a.fertilizerId=f.fertilizerId and a."+field+"=?", value)
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
