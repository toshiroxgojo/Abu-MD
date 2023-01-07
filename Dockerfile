FROM quay.io/afx-abu/abu-bot:latest
RUN git clone https://github.com/Afx-Abu/Abu-MD /root/Jsl/
WORKDIR /root/Jsl/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
