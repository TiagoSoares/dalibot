FROM node:10

RUN apt-get update -qq && apt-get install -y build-essential apt-utils

ENV APP_HOME /app/
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD package*.json $APP_HOME
RUN npm install

ADD . $APP_HOME

CMD ["node", "."  ]
