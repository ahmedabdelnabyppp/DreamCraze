
FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY target/discountapp-0.0.1-SNAPSHOT.jar discountapp.jar
EXPOSE 8086
ENTRYPOINT ["java", "-jar", "discountapp.jar"]


