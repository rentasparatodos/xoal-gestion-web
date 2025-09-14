
# Blueprint: Xoal Gestión SL Website

## Visión General

El objetivo es construir un sitio web corporativo para Xoal Gestión SL, posicionándolo como el **proveedor líder de servicios complementarios para la vivienda**. El sitio web debe comunicar claramente su propuesta de valor: eliminar las complicaciones y el estrés que surgen **después de la compraventa o el alquiler de una propiedad**. Xoal no es un intermediario inmobiliario, sino el partner estratégico que se encarga de todos los detalles para que el cliente final y la inmobiliaria (como **Xanadú by Jesús Heredia**) tengan una experiencia perfecta.

## Diseño y Estilo

*   **Logotipo**: Se utiliza el logo oficial "Logo Cartel Xoal.png" en el encabezado, con un tamaño prominente (60px de alto) para reforzar la identidad de marca.
*   **Paleta de Colores**: Profesional (gris oscuro, blanco, acento azul/teal) que inspira confianza.
*   **Tipografía**: Combinación de tipografías modernas: **Poppins** para encabezados y **Lato** para el cuerpo de texto, mejorando la estética y la legibilidad.
*   **Estética "Bold"**: Uso de sombras, texturas sutiles y efectos de interactividad para una apariencia premium.

## Arquitectura y Características

1.  **Página de Inicio (Single Page Application)**:
    *   **Encabezado (`<main-header>`)**: Fijo, con logotipo y navegación a las secciones clave.
    *   **Sección Hero**: Titular de impacto enfocado en la tranquilidad del cliente.
    *   **Sección de Servicios**: Parrilla con 8 tarjetas de servicio.
    *   **Sección "Sobre Nosotros"**: Explica el rol de Xoal como complemento estratégico para las inmobiliarias con un texto persuasivo y un diseño espacioso.
    *   **Sección de Contacto**: Formulario conectado a Firebase.
    *   **Pie de Página**: Enlaces a redes sociales y copyright.

2.  **Configuración y Seguridad**:
    *   **Claves Seguras**: Las claves de Firebase se almacenan en un archivo `config.js` que no se incluye en el control de versiones (`.gitignore`).
    *   **Inicialización Modular (ESM)**: La conexión con Firebase se gestiona importando los módulos de Firebase directamente en `main.js`.

## Plan de Implementación

*   **[X] Fase 1-5: Desarrollo Inicial y Refinamiento (Finalizadas)**
*   **[X] Fase 6: Refactorización de Seguridad (Finalizada)**
*   **[X] Fase 7: Expansión y Corrección Técnica (Finalizada)**
*   **[X] Fase 8: Refinamiento de Identidad Visual (Finalizada)**
*   **[X] Fase 9: Mejora de Contenido y Legibilidad (Finalizada)**
    *   [X] Reemplazar la tipografía `Montserrat` por la combinación `Poppins` y `Lato`.
    *   [X] Aumentar el espaciado y mejorar el diseño de la sección "Sobre Nosotros".
    *   [X] Reescribir el texto de la sección para un mensaje más claro y persuasivo.
    *   [X] Actualizar el `blueprint.md` para reflejar todos los cambios.
