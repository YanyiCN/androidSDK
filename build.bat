@echo off
::git
SET PATH=%PATH%;C:\Program Files\SmartGit\git\bin
::�л���֧��master

cd D:\work\git\qp_client_update
git checkout master
git pull

::ɾ��
rd /s/q D:\work\git\qp_client_update\web-mobile

::����
xcopy  D:\work\git\qp_game\build\web-mobile D:\work\git\qp_client_update\web-mobile /e /y

::ɾ��
rd /s/q D:\work\git\qp_game\build\web-mobile

::�ύGIT
SET CMTXT="�汾����"
SET "CMTXT=%CMTXT%%VER%"

cd D:\work\git\qp_client_update
git add -A
git commit -a -m "%CMTXT%"
git push


::��������
start http://jenkins.3ddww.com:9999/job/ddz_Update/build?token=123456

pause