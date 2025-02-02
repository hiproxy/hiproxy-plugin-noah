# hiproxy-plugin-noah

为hiproxy开发的Noah插件（只能在我们**内网**使用），可以根据Noah环境的ID，快速切换环境对应的hosts。

## 安装

* 安装hiproxy

```bash
npm install -g hiproxy
```

* 安装Noah插件

```bash
npm install -g hiproxy-plugin-noah
```

## 使用

### 直接使用envid启动

如果你已经知道了一套Noah环境的ID，你可以直接使用下面的命令启动hiproxy，传入ID。

```bash
# 26572  ==> 环境ID
# --open ==> 打开浏览器窗口并自动配置好代理
hiproxy noah 26572 --open
```

### 启动后再切换

如果你不喜欢使用envid启动，你可以使用以下步骤来使用Noah环境：

* 1、直接在**任意目录**启动hiproxy；
* 2、访问<http://127.0.0.1:5525/noah/>（这里使用了**默认端口: 5525**）；
* 3、输入`envid`；
* 4、点击`切换`按钮。

经过上面的步骤之后，页面会自动刷新，你能看到当前使用的hosts内容。

> **提示**： <br/>
> 1、不管使用上面两种方式中的哪一种启动，都可以在<http://127.0.0.1:5525/noah/>里面切换Noah环境。 <br/>
> 2、为了保证使用“纯净”的Noah环境，切换Noah环境时，会清空其他所有的hosts／rewrite配置。 

## 插件地址

<http://127.0.0.1:[port]/noah/>

## 截图

![](./noah-plugin.png)

## 帮助信息

可以使用命令`hiproxy noah --help`来查看Noah插件的使用方法、参数等帮助信息。

```bash
USAGE:

  hiproxy noah <envid>

DESCRIBE:

  启动一个代理服务，并使用<envid>对应的Noah环境的hosts

OPTIONS:

  -h, --help                    show help info
  -s, --https                   启用HTTPS请求代理
  -m, --middle-man-port <port>  HTTPS代理服务端口号，默认: 10010
  -o, --open [browser]          打开浏览器窗口，并且配置好代理（hiproxy代理）
  --pac-proxy                   使用Proxy auto-configuration (PAC)代理
  -p, --port <port>             HTTP代理服务端口号，默认：5525
  --sys-proxy <path>            系统代理，没有走hiproxy代理的请求会走这个代理，格式: <ip>[:port]，只在使用PAC代理时生效
```

## License

该插件采用MIT协议，点击[LICENSE](https://github.com/hiproxy/hiproxy-plugin-noah/blob/master/LICENSE)查看详情。
