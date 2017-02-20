FROM node:7.5

RUN mkdir /tmp/code
COPY ./src /tmp/code

EXPOSE 8080

WORKDIR /tmp/code
CMD ["npm", "start"]

HEALTHCHECK --interval=1s --retries=5 \
    CMD curl -f http://localhost:8080/ || exit 1
