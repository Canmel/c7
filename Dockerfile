FROM 172.17.32.114:1180/library/angular-cli:1.7.4
COPY entrypoint.sh /
COPY ./ /root/app
