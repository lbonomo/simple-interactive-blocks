#!/bin/bash

# Verificar que wp-cli esté instalado
if ! command -v wp &> /dev/null; then
    echo "Error: wp-cli no está instalado. Por favor, instálalo antes de ejecutar este script."
    exit 1
fi

# Títulos y temas relacionados con WooCommerce, temas y plugins
TOPICS=(
    "Cómo personalizar plantillas en WooCommerce"
    "Mejores prácticas para desarrollar plugins en WordPress"
    "Introducción al desarrollo de temas para WordPress"
    "Cómo crear un shortcode personalizado para WooCommerce"
    "Personalización del carrito de WooCommerce"
    "Optimización de rendimiento en plugins de WordPress"
    "Cómo añadir funciones avanzadas en tu tema WordPress"
    "Integración de API REST en WooCommerce"
    "Guía para crear temas hijo en WordPress"
    "Cómo depurar errores en WordPress"
    "Creación de widgets personalizados en WordPress"
    "Automatización de tareas con WP-CLI"
    "Cómo extender WooCommerce con acciones y filtros"
    "Diseño responsivo en temas WordPress"
    "Cómo utilizar hooks en el desarrollo de plugins"
    "Creación de roles y permisos personalizados en WordPress"
    "Añadir campos personalizados a productos en WooCommerce"
    "Mejorando la seguridad en plugins de WordPress"
    "Cómo integrar pasarelas de pago personalizadas en WooCommerce"
    "Optimización SEO para temas de WordPress"
    "Introducción a Gutenberg para desarrolladores de temas"
    "Cómo programar descuentos personalizados en WooCommerce"
    "Creación de bloques personalizados para Gutenberg"
    "Integración de servicios externos en WooCommerce"
    "Cómo migrar un sitio WooCommerce sin interrupciones"
    "Automatización de tareas con hooks de WordPress"
    "Cómo crear un sistema de reservas en WooCommerce"
    "Personalización de correos electrónicos en WooCommerce"
    "Introducción a la programación orientada a objetos en plugins"
    "Cómo usar WP_Query para consultas avanzadas"
    "Creación de páginas personalizadas para WooCommerce"
    "Cómo optimizar la base de datos en WordPress"
    "Desarrollo de plantillas avanzadas con Twig en WordPress"
    "Cómo trabajar con Custom Post Types en WordPress"
    "Integración de Google Analytics en WooCommerce"
    "Cómo gestionar dependencias en plugins con Composer"
    "Cómo diseñar páginas de producto únicas en WooCommerce"
    "Mejorando la experiencia de usuario con AJAX en WordPress"
    "Cómo gestionar actualizaciones en plugins personalizados"
    "Configuración avanzada de WordPress Multisite"
    "Cómo personalizar el checkout de WooCommerce"
    "Mejores prácticas para usar Git en proyectos de WordPress"
    "Cómo implementar notificaciones push en WordPress"
    "Uso de ACF (Advanced Custom Fields) en temas personalizados"
    "Creación de formularios personalizados en WooCommerce"
    "Cómo optimizar imágenes para sitios WooCommerce"
    "Integración de Stripe en WooCommerce"
    "Cómo programar tareas recurrentes con WP-Cron"
    "Cómo traducir tu tema o plugin de WordPress"
    "Análisis de rendimiento con Query Monitor en WordPress"
)

# Generar 50 publicaciones
for i in {1..50}; do
    # Elegir un tema aleatorio
    TITLE=${TOPICS[$RANDOM % ${#TOPICS[@]}]}

    # Generar el contenido del post
    CONTENT="<p><strong>${TITLE}</strong></p><p>${TITLE} es un tema esencial para desarrolladores y usuarios avanzados de WordPress. En este artículo exploramos cómo puedes sacar el máximo provecho de esta funcionalidad. Aprenderás los pasos básicos y avanzados para implementar esta característica de manera eficiente, optimizando el rendimiento de tu sitio y mejorando la experiencia del usuario.</p><p>Además, compartimos consejos prácticos y herramientas clave que te ayudarán a ahorrar tiempo y evitar errores comunes. Si estás interesado en aprender más sobre ${TITLE}, este post es para ti.</p>"

    # Crear el post usando wp-cli
    wp post create \
        --post_title="$TITLE" \
        --post_content="$CONTENT" \
        --post_status="publish" \
        --post_author=1

    echo "Post '$TITLE' creado con éxito."
done

echo "Se han creado 50 posts automáticamente."
