#!/bin/bash

# Variables
NUM_POSTS=50
CATEGORIES=("woocommerce" "desarrollo-plugins" "desarrollo-temas") # Categorías predefinidas
TITLES_FILE="titulos.txt" # Archivo con títulos (uno por línea)
CONTENT_FILE="contenido_base.txt" # Archivo con contenido base (se usará aleatoriamente)

# Funciones

# Función para generar un título aleatorio del archivo
get_random_title() {
  local line_count=$(wc -l < "$TITLES_FILE")
  local random_line=$((RANDOM % line_count + 1))
  sed -n "${random_line}p" "$TITLES_FILE"
}

# Función para generar un extracto aleatorio del archivo
get_random_content() {
    local line_count=$(wc -l < "$CONTENT_FILE")
    local random_line=$((RANDOM % line_count + 1))
    sed -n "${random_line}p" "$CONTENT_FILE"
}
# Verifica si WP-CLI está instalado
if ! command -v wp &> /dev/null
then
    echo "WP-CLI no está instalado. Por favor, instálalo."
    exit 1
fi

# Crea los posts
for i in $(seq 1 $NUM_POSTS); do
  # Título aleatorio
  TITLE=$(get_random_title)

  # Categoría aleatoria
  CATEGORY="${CATEGORIES[$((RANDOM % ${#CATEGORIES[@]}))]}"

# Obtiene el ID de la categoría. Si no existe, la crea.
CATEGORY_ID=$(wp term list category --field=term_id --name="$CATEGORY")

if [ -z "$CATEGORY_ID" ]; then
    echo "Creando categoría '$CATEGORY'..."
    CATEGORY_ID=$(wp term create category "$CATEGORY" --porcelain) # --porcelain devuelve solo el ID
    if [ -z "$CATEGORY_ID" ]; then
        echo "Error al crear la categoría '$CATEGORY'."
        continue # Salta a la siguiente iteración del bucle
    fi
fi

# Contenido aleatorio
CONTENT=$(get_random_content)

  # Crea el post con WP-CLI

  wp post create --post_title="$TITLE" --post_content="$CONTENT" --post_category="$CATEGORY_ID" --post_status=publish
    if [[ $? -eq 0 ]]; then
        echo "Post '$TITLE' creado con éxito. Categoría: $CATEGORY"
    else
        echo "Error al crear el post '$TITLE'"
    fi
done

echo "Proceso completado."