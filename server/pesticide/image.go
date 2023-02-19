package pesticide

import (
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"
	"path/filepath"
)

// //////////////////////////////////////////////
// Pesticides related image operations
// //////////////////////////////////////////////
func StorePesticideImage(fileName string, file multipart.File, fileHeader multipart.FileHeader) error {
	defer file.Close()
	// Create the uploads folder if it doesn't exist
	err := os.MkdirAll("./images/pesticides", os.ModePerm)
	if err != nil {
		return err
	}
	imageName := fmt.Sprintf("%s%s",
		fileName,
		filepath.Ext(fileHeader.Filename),
	)
	// Create a new file in the uploads directory
	dst, err := os.Create(fmt.Sprintf("./images/pesticides/%s", imageName))
	if err != nil {
		return err
	}
	defer dst.Close()

	// Copy the uploaded file to the filesystem at the specified destination
	_, err = io.Copy(dst, file)
	if err != nil {
		return err
	}
	return nil
}

func DeletePesticideImage(fertilizerId string) error {
	files, _ := filepath.Glob(fmt.Sprintf("./images/pesticides/%s*", fertilizerId))
	for _, file := range files {
		if err := os.Remove(file); err != nil {
			return err
		}
	}
	return nil
}

func GetPesticideImage(fileName string) ([]byte, error) {
	files, err := filepath.Glob(fmt.Sprintf("./images/pesticides/%s*", fileName))
	if err != nil {
		return nil, err
	}
	for _, file := range files {
		fmt.Println(file)
		// http.ServeFile(w, r, file)
		data, _ := ioutil.ReadFile(file)
		return data, nil
	}
	return nil, fmt.Errorf("unknown Error")
}
