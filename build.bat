@echo off
::git
SET PATH=%PATH%;C:\Program Files\SmartGit\git\bin
::切换分支到master

cd D:\work\git\qp_client_update
git checkout master
git pull

::删除
rd /s/q D:\work\git\qp_client_update\web-mobile

::复制
xcopy  D:\work\git\qp_game\build\web-mobile D:\work\git\qp_client_update\web-mobile /e /y

::删除
rd /s/q D:\work\git\qp_game\build\web-mobile

::提交GIT
SET CMTXT="版本更新"
SET "CMTXT=%CMTXT%%VER%"

cd D:\work\git\qp_client_update
git add -A
git commit -a -m "%CMTXT%"
git push


::触发构建
start http://jenkins.3ddww.com:9999/job/ddz_Update/build?token=123456

pause