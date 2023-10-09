FROM node:lts-alpine
RUN apk add --no-cache --virtual=build-dependencies build-base git python3-dev && \
    apk add --no-cache yarn
USER node
WORKDIR /var/opt/hardlounge-src
ENV THELOUNGE_HOME /var/opt/hardlounge
COPY . .
#RUN git clone https://git.supernets.org/supernets/hardlounge.git --depth 1 .
RUN yarn install && \
    NODE_ENV=production yarn build && \
    yarn link && \
    yarn --non-interactive cache clean && \
    ln -s /var/opt/hardlounge-src/index.js /var/opt/hardlounge-src/hardlounge
USER root
RUN apk del --purge build-dependencies
USER node
EXPOSE 9000
CMD ["/var/opt/hardlounge-src/hardlounge", "start"]