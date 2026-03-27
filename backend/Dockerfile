# Stage 1: Build the JAR with Maven
FROM maven:3.8.6-eclipse-temurin-17 AS builder
WORKDIR /app
# Copy only the POM first (for dependency caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B
# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the JAR
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]