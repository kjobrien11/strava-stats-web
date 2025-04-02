FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json first for better caching
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose port 4200 for Angular
EXPOSE 4200

# Start Angular with --host 0.0.0.0 to allow external access
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
