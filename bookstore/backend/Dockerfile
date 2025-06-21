# Use a lightweight OpenJDK runtime as the base image
FROM eclipse-temurin:17-jre-alpine

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the local build context to the container
COPY . .
RUN mvn clean install
COPY target/ .

# Expose the application's port (change if your app uses a different port)
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
