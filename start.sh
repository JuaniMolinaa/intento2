#!/bin/bash

# -------------------------------
# Script to start the Ensolvers app
# -------------------------------
# Requirements:
# - Have installed: Node.js, npm, Java 17+, Maven or ./mvnw, and MySQL
# - Have MySQL running locally on port 3306

# Starting Settings
DB_NAME="demo"
DB_USER="root"
DB_PASS="root"

BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

# -------------------------------
# Console colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN} Starting setup Ensolvers...${NC}"

# -------------------------------
# 1. Create DB if no exists
echo -e "${GREEN}🛠 Verificando base de datos MySQL...${NC}"
mysql -u$DB_USER -p$DB_PASS -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
  echo -e "${GREEN}DB '$DB_NAME' verified / created.${NC}"
else
  echo -e "${RED} Error creating/verifying DB. Review your credentials and make sure MySQL is running.${NC}"
  exit 1
fi

# -------------------------------
# 2. Starting backend (Spring Boot)
echo -e "${GREEN}🔧 Starting backend...${NC}"
cd $BACKEND_DIR || { echo -e "${RED}Folder not found '$BACKEND_DIR'.${NC}"; exit 1; }

# Use wrapper Maven if exists or else mvn
if [ -f "./mvnw" ]; then
  ./mvnw spring-boot:run &
else
  mvn spring-boot:run &
fi

BACKEND_PID=$!
cd ..

# -------------------------------
# 3. Starting frontend (Vite + React)
echo -e "${GREEN}🎨 Starting frontend...${NC}"
cd $FRONTEND_DIR || { echo -e "${RED}Folder not found '$FRONTEND_DIR'.${NC}"; exit 1; }

# Installing dependencies
npm install

# Run development server
npm run dev &
FRONTEND_PID=$!
cd ..

# -------------------------------
# 4. Final message
echo -e "${GREEN}Application running!${NC}"
echo -e "🔗 Backend: http://localhost:8080"
echo -e "🔗 Frontend: http://localhost:5173"
echo -e "${GREEN}To stop everything, use: kill $BACKEND_PID $FRONTEND_PID${NC}"
