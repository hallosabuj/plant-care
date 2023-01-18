package models

type Pesticides struct {
	ID           string `json:"pesticideId"`
	Name         string `json:"name"`
	Details      string `json:"details"`
	Composition  string `json:"composition"`
	Available    string `json:"available"`
	ProfileImage string `json:"profileImage"`
}
