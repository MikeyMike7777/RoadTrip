FROM node:12 AS build
WORKDIR /build
COPY package-lock.json .
COPY package.json .
COPY yarn.lock .
COPY . .

# RUN npm install uuid
RUN npm init -y
RUN yarn install
RUN yarn -version

FROM node:12
WORKDIR /app
COPY --from=build /build .

RUN chmod +x ./frontend-entrypoint

# Running the app
ENTRYPOINT ./frontend-entrypoint