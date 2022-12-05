package models

type Fertilizer struct {
	ID           string `json:"fertilizerId"`
	Name         string `json:"name"`
	Details      string `json:"details"`
	Composition  string `json:"composition"`
	Available    string `json:"available"`
	ProfileImage string `json:"profileImage"`
}
