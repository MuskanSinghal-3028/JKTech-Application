FROM node:22.14.0

WORKDIR /app
COPY . /app
COPY dist /app/dist

EXPOSE 5600
ENTRYPOINT npm run start:prod