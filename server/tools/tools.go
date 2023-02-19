package tools

import "fmt"

func MakeTwoDigitRepresentation(num int) string {
	if num < 0 {
		num = -num
	}
	if num < 10 {
		return fmt.Sprintf("0%v", num)
	} else {
		return fmt.Sprintf("%v", num)
	}
}
