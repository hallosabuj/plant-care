package models

// Plants for a given pesticides
// swagger:model
type PlantForAPesticide struct {
	// Pedticide ID
	// in: string
	PesticideId string `json:"pesticideId"`
	// Plant Id
	// in: string
	PlantId string `json:"plantId"`
	// Number Id of a plant
	// in: string
	NumberId string `json:"numberId"`
	// Plant name
	// in: string
	PlantName string `json:"plantName"`
	// Profile image name
	// in: string
	ProfileImage string `json:"profileImage"`
	// Last applied date of the pesticide
	// in: string
	LastAppliedDate string `json:"lastAppliedDate"`
	// Number of days elapsed since last pesticide applied
	// in: string
	NumberOfDaysElapsed string `json:"numberOfDaysElapsed"`
}
