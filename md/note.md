1. 当git tag被创建并提交后则会启动 pipelines 执行 deploy:prod指令
2. 如需要自定义config文件路径请修改 ./node_modules/.bin/ac deploy:prod --config xx