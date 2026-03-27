package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"sort"
)

func main() {
	// Use the relative path from where you are running the command
	filePath := `D:\downDOCS\Documents\my_programms\web\NextJS\meinDeutsch\web_app\src\data\verbs.json`

	// 1. Read the file
	fileData, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}

	// 2. Unmarshal into a Slice (since your JSON is now an array)
	var rawList []map[string]interface{}
	if err := json.Unmarshal(fileData, &rawList); err != nil {
		log.Fatalf("Error unmarshaling JSON: %v", err)
	}

	// 3. Remove Duplicates using a Map
	// We use the "germanWord" as a unique key
	uniqueVerbs := make(map[string]map[string]interface{})
	for _, verb := range rawList {
		if word, ok := verb["germanWord"].(string); ok {
			uniqueVerbs[word] = verb
		}
	}

	// 4. Convert back to a Slice
	var sortedList []map[string]interface{}
	for _, verb := range uniqueVerbs {
		sortedList = append(sortedList, verb)
	}

	// 5. Sort the Slice alphabetically by "germanWord"
	sort.Slice(sortedList, func(i, j int) bool {
		valI := sortedList[i]["germanWord"].(string)
		valJ := sortedList[j]["germanWord"].(string)
		return valI < valJ
	})

	// 6. Marshal back to Array format with indentation
	finalJson, err := json.MarshalIndent(sortedList, "", "  ")
	if err != nil {
		log.Fatalf("Error marshaling: %v", err)
	}

	// 7. Write back to file
	err = os.WriteFile(filePath, finalJson, 0644)
	if err != nil {
		log.Fatalf("Error writing file: %v", err)
	}

	fmt.Printf("Success! Processed %d unique verbs into a sorted array.\n", len(sortedList))
}
