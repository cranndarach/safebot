FROM node:argon

RUN mkdir /usr/src/safebot
WORKDIR /usr/src/safebot

COPY package.json /usr/src/safebot/
RUN npm install

COPY . /usr/src/safebot/

# Double check this
EXPOSE 8080
CMD ["npm", "start"]