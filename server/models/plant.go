package models

// Plant
//
// swagger:model
type Plant struct {
	// Id of the plant
	// in: string
	ID string `json:"plantId"`
	// Number Id of the plant
	// in: int
	NumberId int `json:"numberId"`
	// Name of the Plant
	// in: string
	Name string `json:"name" validate:"required"`
	// Plant is public or not
	// in: string
	Public string `json:"public"`
	// Date when plant was planted
	// in: string
	DOB string `json:"dob" validate:"required"`
	// Profile image Id
	// in: string
	ProfileImage string `json:"profileImage" validate:"required"`
	// List of image IDs
	// in: map[string]string
	ImageNames map[string]string `json:"imageNames"`
	// Details about the plant
	// in: string
	Details string `json:"details" validate:"required"`
	// Favourable soil type for the plant
	// in: string
	SoilType string `json:"soilType" validate:"required"`
}
