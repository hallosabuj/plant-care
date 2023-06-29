package models

//	Fertilizer
//	swagger:model
type Fertilizer struct {
	// Fertilizer Id
	// in: string
	ID string `json:"fertilizerId"`
	// Fertilizer Name
	// in: string
	Name string `json:"name"`
	// Details about the fertilizer
	// in: string
	Details string `json:"details"`
	// Composition of the fertilizer
	// in: string
	Composition string `json:"composition"`
	// Availability
	// in: string
	Available string `json:"available"`
	// Profile Image
	// in: string
	ProfileImage string `json:"profileImage"`
}
