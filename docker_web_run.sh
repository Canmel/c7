#!/bin/bash
#文件的换行模式要选UNIX风格的LF,不然脚本执行会出错!

#如果读不到环境变量RUN_CONTEXT，默认设为dev
if [ -z $RUN_CONTEXT ]; then
    RUN_CONTEXT='dev'
    echo "export RUN_CONTEXT=${RUN_CONTEXT}" >> ${HOME}/.bashrc
fi

#使设置的环境变量即时生效
source ~/.bashrc

#开发环境
if [ "$RUN_CONTEXT" = "dev" ]; then
    pwd
    #设置ssh密码
#    echo "root:123456" | chpasswd
    #启动sshd
#    /usr/sbin/sshd
    #启动cron
#    /etc/init.d/cron start
    #执行rake任务
#    bundle exec rake db:migrate
    #开启rails定时任务
    #whenever -w
    #启动rails
    #echo `bundle exec rails s -b 0.0.0.0 -p 3000`
    #passenger start --environment development --port 3000
    echo pwd
    nohup npm run start &
    /bin/bash
#预发布环境
elif [ "$RUN_CONTEXT" = "pre_prod" ]; then
    echo "root:POloXM1980!@&" | chpasswd
    #设置ssh密码,密码为环境变量ROOT_PASSWD的值,如果环境变量ROOT_PASSWD没有设,则指定一个默认密码
    if [ $ROOT_PASSWD ]; then
        echo "root:$ROOT_PASSWD" | chpasswd
    fi
    #启动sshd
    /usr/sbin/sshd
    #启动rsyslog
    /etc/init.d/rsyslog start
    #启动cron
    /etc/init.d/cron start
    #执行db:migrate
    RAILS_ENV=pre_production bundle exec rake db:migrate
    #开启rails定时任务
    whenever -i --set environment=pre_production

    nohup /bin/bash -c "bundle exec sidekiq -e pre_production -C config/sidekiq.yml" &

    #启动rails
    passenger start --environment pre_production --port 80

#生产环境
elif [ "$RUN_CONTEXT" = "prod" ]; then
     echo "root:POloXM1980!@&" | chpasswd
    #设置ssh密码,密码为环境变量ROOT_PASSWD的值,如果环境变量ROOT_PASSWD没有设,则指定一个默认密码
    if [ $ROOT_PASSWD ]; then
        echo "root:$ROOT_PASSWD" | chpasswd
    fi
    #启动sshd
    /usr/sbin/sshd
    #启动rsyslog
    /etc/init.d/rsyslog start
    #启动cron
    /etc/init.d/cron start
    #执行db:migrate
    RAILS_ENV=production bundle exec rake db:migrate
    #启动rails
    echo `bundle exec rails s -b 0.0.0.0 -p 3001`
else
    echo "unknown RUN_CONTEXT:${RUN_CONTEXT}"
fi
