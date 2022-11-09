package models

type AppliedFertilizer struct {
	FertilizerID string `json:"fertilizerId"`
	PlantId      string `json:"plantId"`
	Date         string `json:"date"`
}
