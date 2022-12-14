package models

type PlantForAFertilizer struct {
	FertilizerId        string `json:"fertilizerId"`
	PlantId             string `json:"plantId"`
	PlantName           string `json:"plantName"`
	ProfileImage        string `json:"profileImage"`
	ApplyInterval       string `json:"applyInterval"`
	LastAppliedDate     string `json:"lastAppliedDate"`
	NumberOfDaysElapsed string `json:"numberOfDaysElapsed"`
}
