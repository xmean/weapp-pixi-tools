# weapp-pixi (WPX) 工具集

## 安装

```
npm install weapp-pixi-tools -g
```

## 使用

```
wpx --help
```
或者
```
wpx command
```
列出工具包中所包含的所有工具，每个工具的具体使用方法:
```
wpx <command> --help
```

### resmap

该工具会遍历所指定的文件夹，生成对应的`.map.json` map文件，这个文件将会作为微信小游戏云存储的入口文件提供。

```
wpx resmap <folder>
```
将产生的`.map.json`文件连同对应的文件夹一起上传至小游戏的云存储中。

## 编译&测试

```
npm run build
```

```
npm run test
```
