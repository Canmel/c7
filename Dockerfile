FROM txt0627/gradle-angular-cli:latest

COPY ./ /usr/src
CMD ["sh", "/root/app/docker_web_run.sh"]
