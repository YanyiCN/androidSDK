::定义最终目录
set FINAL_ROOT=D:\work\git\qp_game\assets\script\proto

::生成.js
call pbjs -t static-module -w commonjs -o proto.js *.proto --keep-case -dependency 
::生成.ts
call pbts -o proto.d.ts proto.js

::拷贝到工作目录
copy proto.d.ts %FINAL_ROOT%
copy proto.js %FINAL_ROOT%
::删除本地临时文件
del proto.d.ts
del proto.js


echo SUCCESS!!!!
pause