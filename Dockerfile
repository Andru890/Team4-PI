FROM amazoncorretto:17.0.11-alpine as builder

WORKDIR /app

COPY ./pom.xml /app
COPY ./.mvn ./.mvn
COPY ./mvnw .
COPY ./pom.xml .

RUN ./mvnw clean package -Dmaven.test.skip -Dmaven.main.skip -Dspring-boot.repackage.skip && rm -r ./target/

COPY ./src ./src

RUN ./mvnw clean package -DskipTests

FROM amazoncorretto:17.0.11-alpine

WORKDIR /app
RUN mkdir ./logs
COPY --from=builder /app/target/visual-studio-1.0.jar .
EXPOSE 8000

CMD ["java", "-jar", "visual-studio-1.0.jar"]