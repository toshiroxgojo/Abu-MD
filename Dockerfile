FROM quay.io/afx-abu/abu-md
RUN git clone https://github.com/Afx-Abu/Abu-MD.git
WORKDIR /root/Abu/
RUN npm install 
RUN npm start 
