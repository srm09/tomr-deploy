FROM node:7.5

RUN mkdir /src
ADD ./src/package.json /src/package.json
RUN cd /src && npm install

ADD ./src /src

EXPOSE 8080

WORKDIR /src
CMD ["node", "server.js"]

HEALTHCHECK --interval=1s --retries=5 \
    CMD curl -f http://localhost:8080/ || exit 1
