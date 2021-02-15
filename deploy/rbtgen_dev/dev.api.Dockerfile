FROM ruby:2.7.2

# cpy code
WORKDIR /var/src
COPY . /var/src/

# Environement
ENV RAILS_ENV=development

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y yarn
RUN yarn install

# install gems
RUN bundle install

CMD rm ./tmp/pids/server.pid; bundle exec rake db:migrate; bundle exec rails s -b 0.0.0.0
