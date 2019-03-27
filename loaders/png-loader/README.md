## tinyPngWebpackLoader

##### 基于tinyPng，作为url-loader的前置处理器

### require

```
webpack4.x
```

### install
```
yarn add tinypng-loader
```

### config 
```js
{
  test: /\.(png|jpe?g|gif)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 4096,
      name: 'img/[name].[ext]?v=[hash:8]'
    }
  }, {
    loader: 'png-loader',
    options: {
      key: 'xxx',
      ext: ['png', 'jpeg', 'jpg'],
      identifier: 'QCS_GROWTH'
    }
  }]
}
```

### options

#### key
Type: `String`
在[tinyPng](https://tinypng.com/developers)申请key，免费版本每月限制压缩次数上限500

#### ext
type `Array`
需要处理的图片类型，目前支持png、 jpeg、 jpg三种类型

#### identifier
type: `String`
给压缩后图片添加标志位，用于减少不必要的压缩操作，注:由于png没有exif，所以目前只给jpg和jpeg添加标志位
