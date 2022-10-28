package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/hallosabuj/plant-care/server/models"
	"github.com/hallosabuj/plant-care/server/storage"
)

func AddFertilizer(w http.ResponseWriter, r *http.Request) {
	newFertilizer := models.Fertilizer{Name: r.FormValue("name"), Details: r.FormValue("details"), Composition: r.FormValue("composition")}
	newFertilizer.ID = fmt.Sprintf("%v", uuid.New())
	storage.FertilizerHandler.AddFertilizer(newFertilizer)
	json.NewEncoder(w).Encode(newFertilizer)
}
