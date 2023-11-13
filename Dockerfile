FROM node:18-alpine

WORKDIR /usr/src/app

# Install curl(for debugging purpose) and pnpm
RUN apk update && apk add curl && npm install --global pnpm@8.8.0

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml .

# Note: devDependencies are fetched
RUN pnpm fetch

# Copy repository and install dependencies
ADD . ./
RUN pnpm install --offline

# Build
RUN pnpm build

# Run container
EXPOSE 80
ENV PORT 80
CMD ["pnpm", "prod"]
