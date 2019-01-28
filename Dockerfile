FROM 172.17.32.114:1180/library/angular-cli:1.7.4

COPY ./ /root/app
CMD ["sh", "/root/app/docker_web_run.sh"]
