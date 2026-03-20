package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	address := ":8080"

	http.Handle("/assets/js/", http.StripPrefix("/assets/js/", http.FileServer(http.Dir("./assets/js"))))
	http.Handle("/", http.FileServer(http.Dir("./templates")))

	fmt.Printf("Server listening on : %s\n", address)
	if err := http.ListenAndServe(address, nil); err != nil {
		log.Fatal(err)
	}
}
