FROM quay.io/afx-abu/abu-bot

ADD https://api.github.com/repos/Afx-Abu/Abu-MD/git/refs/heads/main version.json
RUN git clone -b main https://github.com/Afx-Abu/Abu-MD /root/Abu
WORKDIR /root/Abu
ENV TZ=Asia/Kolkata
RUN yarn install --ignore-engines --network-concurrency 1
EXPOSE 3000
CMD ["node", "index.js"]
