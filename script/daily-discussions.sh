#!/bin/bash

# Path to the config directory
config_dir="./config"

# Get the current date
current_date=$(date +%Y-%m-%d)

# Iterate through files in the config directory
for file in "$config_dir"/*; do
    # Get the discussions array from the json
    discussions=$(jq -r '.discussions[]' "$file")
    # Get the discussion
    discussion_date=$(jq -r '.date' "$file")
    # if the discussion date is the current date, then post a discussion
    echo "Discussion Date: $discussion_date"
    if [ "$discussion_date" == "$current_date" ]; then
    echo ":tada:"
        # Get the discussion title
        discussion_title=$(jq -r '.discussions[].title' "$file")
        # Get the discussion body
        discussion_description=$(jq -r '.discussions[].description' "$file")
        # Post the discussion
        echo "Title: $discussion_title"
        echo "Body: $discussion_description"
    fi

    
done
