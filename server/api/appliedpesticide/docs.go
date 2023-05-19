package appliedpesticide

///////////////////////////////////////////////////////////
//	swagger:route GET /applied-pesticide getAppliedPesticide
//	List all applied-pesticides
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200: []AppliedPesticide
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//	swagger:route POST /applied-pesticide addAppliedPesticide
//	Add applied-pesticides
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200: RespAddAppliedPesticide
///////////////////////////////////////////////////////////

//	swagger:parameters addAppliedPesticide
type ReqAddAppliedPesticide struct {
	//	List of applied pesticides
	//	in: body
	AppliedPesticides []ReqAppliedPesticide `json:"appliedPesticides"`
}

type ReqAppliedPesticide struct {
	//	Pesticide Id
	//	in: string
	PesticideID string `json:"pesticideId"`
	//	Plant Id
	//	in: string
	PlantId string `json:"plantId"`
	//	Applied Date
	//	in: string
	AppliedDate string `json:"appliedDate"`
}

//	swagger:model
//	in: map[string]string
type RespAddAppliedPesticide map[string]string

///////////////////////////////////////////////////////////
//	swagger:route GET /applied-pesticide/{filteringField}/{value} getFilteredAppliedPesticides
//	List applied pesticides after filtering based on a field
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200: []AppliedPesticide
///////////////////////////////////////////////////////////

// swagger:parameters getFilteredAppliedPesticides
type ReqGetFilteredAppliedPesticides struct {
	// Field on which filtering should be done
	// in: path
	FilteringField string `json:"filteringField"`
	// Value of the field
	// in: path
	Value string `json:"value"`
}
