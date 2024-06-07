# Etapa de compilación
FROM amazoncorretto:17.0.11-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para la compilación
COPY ./pom.xml /app
COPY ./.mvn /app/.mvn
COPY ./src /app/src

# Instalar Maven (si no está presente) y compilar el proyecto
RUN apk add --no-cache maven && \
    mvn clean package -DskipTests

# Etapa final
FROM amazoncorretto:17.0.11-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Crear directorio de logs
RUN mkdir ./logs

# Copiar el archivo JAR desde la etapa de compilación a la imagen final
COPY --from=builder /app/target/*.jar ./app.jar

# Exponer puerto 8000
EXPOSE 8000

# Comando a ejecutar al iniciar el contenedor
CMD ["java", "-jar", "app.jar"]