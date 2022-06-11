# syntax=docker/dockerfile:1
FROM node:14.17.3

ENV NODE_ENV=production

ENV PORT=4000
ENV DB_URL=mongodb+srv://admin:12345@cluster0.srgfi.mongodb.net/?retryWrites=true&w=majority
ENV CLOUDINARY_NAME=dwbxsargv
ENV CLOUDINARY_API_KEY=942999597265633
ENV CLOUDINARY_API_SECRET=ulUYEdmnRAGahCjcY27E_yykz30
ENV JWT_SECRET=thisismyjwtuniquesecret
ENV JWT_EXPIRY=2d

WORKDIR /app

COPY ./* /app/

RUN npm install --production

COPY . .

CMD ["npm", "start"]
