package storage

import (
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"
)

func makeTwoDigitRepresentation(num int) string {
	if num < 0 {
		num = -num
	}
	if num < 10 {
		return fmt.Sprintf("0%v", num)
	} else {
		return fmt.Sprintf("%v", num)
	}
}

func StoreImage(id string, file multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	defer file.Close()
	// Create the uploads folder if it doesn't exist
	err := os.MkdirAll("./images", os.ModePerm)
	if err != nil {
		return "", err
	}

	// Getting the current time
	now := time.Now()
	imageName := fmt.Sprintf("%s_%d%s%s_%s%s%s%s",
		id,
		now.Year(),
		makeTwoDigitRepresentation(int(now.Month())),
		makeTwoDigitRepresentation(now.Day()),
		makeTwoDigitRepresentation(now.Hour()),
		makeTwoDigitRepresentation(now.Minute()),
		makeTwoDigitRepresentation(now.Second()),
		filepath.Ext(fileHeader.Filename),
	)
	// Create a new file in the uploads directory
	dst, err := os.Create(fmt.Sprintf("./images/%s", imageName))
	if err != nil {
		return "", err
	}
	defer dst.Close()

	// Copy the uploaded file to the filesystem at the specified destination
	_, err = io.Copy(dst, file)
	if err != nil {
		return "", err
	}
	return imageName, nil
}

func StoreMultipleImage(plantId string, files []*multipart.FileHeader) error {
	for _, fileHeader := range files {
		// Open the file
		file, err := fileHeader.Open()
		if err != nil {
			return err
		}

		defer file.Close()

		now := time.Now()
		dst, err := os.Create(fmt.Sprintf("./images/%s_%d%s%s_%s%s%s%s",
			plantId,
			now.Year(),
			makeTwoDigitRepresentation(int(now.Month())),
			makeTwoDigitRepresentation(now.Day()),
			makeTwoDigitRepresentation(now.Hour()),
			makeTwoDigitRepresentation(now.Minute()),
			makeTwoDigitRepresentation(now.Second()),
			filepath.Ext(fileHeader.Filename),
		))
		if err != nil {
			return err
		}
		defer dst.Close()

		_, err = io.Copy(dst, file)
		if err != nil {
			return err
		}
		time.Sleep(1 * time.Second)
	}
	return nil
}

func DeleteImage(fileName string) error {
	if err := os.Remove(fmt.Sprintf("./images/%v", fileName)); err != nil {
		return fmt.Errorf("no such file or directory")
	}
	return nil
}

func DeleteImages(plantId string) error {
	files, err := filepath.Glob(fmt.Sprintf("./images/%s*", plantId))
	if err != nil {
		return err
	}
	for _, f := range files {
		if err := os.Remove(f); err != nil {
			return err
		}
	}
	return nil
}

func GetImage(fileName string) ([]byte, error) {
	files, err := filepath.Glob(fmt.Sprintf("./images/%s*", fileName))
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

func StoreFertilizerImage(fileName string, file multipart.File, fileHeader multipart.FileHeader) error {
	defer file.Close()
	// Create the uploads folder if it doesn't exist
	err := os.MkdirAll("./images/fertilizer", os.ModePerm)
	if err != nil {
		return err
	}
	imageName := fmt.Sprintf("%s%s",
		fileName,
		filepath.Ext(fileHeader.Filename),
	)
	// Create a new file in the uploads directory
	dst, err := os.Create(fmt.Sprintf("./images/fertilizer/%s", imageName))
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

func GetFertilizerImage(fileName string) ([]byte, error) {
	files, err := filepath.Glob(fmt.Sprintf("./images/fertilizer/%s*", fileName))
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

func DeleteFertilizerImage(fertilizerId string) error {
	files, _ := filepath.Glob(fmt.Sprintf("./images/fertilizer/%s*", fertilizerId))
	for _, file := range files {
		if err := os.Remove(file); err != nil {
			return err
		}
	}
	return nil
}
