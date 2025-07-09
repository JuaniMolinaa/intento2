# Ensolvers Challenge - Note Taking Application

This is a full-stack note-taking application developed as part of the Ensolvers Challenge. It consists of a Spring Boot backend and a React (Vite) frontend.

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following software installed on your system:

* **Java Development Kit (JDK):** Required for the Spring Boot backend.
    * **Version:** [java version "1.8.0_111"]
* **Apache Maven:** Used for building and managing the Spring Boot backend dependencies.
    * **Version:** [Apache Maven 3.8.6]
* **MySQL Server:** The relational database used for storing notes.
    * **Version:** [mysql  Ver 8.0.29 for Win64 on x86_64]
* **Node.js:** Required for running the React frontend.
    * **Version:** `[v20.19.3]`
* **npm (Node Package Manager):** Comes with Node.js, used for frontend package management.
    * **Version:** `[8.18.0]`

### Database Setup

1.  **Create Database:**
    Open your MySQL client (e.g., MySQL Workbench or command line) and create a database for the application. 
	Or also execute the script ensolversjm.sql to create DB and add some note examples
    ```sql
    CREATE DATABASE IF NOT EXISTS ensolversJM;
    ```
2.  **Configure `application.properties`:**
    Navigate to `backend/src/main/resources/application.properties` and update the database connection details if necessary:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/ensolversJM?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
    spring.datasource.username=your_mysql_username
    spring.datasource.password=your_mysql_password
    spring.jpa.hibernate.ddl-auto=update # Or 'create' if you want to drop and recreate on startup (use with caution!)
    spring.jpa.show-sql=true
    ```
    **Note:** The `ddl-auto` setting will automatically create the tables if they don't exist. For production, `none` is often preferred after initial setup.

---

## Running the Application

### 1. Backend (Spring Boot)

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Build the project using Maven:
    ```bash
    mvn clean install
    ```
3.  Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```
    The backend API will typically run on `http://localhost:8080`.

### 2. Frontend (React with Vite)

1.  Open a **new terminal** and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or a similar port).

---

## Technologies Used

### Backend
* **Framework:** Spring Boot `[3.5.3]`
* **Persistence:** Spring Data JPA, Hibernate
* **Database:** MySQL Server
* **Build Tool:** Maven

### Frontend
* **Framework:** React `[18.2.0]`
* **Build Tool:** Vite `[5.0.0]`
* **Styling:** Bootstrap (via CDN or npm, specify if important)

---

## Key Features

* Create, Read, Update, Delete (CRUD) notes.
* Filter notes by active/archived state.
