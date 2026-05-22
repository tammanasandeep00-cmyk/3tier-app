FROM node:18

WORKDIR /app

# copy package files first
COPY package*.json ./

RUN npm install

# copy full source code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
