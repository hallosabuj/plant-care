package plant

import (
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"

	"github.com/hallosabuj/plant-care/server/tools"
)

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
		tools.MakeTwoDigitRepresentation(int(now.Month())),
		tools.MakeTwoDigitRepresentation(now.Day()),
		tools.MakeTwoDigitRepresentation(now.Hour()),
		tools.MakeTwoDigitRepresentation(now.Minute()),
		tools.MakeTwoDigitRepresentation(now.Second()),
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
			tools.MakeTwoDigitRepresentation(int(now.Month())),
			tools.MakeTwoDigitRepresentation(now.Day()),
			tools.MakeTwoDigitRepresentation(now.Hour()),
			tools.MakeTwoDigitRepresentation(now.Minute()),
			tools.MakeTwoDigitRepresentation(now.Second()+i),
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
