package models

// All Plants for a user with fertilizer usage info
// swagger:model
type PlantWithFertilizerUsage struct {
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
	// Using this fertilizer or not
	// in: string
	UsingOrNot bool `json:"using"`
}
