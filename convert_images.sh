#!/bin/bash

# Crear directorio para las imágenes convertidas si no existe
mkdir -p images/converted

# Convertir cada imagen HEIC a JPG y WebP
for file in images/*.HEIC; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .HEIC)
        echo "Converting $filename..."
        
        # Convertir a JPG
        magick convert "$file" "images/converted/${filename}.jpg"
        
        # Convertir a WebP
        magick convert "$file" "images/converted/${filename}.webp"
    fi
done

echo "Conversion complete!" 