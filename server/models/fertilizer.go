package models

type Fertilizer struct {
	ID            string `json:"fertilizerId"`
	Name          string `json:"name"`
	Details       string `json:"details"`
	Composition   string `json:"composition"`
	ApplyInterval string `json:"applyInterval"`
	ImageName     string `json:"imageName"`
}
