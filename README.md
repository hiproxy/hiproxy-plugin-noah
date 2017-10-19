# hiproxy-plugin-noah

为hiproxy开发的Noah插件，只能在我们**内网**使用。

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

**直接启动Noah：**

如果你已经知道了一套Noah环境的ID，你可以直接使用下面的命令启动hiproxy，传入ID。

```bash
# 26572 is the envid
hiproxy noah 26572 --open
```

## 帮助信息

```bash
hiproxy noah --help
```

```bash
USAGE:

  hiproxy noah <envid>

DESCRIBE:

  Start a proxy server and use Noah environment by an `envid`

OPTIONS:

  -h, --help                    show help info
  -s, --https                   Enable HTTPS proxy
  -m, --middle-man-port <port>  The HTTPS proxy port, default: 10010
  -o, --open [browser]          Open a browser window and use hiproxy proxy
  --pac-proxy                   Use Proxy auto-configuration (PAC)
  -p, --port <port>             HTTP proxy port, default: 5525
  --sys-proxy <path>            Your own proxy server path, format: <ip>[:port], only works when use PAC
```

## License

该插件采用MIT协议，点击[LICENSE](https://github.com/hiproxy/hiproxy-plugin-noah/blob/master/LICENSE)查看详情。
