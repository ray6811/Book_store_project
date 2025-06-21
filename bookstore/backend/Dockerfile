# ---- Build stage ----
FROM maven:3.9.7-eclipse-temurin-17 AS build

WORKDIR /app
COPY . .
RUN mvn clean install

# ---- Runtime stage ----
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
# Copy only the built jar from the build image
COPY --from=build /app/target/ .

EXPOSE 8000

ENTRYPOINT ["java", "-jar", "*.jar"]
