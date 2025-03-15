#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

# Download hero image
curl -o images/hero.jpg "https://images.unsplash.com/photo-1603006905393-c279c4693d38?q=80&w=1920&auto=format&fit=crop"
echo "Downloaded hero.jpg"

# Download parallax image
curl -o images/parallax.jpg "https://images.unsplash.com/photo-1599
