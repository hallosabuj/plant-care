package models

type PlantForAPesticide struct {
	PesticideId         string `json:"pesticideId"`
	PlantId             string `json:"plantId"`
	NumberId            string `json:"numberId"`
	PlantName           string `json:"plantName"`
	ProfileImage        string `json:"profileImage"`
	LastAppliedDate     string `json:"lastAppliedDate"`
	NumberOfDaysElapsed string `json:"numberOfDaysElapsed"`
}
