package appliedfertilizer

///////////////////////////////////////////////////////////
//	swagger:route GET /applied-fertilizer getAppliedFertilizer
//	List all applied-fertilizers
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200: []AppliedFertilizer
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//	swagger:route POST /applied-fertilizer addAppliedFertilizer
//	Add applied-fertilizers
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200: RespAddAppliedFertilizer
///////////////////////////////////////////////////////////

//	swagger:parameters addAppliedFertilizer
type ReqAddAppliedFertilizer struct {
	//	List of applied fertilizers
	//	in: body
	AppliedFertilizers []ReqAppliedFertilizer `json:"appliedFertilizers"`
}

type ReqAppliedFertilizer struct {
	//	Fertilizer Id
	//	in: string
	FertilizerID string `json:"fertilizerId"`
	//	Plant Id
	//	in: string
	PlantId string `json:"plantId"`
	//	Applied Date
	//	in: string
	AppliedDate string `json:"appliedDate"`
}

//	swagger:model
//	in: map[string]string
type RespAddAppliedFertilizer map[string]string

///////////////////////////////////////////////////////////
//	swagger:route GET /applied-fertilizer/{filteringField}/{value} getFilteredAppliedFertilizers
//	List applied fertilizers after filtering based on a field
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200: []AppliedFertilizer
///////////////////////////////////////////////////////////

// swagger:parameters getFilteredAppliedFertilizers
type ReqGetFilteredAppliedFertilizers struct {
	// Field on which filtering should be done
	// in: path
	FilteringField string `json:"filteringField"`
	// Value of the field
	// in: path
	Value string `json:"value"`
}
