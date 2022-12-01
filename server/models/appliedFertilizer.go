package models

type AppliedFertilizer struct {
	FertilizerID   string `json:"fertilizerId"`
	FertilizerName string `json:"fertilizerName"`
	PlantId        string `json:"plantId"`
	PlantName      string `json:"plantName"`
	AppliedDate    string `json:"appliedDate"`
}
