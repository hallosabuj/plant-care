package plant

import (
	"bytes"
)

//////////////////////////////////////////////////////////
// swagger:route GET /plant getAllPlants
// Lists all the plants from the database
// Produces:
//	- application/json
// Schemes: http, https
//	Responses:
//		200: []Plant
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// swagger:route POST /plant addPlant
// Lists all the plants from the database
// Consumes:
// - multipart/form-data
// Produces:
//	- application/json
// Schemes: http, https
//	Responses:
//		200: Plant
///////////////////////////////////////////////////////////

// swagger:parameters addPlant
type ReqAddPlant struct {
	// Name of the Plant
	// required: true
	Name string `json:"name"`
	// Date when plant was planted
	// required: true
	DOB string `json:"dob"`
	// Details about the plant
	// required: true
	Details string `json:"details"`
	// Favourable soil type for the plant
	// required: true
	SoilType string `json:"soilType"`
	// Small sized image
	// in: formData
	// required: true
	// swagger:file
	Small *bytes.Buffer `json:"imageSmall"`
	// Medium sized image
	// in: formData
	// required: true
	// swagger:file
	Medium *bytes.Buffer `json:"imageMedium"`
	// Large sized image
	// in: formData
	// required: true
	// swagger:file
	Large *bytes.Buffer `json:"imageLarge"`
}

///////////////////////////////////////////////////////////
// swagger:route GET /plant/{plantId} plantDetails
// Show details for a plant
// Produces:
// 	- application/json
//	Schemes: http, https
// Responses:
//		200: Plant
///////////////////////////////////////////////////////////

// swagger:parameters plantDetails deletePlant
type PlantId struct {
	// The ID of the plant
	// in: path
	// required: true
	ID string `json:"plantId"`
}

///////////////////////////////////////////////////////////
//	swagger:route DELETE /plant/{plantId} deletePlant
//	Delete a plant for a given id
//	Schemes: http, https
//	Produces:
//		- application/json
//	Responses:
//		200:
//			description: Plant deleted successfully
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//swagger:route GET /plants/fertilizer/{fertilizerId} getPlantForAFertilizer
// Get all plant that uses a perticular fertilizer
// Schemes: http, https
// Produces:
// 	- application/json
// Responses:
// 	200: []PlantForAFertilizer
///////////////////////////////////////////////////////////

// swagger:parameters getPlantForAFertilizer
type FertilizerId struct {
	// Fertilizer Id
	// required: true
	// in: path
	FertilizerId string `json:"fertilizerId"`
}

///////////////////////////////////////////////////////////
//swagger:route GET /plants/pesticide/{pesticideId} getPlantForAPesticide
// Get all plant that uses a perticular pesticide
// Schemes: http, https
// Produces:
// 	- application/json
// Responses:
// 	200: []PlantForAPesticide
///////////////////////////////////////////////////////////

// swagger:parameters getPlantForAPesticide
type PesticideId struct {
	// Pesticide Id
	// required: true
	// in: path
	PesticideId string `json:"pesticideId"`
}

///////////////////////////////////////////////////////////
// swagger:route PUT /plant/update/{field}/{plantId}/{value} updatePlant
// Update a field for a plant
// Schemes: http, https
// Produces:
// 	- application/json
// Responses:
// 	200:
//	 description: "Value updated"
///////////////////////////////////////////////////////////

// swagger:parameters updatePlant
type ReqUpdatePlant struct {
	// Field that need to be updated
	// required: true
	// in: path
	Field string `json:"field"`
	// Plant Id
	// required: true
	// in: path
	PlantId string `json:"plantId"`
	// New value for the field
	// required: true
	// in: path
	Value string `json:"value"`
}

///////////////////////////////////////////////////////////
//swagger:route DELETE /plant/deleteImage/{imageName} deletePlantPhoto
// Delete a plant image
// Schemes: http, https
// Produces:
// 	- application/json
// Responses:
//  200:
//   description: "Image deleted successfylly"
///////////////////////////////////////////////////////////

// swagger:parameters deletePlantPhoto
type ReqDeletePlantPhoto struct {
	// Image name that needs to be deleted
	// in: path
	// required: true
	ImageName string `json:"imageName"`
}

///////////////////////////////////////////////////////////
//	swagger:route GET /plant/downloadImage/{size}/{imageName} downloadImage
//	Download a plant image
//	Schemes: http, https
//	Produces:
//		- image/jpeg
//	Responses:
//	200:
//		description: Image downloaded successfully
//
///////////////////////////////////////////////////////////

// swagger:parameters downloadImage
type ReqDownloadImage struct {
	// Size of the image
	// in: path
	// required: true
	Size string `json:"size"`
	// Name of the image
	// in: path
	// required: true
	ImageName string `json:"imageName"`
}

///////////////////////////////////////////////////////////
//	swagger:route GET /plant/uploadImages addImages
//	Get all plant that uses a perticular fertilizer
//	Schemes: http, https
//	Produces:
//		- application/json
///////////////////////////////////////////////////////////

// swagger:parameters addImages
type ReqUploadImages struct {
	//	Plant Id
	//	required: true
	PlantId string `json:"id"`
	// Large Image
	// in: formData
	// required: true
	// swagger:file
	Large *bytes.Buffer `json:"imageLarge"`
	// Medium Image
	// in: formData
	// required: true
	// swagger:file
	Medium *bytes.Buffer `json:"imageMedium"`
	// Large Image
	// in: formData
	// required: true
	// swagger:file
	Small *bytes.Buffer `json:"imageSmall"`
}
