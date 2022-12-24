package storage

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Connect() {
	var err error
	DB, err = sql.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/plantcare")
	if err != nil {
		fmt.Println("Database connection filed")
	}
	fmt.Println("Connected to database")
	PlantHandler = plantHandler{db: DB}
	FertilizerHandler = fertilizerHandler{db: DB}
	PlantsFertilizersHandler = plantFertilizerHandler{db: DB}
	AppliedFertilizerHandler = appliedFertilizeHnadler{db: DB}
	RepottingHandler = repottingHandler{db: DB}
}
