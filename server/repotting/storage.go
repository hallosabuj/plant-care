package repotting

import (
	"database/sql"
	"fmt"

	"github.com/hallosabuj/plant-care/server/models"
)

type HandlerR interface {
	AddRepotting(models.Repotting) error
	GetRepottingForAPlant(string, *[]models.Repotting) error
}

var RepottingHandler HandlerR

type repottingHandler struct {
	db *sql.DB
}

func Connect() {
	var err error
	DB, err := sql.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/plantcare")
	if err != nil {
		fmt.Println("Database connection filed")
	}
	fmt.Println("Connected to database")
	RepottingHandler = repottingHandler{db: DB}
}

func (r repottingHandler) AddRepotting(repotting models.Repotting) error {
	_, err := r.db.Query("insert into Repotting(plantId,repottingdate) values(?,?)", repotting.PlantId, repotting.RepottingDate)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func (r repottingHandler) GetRepottingForAPlant(plantId string, repottingList *[]models.Repotting) error {
	res, err := r.db.Query("select IFNULL(plantId,''),IFNULL(repottingDate,'') from repotting where plantId=?", plantId)
	if err != nil {
		return err
	}
	defer res.Close()
	for res.Next() {
		var repotting models.Repotting
		err := res.Scan(&repotting.PlantId, &repotting.RepottingDate)
		if err != nil {
			return nil
		}
		fmt.Println(repotting)
		*repottingList = append(*repottingList, repotting)
	}
	return nil
}
