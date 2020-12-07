FROM debian:10

# cpy code
WORKDIR /var/src
COPY . /var/src/

# install packages
RUN apt update
RUN apt -y install curl gnupg2

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y yarn
RUN yarn install

CMD yarn serve