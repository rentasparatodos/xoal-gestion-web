# Resumen del Proyecto: Landing Page Xoal Gestión

Este documento detalla el proceso completo de desarrollo de la landing page para Xoal Gestión, desde la concepción inicial hasta el despliegue final y la configuración de funcionalidades clave.

## Objetivo del Proyecto

Crear una landing page moderna, profesional y responsive para Xoal Gestión que presente sus servicios, genere confianza y capture leads a través de un formulario de contacto funcional.

## Tecnologías Utilizadas

*   **Frontend:** HTML5, CSS3, JavaScript (ES Modules).
*   **Componentes:** Web Components nativos para encapsular y reutilizar código (Header, Tarjetas de Servicio).
*   **Backend:** Firebase (Cloud Functions, Firestore, Hosting).
*   **Lenguaje de Backend:** Node.js con TypeScript.
*   **Librerías/APIs:** Nodemailer para el envío de correos, Firebase SDK.
*   **Entorno:** Firebase Studio (IDE basado en Code OSS).

## Fases del Desarrollo

### Fase 1: Estructura y Diseño Visual

1.  **Maquetación (HTML - `index.html`):**
    *   Se creó la estructura semántica de la página con secciones claras: un héroe principal, servicios, sobre nosotros y contacto.
    *   Se utilizaron etiquetas personalizadas (`<main-header>`, `<service-card>`) para implementar Web Components, logrando un HTML más limpio y modular.

2.  **Estilos (CSS - `style.css`):**
    *   Se implementó un diseño visual moderno y profesional utilizando `@layer` para organizar el código (reset, global, componentes, utilidades).
    *   Se usaron features modernas de CSS como `oklch` para colores, variables CSS (`--var`) para theming, y `clamp()` para tipografía fluida.
    *   Se añadieron animaciones sutiles (`.animated-item`) que se activan con el scroll para una experiencia de usuario más dinámica, implementadas con `IntersectionObserver` en JavaScript.
    *   Se aseguró que el diseño fuera completamente **responsive**, adaptándose a dispositivos móviles y de escritorio mediante `media queries` y un layout flexible (grid).

### Fase 2: Componentes Dinámicos y JavaScript

1.  **Web Components (`main.js`):**
    *   **`<main-header>`:** Se creó un encabezado fijo y estilizado que incluye la navegación principal. Se añadió lógica JavaScript para el *smooth scroll* a las diferentes secciones de la página.
    *   **`<service-card>`:** Se desarrollaron tarjetas reutilizables para mostrar cada uno de los servicios ofrecidos, con un diseño atractivo y efectos `:hover`.

2.  **Interactividad (`main.js`):**
    *   Se implementó la lógica para las animaciones de entrada de elementos al hacer scroll, mejorando la presentación visual del contenido.

### Fase 3: Backend y Lógica de Negocio

1.  **Configuración de Firebase Functions (`functions/src/index.ts`):**
    *   Se inicializó un entorno de Node.js con TypeScript para crear la lógica del servidor.
    *   Se escribió y desplegó una **Cloud Function (`sendEmail`)** que se activa mediante una petición HTTP.

2.  **Sistema de Notificación por Correo:**
    *   Se integró **Nodemailer** en la Cloud Function para enviar dos correos electrónicos tras el envío del formulario:
        1.  Un correo de notificación al equipo de Xoal Gestión con los datos del cliente.
        2.  Un correo de confirmación automático al usuario que rellenó el formulario.
    *   Se configuraron de forma segura las credenciales del correo utilizando variables de entorno de Firebase.

### Fase 4: Integración del Formulario y la Base de Datos

1.  **Conexión Frontend-Backend (`main.js`):**
    *   Se añadió un `event listener` al formulario de contacto.
    *   Al enviarse, el formulario realiza una llamada `fetch` (petición POST) a la URL de la Cloud Function `sendEmail`, enviando los datos del formulario (nombre, email, mensaje) en formato JSON.

2.  **Persistencia en Firestore (`main.js`):**
    *   Se integró el SDK de Firestore para que cada envío del formulario se guarde como un nuevo documento en la colección `contact-form`. Esto proporciona un registro de todos los leads generados.
    *   Se añadió el `serverTimestamp` para registrar la fecha y hora exactas de cada envío.

3.  **Manejo de Estado del Formulario:**
    *   Se mejoró la experiencia de usuario del formulario:
        *   Se añadió un `div` (`#form-status`) para mostrar mensajes de estado.
        *   Se deshabilitó el botón "Enviar" durante el proceso para evitar envíos duplicados.
        *   Se mostraron mensajes claros y estilizados de "Éxito" (verde) o "Error" (rojo) al usuario, reemplazando los `alert` nativos.

### Fase 5: Despliegue, Seguridad y Refinamiento

1.  **Configuración del Despliegue (`firebase.json`):**
    *   Se configuró el archivo para gestionar el despliegue de **Hosting**, **Functions** y **Firestore**.
    *   Se definió el directorio público y las reglas de reescritura para una aplicación de página única (SPA).

2.  **Reglas de Seguridad de Firestore (`firestore.rules`):**
    *   Se solucionó el error de "permiso denegado" al escribir en la base de datos.
    *   Se crearon y desplegaron reglas de seguridad que **permiten la creación (`create`) de documentos** en la colección `contact-form` por parte de cualquier usuario, pero **deniegan la lectura, actualización o eliminación (`read`, `update`, `delete`)**. Esto protege la privacidad de los datos.

3.  **Despliegue en Firebase Hosting:**
    *   Se desplegó el sitio web completo, haciéndolo accesible públicamente a través de la URL de Firebase Hosting.
    *   Se realizaron despliegues incrementales para actualizar funcionalidades y corregir errores (como el despliegue del logo y las reglas de seguridad).

4.  **Ajustes Finales:**
    *   Se reemplazó la imagen genérica de la sección "Sobre Nosotros" por el **logo oficial de la empresa** (`Logo 1 Dossier Fondo Blanco Xoal.png`), consolidando la identidad de marca.
    *   Se corrigió el problema de caché del navegador indicando al usuario cómo realizar una recarga forzada (`Ctrl+F5` o `Cmd+Shift+R`).

## Conclusión

El proyecto ha culminado con éxito en la creación de una plataforma web robusta, segura y estéticamente agradable. La arquitectura modular con Web Components y la potente infraestructura de backend de Firebase garantizan que el sitio sea escalable y fácil de mantener en el futuro.
