# vuecli3-cesium-config

vuecli3-cesium-config
(webpack.base.config.js是cli2.x配置)

## 1. cli create 

```
npm install cesium --save-dev
npm install strip-pragma-loader --save-dev
```
## 2. 复制vue.config.js 到根目录

```js
var Cesium = require('cesium/Cesium');
var Color = require('cesium/Core/Color');

//OR

import Cesium from 'cesium/Cesium';
import Color from 'cesium/core/Color';
```
## 3.VsCode智能提示
jsconfig.json

