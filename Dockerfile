FROM quay.io/afx-abu/abu-bot
RUN git clone https://github.com/Afx-Abu/Abu-MD.git /root/Jsl/
WORKDIR /root/Jsl/
RUN npm install 
RUN npm start 
