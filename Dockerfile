FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
    