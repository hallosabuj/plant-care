package models

type NeededFertilizer struct {
	PlantId        string `json:"plantId"`
	PlantName      string `json:"plantName"`
	FertilizerId   string `json:"fertilizerId"`
	FertilizerName string `json:"fertilizerName"`
	ApplyInterval  string `json:"applyInterval"`
	Benefit        string `json:"benefit"`
}
