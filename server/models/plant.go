package models

type Plant struct {
	ID           string         `json:"plantId"`
	Name         string         `json:"name"`
	DOB          string         `json:"dob"`
	ProfileImage string         `json:"profileImage"`
	ImageNames   map[int]string `json:"imageNames"`
	Details      string         `json:"details"`
	SoilType     string         `json:"soilType"`
}
