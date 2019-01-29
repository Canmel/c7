FROM 172.17.32.114:1180/library/angular-cli:latest

COPY ./ /root/app
CMD ["sh", "/root/app/docker_web_run.sh"]
