FROM node

WORKDIR /frontend

# Install dependencies
COPY package.json .
RUN npm install

# Copy app source code
COPY . .

EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
