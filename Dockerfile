FROM quay.io/afx-abu/abu-bot
/bin/sh -c git clone https://github.com/Afx-Abu/Abu-MD.git /root/Abu/'
WORKDIR /root/Abu/
RUN npm install 
RUN npm start 
