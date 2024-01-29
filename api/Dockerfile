# Use the official maven/Java 8 image to create a build artifact.
# This is based on Debian and sets the working directory to /app
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Copy the pom.xml file to download dependencies
COPY ./pom.xml /usr/src/app/

# Download the dependencies
RUN mvn -f /usr/src/app/pom.xml dependency:go-offline -B

# Copy the rest of the source code
COPY ./src /usr/src/app/src

# Build the application
RUN mvn -f /usr/src/app/pom.xml -Dmaven.test.skip=true clean package

# Use OpenJDK to run the build artifact
FROM openjdk:21-jdk-slim

# Copy the jar file built in the first stage
COPY --from=build /usr/src/app/target/*.jar /usr/app/app.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Set the startup command
ENTRYPOINT ["java","-jar","/usr/app/app.jar"]
