# DOCUMENTATION

## Prototype extend

#### 测量两点间平面距离

***Sakura5cms***

@param {Array} point1 [longitude, latitude]
@param {Array} point2 [longitude, latitude]
@returns {Number} 两点之间的平面距离(米)

#### 笛卡尔坐标转经纬度坐标(degree)

***Cartesian3ToDegree***

@param {Object} position 笛卡尔坐标 {x, y, z}
@returns {Object} 经纬度(degree) {longtiude, latitude, height} 或者 null

#### 计算以正北为轴，顺时针的偏移角(degree)

***GetOffestAngle***

@param {Array} point1 [longitude, latitude]
@param {Array} point2 [longitude, latitude]
@returns {Number} 偏移角(degree)

#### 通过屏幕二维坐标获取经纬度

***GetDegreeByScreenPosition***

@param {Object} screenPosition 屏幕二维坐标 {x,y}
@param {Boolean} type 转换方式 default: false
@returns {Object} 经纬度(degree) {longtiude, latitude, height} 或者 null

#### 是否开启地形深度检测

***DepthTestAgainstTerrainTrigger***

@param {Boolean} enabled true开启, false关闭

#### 是否开启抗锯齿

***FxaaTrigger***

@param {Boolean} enabled true开启, false关闭

#### 是否开启碰撞检测(相机入地)

***CollisionDetectionTrigger***

@param {Boolean} enabled true开启, false关闭

#### 鼠标单击获取经纬度

***GetPositionByLeftClick***

@param {Function} fn 回调函数 f({longtiude, latitude, height})
@param {Boolean} type 转换方式 default: false

#### 跳转至白天

***ToDaybeak***

#### 跳转至现在

***ToNow***

## Some params

```javascript
CVP.SOMEPARAM = {
    LNG_RATIO: 0.00001141, // 1m 转为经度的系数
    LAT_RATIO: 0.00000899, // 1m 转为纬度的系数
}
```

