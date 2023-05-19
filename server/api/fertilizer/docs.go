package fertilizer

import "bytes"

///////////////////////////////////////////////////////////
//	swagger:route GET /fertilizer getFertilizers
//	List all the fertilizers
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200: []Fertilizer
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//	swagger:route POST /fertilizer addFertilizer
//	Add a fertilizer
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200: Fertilizer
///////////////////////////////////////////////////////////

//	swagger:parameters addFertilizer
type ReqAddFertilizer struct {
	// Fertilizer Name
	// in: string
	Name string `json:"name"`
	// Details about the fertilizer
	// in: string
	Details string `json:"details"`
	// Composition of the fertilizer
	// in: string
	Composition string `json:"composition"`
	// Profile Image
	// in: formData
	// required: true
	// swagger:file
	ProfileImage *bytes.Buffer `json:"image"`
}

///////////////////////////////////////////////////////////
//	swagger:route GET /fertilizer/{fertilizerId} fertilizerDetails
//	Show details for a fertilizer
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200: Fertilizer
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//	swagger:route DELETE /fertilizer/{fertilizerId} deleteFertilizer
//	Delete a fertilizer
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200:
//			description: Deleted successfully
///////////////////////////////////////////////////////////

//	swagger:parameters fertilizerDetails deleteFertilizer
type FertilizerId struct {
	// Fertilizer Id
	// in: path
	FertilizerId string `json:"fertilizerId"`
}

///////////////////////////////////////////////////////////
//	swagger:route GET /fertilizer/downloadImage/{imageName} downloadFertilizerImage
//	Used to download image of a fertilizer
//	Schemes: http, https
//	Produces:
//		- image/jpeg
//	Responses:
//	200:
//		description: Image downloaded successfully
///////////////////////////////////////////////////////////

//	swagger:parameters downloadFertilizerImage
type ReqDownloadFertilizerImage struct {
	// Image name
	// in: path
	ImageName string `json:"imageName"`
}

///////////////////////////////////////////////////////////
//	swagger:route POST /fertilizer/update/{field}/{fertilizerId}/{value} updateFertilizer
//	Update values for a fertilizer
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200:
//			description: "Field value updated"
///////////////////////////////////////////////////////////

//	swagger:parameters updateFertilizer
type ReqUpdateFertilizer struct {
	// Name of the field that need to be updated
	// in: path
	Field string `json:"field"`
	// Fertilizer Id whose value would be updated
	// in: path
	FertilizerId string `json:"fertilizerId"`
	// New value for the field
	// in: path
	Value string `json:"value"`
}
