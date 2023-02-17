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

// /////////////////////////////////////////////
// Plant related image operations
// /////////////////////////////////////////////
func StorePlantImage(id string, fileSmall, fileMedium, fileLarge multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	defer fileSmall.Close()
	defer fileMedium.Close()
	defer fileLarge.Close()
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

	// Storing large image
	// Create a new file in the uploads directory
	dst, err := os.Create(fmt.Sprintf("./images/plant/large/%s", imageName))
	if err != nil {
		return "", err
	}
	defer dst.Close()

	// Copy the uploaded file to the filesystem at the specified destination
	_, err = io.Copy(dst, fileLarge)
	if err != nil {
		return "", err
	}

	// Storig medium image
	// Create a new file in the uploads directory
	dst, err = os.Create(fmt.Sprintf("./images/plant/medium/%s", imageName))
	if err != nil {
		return "", err
	}
	defer dst.Close()

	// Copy the uploaded file to the filesystem at the specified destination
	_, err = io.Copy(dst, fileMedium)
	if err != nil {
		return "", err
	}

	// Storig small image
	// Create a new file in the uploads directory
	dst, err = os.Create(fmt.Sprintf("./images/plant/small/%s", imageName))
	if err != nil {
		return "", err
	}
	defer dst.Close()

	// Copy the uploaded file to the filesystem at the specified destination
	_, err = io.Copy(dst, fileSmall)
	if err != nil {
		return "", err
	}

	return imageName, nil
}

func StorePlantImages(plantId string, filesSmall, filesMedium, filesLarge []*multipart.FileHeader, imageNames *[]string) error {
	for i := 0; i < len(filesSmall); i++ {
		now := time.Now()
		imageName := fmt.Sprintf("%s_%d%s%s_%s%s%s%s",
			plantId,
			now.Year(),
			makeTwoDigitRepresentation(int(now.Month())),
			makeTwoDigitRepresentation(now.Day()),
			makeTwoDigitRepresentation(now.Hour()),
			makeTwoDigitRepresentation(now.Minute()),
			makeTwoDigitRepresentation(now.Second()+i),
			filepath.Ext(filesSmall[0].Filename),
		)

		// Storing small image
		fileSmall, err := filesSmall[i].Open()
		if err != nil {
			return err
		}
		defer fileSmall.Close()
		dst, err := os.Create(fmt.Sprintf("./images/plant/small/%s", imageName))
		if err != nil {
			return err
		}
		defer dst.Close()

		_, err = io.Copy(dst, fileSmall)
		if err != nil {
			return err
		}

		// Storing medium image
		fileMedium, err := filesMedium[i].Open()
		if err != nil {
			return err
		}
		defer fileMedium.Close()
		dst, err = os.Create(fmt.Sprintf("./images/plant/medium/%s", imageName))
		if err != nil {
			return err
		}
		defer dst.Close()

		_, err = io.Copy(dst, fileMedium)
		if err != nil {
			return err
		}

		// Storing large image
		fileLarge, err := filesLarge[i].Open()
		if err != nil {
			return err
		}
		defer fileLarge.Close()
		dst, err = os.Create(fmt.Sprintf("./images/plant/large/%s", imageName))
		if err != nil {
			return err
		}
		defer dst.Close()

		_, err = io.Copy(dst, fileLarge)
		if err != nil {
			return err
		}

		*imageNames = append(*imageNames, imageName)
	}
	return nil
}

func DeletePlantImage(fileName string) error {
	if err := os.Remove(fmt.Sprintf("./images/plant/large/%v", fileName)); err != nil {
		return fmt.Errorf("no such file or directory")
	}
	if err := os.Remove(fmt.Sprintf("./images/plant/medium/%v", fileName)); err != nil {
		return fmt.Errorf("no such file or directory")
	}
	if err := os.Remove(fmt.Sprintf("./images/plant/small/%v", fileName)); err != nil {
		return fmt.Errorf("no such file or directory")
	}
	return nil
}

func DeletePlantImages(plantId string) error {
	// Deleting large images
	files, err := filepath.Glob(fmt.Sprintf("./images/plant/large/%s*", plantId))
	if err != nil {
		return err
	}
	for _, f := range files {
		if err := os.Remove(f); err != nil {
			return err
		}
	}

	// Deleting medium images
	files, err = filepath.Glob(fmt.Sprintf("./images/plant/medium/%s*", plantId))
	if err != nil {
		return err
	}
	for _, f := range files {
		if err := os.Remove(f); err != nil {
			return err
		}
	}

	// Deleting small images
	files, err = filepath.Glob(fmt.Sprintf("./images/plant/small/%s*", plantId))
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

func GetPlantImage(size, fileName string) ([]byte, error) {
	files, err := filepath.Glob(fmt.Sprintf("./images/plant/"+size+"/%s*", fileName))
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

// /////////////////////////////////////////////
// Fertilizer related image operations
// /////////////////////////////////////////////
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
