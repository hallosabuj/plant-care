package models

// Plants for a given fertilizer
// swagger:model
type PlantForAFertilizer struct {
	// Fertilizer ID
	// in: string
	FertilizerId string `json:"fertilizerId"`
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
	// Apply interval for a fertilizer for the plant
	// in: string
	ApplyInterval string `json:"applyInterval"`
	// Last applied date of the fertilizer
	// in: string
	LastAppliedDate string `json:"lastAppliedDate"`
	// Number of days elapsed since last fertilization
	// in: string
	NumberOfDaysElapsed string `json:"numberOfDaysElapsed"`
}
