FROM node:22.2-alpine

# Create app directory
WORKDIR /app


COPY package.json pnpm-lock.yaml* .npmrc /app/


RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . /app


# Build the app
RUN pnpm run build


# Expose the port
EXPOSE 3001

# Start the app
CMD ["pnpm", "run", "start"]
