# upload-dist
using axios to upload packed dist directory

### install
1. 进入项目文件夹
2. yarn add --dev upload-dist (npm install --save-dev upload-dist)

### sync <uploadUrl> [relativeDir] [--addConf [projectDomain]] [--gradlew [projectPath]]
  1. 用于向uploadUrl上传relativeDir文件夹中的内容，如果relativeDir没有指定，则默认为dist文件夹。如果有`addConf`可选项的话，则添加relativeDir项目的服务器（目前暂时是Apache）配置文件，并重启静态服务器。
  2. 如果没有指定projectDomain的话，默认域名是`${relativeDir}.com`
  3. 若有`gradlew`可选项的话，则会生成可以下载打包生成的APK的下载地址
  4. 若要用`gradlew`打包功能，`uploadUrl`必须是用`http://xxxxxxxxxx:12345/uploadTo?path=${打包的工程项目地址的绝对路径}`；此操作会在项目地址下递归创建`app/src/main/assets/apps/belewtech/www`前端资源文件夹，并覆盖要上传的文件夹(`dist文件夹`)


#### 使用
1. 在项目文件夹添加中的scripts部分添加命令。
2. `upload-dist sync http://xxxxxxxxxx:12345/upload/meso_index --addConf meso.belewtech.com`, 上传`dist`文件夹至服务器项目下`public/meso_index`文件夹，同时拷贝至`/var/www`下并生成`ubuntu apache2`配置文件
3. `upload-dist sync http://xxxxxxxxxx:12345/uploadTo?path=/root/juanrong/UBcy --gradlew`, 上传`dist`文件夹至服务器`/root/juanrong/UBcy`项目下的前端资源文件夹（见上文提到的）,并生成下载地址
