# Build stage
FROM node:24 AS build
WORKDIR /build
COPY . .
RUN npm install
ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0" , "--port", "8000"]
