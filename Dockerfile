# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install PM2 globally
RUN npm install pm2 -g

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Run the app with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]