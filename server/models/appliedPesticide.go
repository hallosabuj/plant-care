package models

// AppliedPesticide
//	swagger:model
type AppliedPesticide struct {
	// Pesticide Id
	// in: string
	PesticideID string `json:"pesticideId"`
	// Pesticide Name
	// in string
	PesticideName string `json:"pesticideName"`
	// Plant Id
	// in: string
	PlantId string `json:"plantId"`
	// Plant Name
	// in: string
	PlantName string `json:"plantName"`
	// Applied date
	// in: string
	AppliedDate string `json:"appliedDate"`
}
