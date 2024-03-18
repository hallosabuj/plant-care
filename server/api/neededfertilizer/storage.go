package neededfertilizer

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerPF interface {
	AddNeededFertilizer(models.NeededFertilizer) error
	DeleteNeededFertilizer(models.NeededFertilizer) error
	GetFilteredNeededFertilizers(string, string, *[]models.NeededFertilizer) error
}

var PlantsFertilizersHandler HandlerPF

type plantFertilizerHandler struct {
	db *sql.DB
}

func Connect() {
	var err error
	DB, err := sql.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/plantcare")
	if err != nil {
		fmt.Println("Database connection filed")
	}
	fmt.Println("Connected to database")
	PlantsFertilizersHandler = plantFertilizerHandler{db: DB}
}

func (p plantFertilizerHandler) AddNeededFertilizer(neededFertilizer models.NeededFertilizer) error {
	res, err := p.db.Query("insert into neededfertilizers(plantId,fertilizerId,applyInterval,benefit) values(?,?,?,?)", neededFertilizer.PlantId, neededFertilizer.FertilizerId, neededFertilizer.ApplyInterval, neededFertilizer.Benefit)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Close()
	return err
}

func (p plantFertilizerHandler) DeleteNeededFertilizer(neededFertilizer models.NeededFertilizer) error {
	res, err := p.db.Query("delete from neededfertilizers where plantId = ? and fertilizerId = ?", neededFertilizer.PlantId, neededFertilizer.FertilizerId)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Close()
	return err
}

func (p plantFertilizerHandler) GetFilteredNeededFertilizers(filed string, value string, filteredNeededFertilizers *[]models.NeededFertilizer) error {
	fmt.Println(filed, value)
	res, err := p.db.Query("select IFNULL(n.plantId,''),IFNULL(p.name,''),IFNULL(n.fertilizerId,''),IFNULL(f.name,''),IFNULL(n.applyinterval,''),IFNULL(n.benefit,'') from neededfertilizers n,plants p,fertilizers f where p.plantId=n.plantId and n.fertilizerId=f.fertilizerId and n."+filed+"=?", value)
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
