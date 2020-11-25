FROM node:latest as build
WORKDIR /app
COPY /admin-front ./
RUN npm install
EXPOSE 8000
CMD ["npm", "run", "start"]

