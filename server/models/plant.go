package models

type Plant struct {
	ID         string   `json:"plantId"`
	Name       string   `json:"name"`
	DOB        string   `json:"dob"`
	ImageNames []string `json:"imageNames"`
}
