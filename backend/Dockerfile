FROM node:16-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# The command will be overridden by docker-compose
CMD ["npm", "run", "start:dev"]
