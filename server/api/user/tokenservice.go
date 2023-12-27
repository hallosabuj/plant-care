package user

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

type UserClaims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

var TOKEN_SECRET string = "mysecret"

func NewAccessToken(claims UserClaims) (string, error) {
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return accessToken.SignedString([]byte(TOKEN_SECRET))
}

func ParseAccessToken(accessToken string) *UserClaims {
	parsedAccessToken, _ := jwt.ParseWithClaims(accessToken, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(TOKEN_SECRET), nil
	})

	return parsedAccessToken.Claims.(*UserClaims)
}

func CreateJWT(email string) (string, error) {
	var token string
	// Creating claims
	userClaims := UserClaims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			IssuedAt:  time.Now().Unix(),
			ExpiresAt: time.Now().Add(time.Second * 15).Unix(),
		},
	}
	// Generating access token
	token, err := NewAccessToken(userClaims)
	if err != nil {
		return "", fmt.Errorf("error creating access token")
	}
	return token, nil
}

func VerifyJWT(token string) (string, error) {
	// Generating claims from access token
	userClaims := ParseAccessToken(token)
	if userClaims.Valid() != nil {
		return "", userClaims.Valid()
	}
	var newToken string
	newToken, _ = CreateJWT(userClaims.Email)
	return newToken, nil
}
