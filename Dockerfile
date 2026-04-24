FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p /app/data/meta/jobs

ENV NODE_ENV=production
ENV PORT=3005
ENV META_PUBLIC_PORT=3015

EXPOSE 3005 3015

CMD ["npm", "start"]
