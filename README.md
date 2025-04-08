# CapsulasCba - Plataforma de Microaprendizaje Colaborativo

## Descripción del Proyecto

CapsulasCba es una plataforma de microaprendizaje colaborativo que permite a estudiantes crear y compartir pequeñas lecciones o "cápsulas" de conocimiento sobre diversos temas. La plataforma conecta estudiantes con recursos educativos personalizados y fomenta la creación y compartición de conocimiento entre pares, aprovechando la inteligencia colectiva de la comunidad estudiantil.


## Arquitectura de Alto Nivel

```mermaid
graph TD
    subgraph "Frontend (React)"
        UI[Interfaz de Usuario]
        Auth[Autenticación]
        Editor[Editor de Cápsulas]
        Search[Búsqueda y Navegación]
        Collab[Herramientas Colaborativas]
        Notif[Notificaciones]
    end

    subgraph "Backend (Java/Spring)"
        API[API REST]
        Auth_Service[Servicio de Autenticación]
        User_Service[Servicio de Usuarios]
        Content_Service[Servicio de Contenidos]
        Collab_Service[Servicio de Colaboración]
        Recommend_Service[Servicio de Recomendaciones]
        Moderation_Service[Servicio de Moderación]
        Gamification_Service[Servicio de Gamificación]
    end

    subgraph "Mensajería (AWS SQS)"
        SQS[Colas SQS]
    end

    subgraph "Base de Datos"
        UserDB[(Base de Datos de Usuarios)]
        ContentDB[(Base de Datos de Contenidos)]
        AnalyticsDB[(Base de Datos Analítica)]
    end

    subgraph "Almacenamiento"
        S3[Almacenamiento de Archivos]
    end

    UI --> API
    Auth --> Auth_Service
    Editor --> Content_Service
    Search --> Content_Service
    Collab --> Collab_Service
    Notif --> SQS

    API --> SQS
    SQS --> Content_Service
    SQS --> Recommend_Service
    SQS --> Notif

    Auth_Service --> UserDB
    User_Service --> UserDB
    Content_Service --> ContentDB
    Content_Service --> S3
    Collab_Service --> ContentDB
    Recommend_Service --> ContentDB
    Recommend_Service --> AnalyticsDB
    Moderation_Service --> ContentDB
    Gamification_Service --> UserDB
    Gamification_Service --> AnalyticsDB
```

## Stack Tecnológico

### Frontend
- **Framework**: React.js
- **Gestión de Estado**: Redux con Redux Toolkit
- **Enrutamiento**: React Router
- **UI/UX**: Material-UI
- **Internacionalización**: 
  - i18next para gestión de traducciones
  - react-i18next para integración con React
  - Soporte para español (default) e inglés
  - Archivos de traducción en formato JSON
  - Cambio de idioma dinámico desde el header
- **Empaquetador**: Webpack
- **Testing**: Jest, React Testing Library

### Backend
- **Framework**: Spring Boot (Java)
- **Autenticación**: Spring Security, JWT
- **API**: RESTful con Spring MVC
- **Base de Datos**: PostgreSQL
- **ORM**: Hibernate/JPA
- **Mensajería**: AWS SQS
- **Almacenamiento**: AWS S3
- **Testing**: JUnit, Mockito

## Configuración del Proyecto

### Requisitos Previos
- Node.js (v18.x o superior)
- npm (v8.x o superior)
- Java Development Kit (JDK) 17 o superior
- Maven 3.8.x o superior
- PostgreSQL 13 o superior

### Configuración del Frontend

1. Navega al directorio del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```
   npm start
   ```

   La aplicación estará disponible en `http://localhost:3000`.

4. Para construir la aplicación para producción:
   ```
   npm run build
   ```

### Configuración del Backend

1. Navega al directorio del backend:
   ```
   cd backend
   ```

2. Compila el proyecto:
   ```
   mvn clean install
   ```

3. Ejecuta la aplicación:
   ```
   mvn spring-boot:run
   ```

   El servidor estará disponible en `http://localhost:8080`.

## Estructura Detallada del Proyecto

```
capsulascba/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── common/
│   │   │       ├── CustomSnackbar.jsx    # Componente de notificaciones
│   │   │       ├── Footer.jsx            # Pie de página común
│   │   │       ├── Header.jsx            # Encabezado con navegación y cambio de idioma
│   │   │       ├── ProtectedRoute.jsx    # Componente para rutas protegidas
│   │   │       └── Sidebar.jsx           # Barra lateral de navegación
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx           # Layout para páginas de autenticación
│   │   │   └── MainLayout.jsx           # Layout principal de la aplicación
│   │   ├── locales/                     # Archivos de internacionalización
│   │   │   ├── en.json                  # Traducciones en inglés
│   │   │   └── es.json                  # Traducciones en español
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── ForgotPasswordPage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   └── ResetPasswordPage.jsx
│   │   │   ├── ContentEditorPage.jsx
│   │   │   ├── ContentPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── SearchPage.jsx
│   │   ├── services/                    # Servicios para llamadas API
│   │   ├── store/                       # Gestión de estado con Redux
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js        # Estado de autenticación
│   │   │   │   ├── contentSlice.js      # Estado de contenido
│   │   │   │   └── uiSlice.js          # Estado de la interfaz
│   │   │   └── index.js                # Configuración de Redux
│   │   ├── utils/
│   │   │   └── i18n.js                 # Configuración de internacionalización
│   │   ├── App.jsx                     # Componente principal
│   │   └── index.js                    # Punto de entrada
│   ├── package.json
│   └── webpack.config.js
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/capsulascba/api/
│   │   │   │   ├── config/
│   │   │   │   │   ├── AwsConfig.java     # Configuración de AWS
│   │   │   │   │   └── SecurityConfig.java # Configuración de seguridad
│   │   │   │   ├── controller/            # Controladores REST
│   │   │   │   ├── dto/                   # Objetos de transferencia de datos
│   │   │   │   ├── exception/             # Manejo de excepciones
│   │   │   │   ├── model/
│   │   │   │   │   ├── Comment.java       # Modelo de comentarios
│   │   │   │   │   ├── Content.java       # Modelo de contenido
│   │   │   │   │   ├── ContentResource.java
│   │   │   │   │   ├── ContentVersion.java
│   │   │   │   │   └── User.java         # Modelo de usuario
│   │   │   │   ├── repository/           # Repositorios JPA
│   │   │   │   ├── security/             # Configuración de seguridad
│   │   │   │   ├── service/              # Servicios de negocio
│   │   │   │   ├── util/                 # Utilidades
│   │   │   │   └── CapsulasCbaApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties # Configuración de la aplicación
│   │   └── test/
│   │       ├── java/
│   │       └── resources/
│   └── pom.xml
└── README.md
```

## Control de Versiones

### Archivos Ignorados (.gitignore)

El proyecto incluye un archivo `.gitignore` configurado para excluir:

- **Dependencias y construcción**:
  - `node_modules/` y archivos npm
  - Directorios `build/` y `dist/`
  - Archivos de Maven `target/`

- **Configuración sensible**:
  - Archivos `.env` y variables de entorno
  - Configuraciones de AWS
  - Propiedades de Spring Boot específicas del entorno

- **Archivos del sistema y IDE**:
  - Archivos `.DS_Store` (macOS)
  - Configuraciones de VSCode, IntelliJ IDEA y Eclipse
  - Archivos de workspace y caché

- **Logs y caché**:
  - Archivos de registro
  - Caché de npm y Gradle
  - Archivos de depuración

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE.md](LICENSE.md) para más detalles.
