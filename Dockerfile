FROM node:6.9.5

RUN useradd --user-group --create-home --shell /bin/false app && npm install --global npm@3.10.10
# mkdir /usr/src/safebot

ENV HOME=/home/app

COPY package.json main.js tokens.js $HOME/safebot/
# RUN touch $HOME/safebot/safebot-process.log
RUN chown -R app:app $HOME/safebot
RUN mkdir $HOME/safebot/logs
RUN touch $HOME/safebot/logs/safebot-process.log
RUN touch $HOME/safebot/logs/safebot.log

USER app
WORKDIR $HOME/safebot
RUN npm install
RUN npm cache clean
# RUN mkdir logs

# COPY . $HOME/app

# EXPOSE 8080
CMD ["nohup", "node", "main.js", ">", "$HOME/safebot/logs/safebot-process.log"]
