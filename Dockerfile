FROM 172.17.32.114:1180/library/angular-cli:7.2.1

COPY ./ /root/app
CMD ["sh", "/root/app/docker_web_run.sh"]
