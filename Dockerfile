FROM node:10.16.0

WORKDIR /usr/src/blog

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]