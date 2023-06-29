package models

//	AppliedFertilizer
//
//	swagger:model
type AppliedFertilizer struct {
	//	Fertilizer Id
	//	in: string
	FertilizerID string `json:"fertilizerId"`
	//	Fertilizer Name
	//	in: string
	FertilizerName string `json:"fertilizerName"`
	//	Plant Id
	//	in: string
	PlantId string `json:"plantId"`
	//	Plant Name
	//	in: string
	PlantName string `json:"plantName"`
	//	Applied Date
	//	in: string
	AppliedDate string `json:"appliedDate"`
}
