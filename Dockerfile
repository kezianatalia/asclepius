FROM node:20.13.1
WORKDIR /app
ENV PORT 3000
COPY . .
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start"]
MODEL_URL=https://storage.googleapis.com/submissionmlgc-kezia/submissions-model/model.json