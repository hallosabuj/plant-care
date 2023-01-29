package models

type AppliedPesticide struct {
	PesticideID   string `json:"pesticideId"`
	PesticideName string `json:"pesticideName"`
	PlantId       string `json:"plantId"`
	PlantName     string `json:"plantName"`
	AppliedDate   string `json:"appliedDate"`
}
