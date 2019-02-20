# upload-dist
using axios to upload packed dist directory

### install
1. 进入项目文件夹
2. yarn add --dev upload-dist (npm install --save-dev upload-dist)

### sync <uploadUrl> [relativeDir] [--addConf [projectDomain]]
  用于向uploadUrl上传relativeDir文件夹中的内容，如果relativeDir没有指定，则默认为dist文件夹。如果有`addConf`可选项的话，则添加relativeDir项目的服务器（目前暂时是Apache）配置文件，并重启静态服务器。
  如果没有指定projectDomain的话，默认域名是`${relativeDir}.com`

#### 使用
1. 在项目文件夹添加中的scripts部分添加命令。
2. `upload-dist sync http://xxxxxxxxxx:12345/upload/meso_index --addConf meso.belewtech.com`
