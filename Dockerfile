FROM node:lts-alpine
RUN apk add --no-cache --virtual=build-dependencies build-base git python3-dev
RUN apk add --no-cache yarn
USER node
WORKDIR /var/opt/thelounge-src
ENV THELOUNGE_HOME /var/opt/thelounge
RUN git clone https://git.supernets.org/supernets/thelounge.git .
RUN yarn install
RUN NODE_ENV=production yarn build
RUN yarn link
RUN yarn --non-interactive cache clean
RUN ln -s /var/opt/thelounge-src/index.js /var/opt/thelounge-src/thelounge
EXPOSE 9000
CMD ["/var/opt/thelounge-src/thelounge", "start"]