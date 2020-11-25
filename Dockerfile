FROM node:latest as build
WORKDIR /app
COPY /admin-front ./
RUN npm install

FROM node:15.2.1-alpine3.10
COPY --from=build /app /app
WORKDIR /app
EXPOSE 8000
CMD ["npm", "run", "start"]

