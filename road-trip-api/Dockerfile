FROM openjdk:17 AS build

# Possible to execute the mave bom build here? Would need to dowload maven...

WORKDIR /build

COPY . .
RUN ./gradlew build --no-daemon -p .

FROM openjdk:17
WORKDIR /app
COPY --from=build /build/build/libs/build-1.0-SNAPSHOT.jar app.jar

# Running the app
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
