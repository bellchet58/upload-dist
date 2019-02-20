# upload-dist
using axios to upload packed dist directory

### sync <uploadUrl> [relativeDir] [--addConf [projectDomain]]
  用于向uploadUrl上传relativeDir文件夹中的内容，如果relativeDir没有指定，则默认为dist文件夹。如果有`addConf`可选项的话，则添加relativeDir项目的服务器（目前暂时是Apache）配置文件，并重启静态服务器。如果没有指定projectDomain的话，默认域名是项目名称（relativeDir的值)+.com
