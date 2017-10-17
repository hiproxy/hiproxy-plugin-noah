# hiproxy-plugin-noah

hiproxy Noah plugin, can only be used on our **internal network**.

## Installation

* install hiproxy

```bash
npm install -g hiproxy
```

* install noah plugin

```bash
npm install -g hiproxy-plugin-noah
```

## Usage

```bash
# 26572 is the envid
hiproxy noah 26572
```

## Help

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

This project is licensed under the MIT License - see the [LICENSE](https://github.com/hiproxy/hiproxy-plugin-noah/blob/master/LICENSE) file for details
