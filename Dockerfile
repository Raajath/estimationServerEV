FROM node:alpine
ENV PORT 5000
WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["node", "index.js"]
