FROM node:latest
ENV TZ=Asia/Kolkata
RUN git clone https://github.com/Afx-Abu/Abu-MD/ /root/Abu/
WORKDIR /root/Abu/
RUN npm install
RUN npm start
