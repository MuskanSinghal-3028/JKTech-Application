FROM node:22.14.0

WORKDIR /app
COPY . /app
RUN npm run build
RUN npm cache clean --force
COPY dist /app/dist

EXPOSE 5600
ENTRYPOINT npm run start:prod