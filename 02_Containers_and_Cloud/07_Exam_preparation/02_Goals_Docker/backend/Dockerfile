FROM node

# Set the work dir
WORKDIR /backend

# Install Node.js dependencies
COPY package.json .
RUN npm install

# Copy the app source code
COPY . .

EXPOSE 80

# Run the backend
CMD ["npm", "start"]


