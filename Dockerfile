FROM txt0627/gradle-angular-cli:latest

COPY ./ /usr/src
CMD ["sh", "/usr/src/docker_web_run.sh"]
