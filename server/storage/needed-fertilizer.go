package storage

import (
	"database/sql"
	"fmt"

	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerPF interface {
	AddNeededFertilizer(models.NeededFertilizer) error
	GetNeededFertilizer(*[]models.NeededFertilizer) error
	GetFilteredNeededFertilizers(string, string, *[]models.NeededFertilizer) error
}

var PlantsFertilizersHandler HandlerPF

type plantFertilizerHandler struct {
	db *sql.DB
}

func (p plantFertilizerHandler) AddNeededFertilizer(neededFertilizer models.NeededFertilizer) error {
	_, err := p.db.Query("insert into NeededFertilizers(plantId,fertilizerId,applyInterval,benefit) values(?,?,?,?)", neededFertilizer.PlantId, neededFertilizer.FertilizerId, neededFertilizer.ApplyInterval, neededFertilizer.Benefit)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func (p plantFertilizerHandler) GetNeededFertilizer(neededFertilizers *[]models.NeededFertilizer) error {
	res, err := p.db.Query("select n.plantId,p.name,n.fertilizerId,f.name,n.applyinterval,n.benefit from NeededFertilizers n,plants p,fertilizers f where p.plantId=n.plantId and n.fertilizerId=f.fertilizerId")
	if err != nil {
		return err
	}
	defer res.Close()
	for res.Next() {
		var neededFertilizer models.NeededFertilizer
		err := res.Scan(&neededFertilizer.PlantId, &neededFertilizer.PlantName, &neededFertilizer.FertilizerId, &neededFertilizer.FertilizerName, &neededFertilizer.ApplyInterval, &neededFertilizer.Benefit)
		if err != nil {
			return nil
		}
		fmt.Println(neededFertilizer)
		*neededFertilizers = append(*neededFertilizers, neededFertilizer)
	}
	return nil
}

func (p plantFertilizerHandler) GetFilteredNeededFertilizers(filed string, value string, filteredNeededFertilizers *[]models.NeededFertilizer) error {
	fmt.Println(filed, value)
	res, err := p.db.Query("select n.plantId,p.name,n.fertilizerId,f.name,n.applyinterval,n.benefit from NeededFertilizers n,plants p,fertilizers f where p.plantId=n.plantId and n.fertilizerId=f.fertilizerId and n."+filed+"=?", value)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Close()
	for res.Next() {
		var neededFertilizer models.NeededFertilizer
		err := res.Scan(&neededFertilizer.PlantId, &neededFertilizer.PlantName, &neededFertilizer.FertilizerId, &neededFertilizer.FertilizerName, &neededFertilizer.ApplyInterval, &neededFertilizer.Benefit)
		if err != nil {
			return nil
		}
		fmt.Println(neededFertilizer)
		*filteredNeededFertilizers = append(*filteredNeededFertilizers, neededFertilizer)
	}
	return err
}
