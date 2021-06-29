/**
 * @time 2021/02/20
 * @version 1.0
 * @author yx
 */

// 依赖Cesium.js和turf.js

(function () {

    var CVP = Cesium.Viewer.prototype;

    /**
     * 一些参数
     */
    CVP.SOMEPARAM = {
        LNG_RATIO: 0.00001141, // 1m 转为经度的系数
        LAT_RATIO: 0.00000899, // 1m 转为纬度的系数
    }


    /**
     * 测量两点之间的平面距离
     * @param {Array} point1 [longitude, latitude]
     * @param {Array} point2 [longitude, latitude]
     * @returns {Number} 两点之间的平面距离(米)
     */
    CVP.Sakura5cms = function (point1, point2) {
        var p1 = turf.point(point1);
        var p2 = turf.point(point2);
        var distance = (turf.distance(p1, p2) * 1000).toFixed(3);
        return Number(distance);
    }


    /**
     * 笛卡尔坐标转经纬度坐标(degree)
     * @param {Object} position 笛卡尔坐标 {x, y, z}
     * @returns {Object} 经纬度(degree) {longtiude, latitude, height} 或者 null
     */
    CVP.Cartesian3ToDegree = function (position) {
        var viewer = this;
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var cartographic = ellipsoid.cartesianToCartographic(position);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        var res = {
            longitude,
            latitude,
            height: cartographic.height
        };
        return res;
    }


    /**
     * 计算以正北为轴，顺时针的偏移角(degree)
     * @param {Array} point1 [longitude, latitude]
     * @param {Array} point2 [longitude, latitude]
     * @returns {Number} 偏移角(degree)
     */
    CVP.GetOffestAngle = function (point1, point2) {
        var viewer = this;
        var a = [
            point2[0],
            point2[1]
        ];
        var b = [
            point1[0],
            point1[1]
        ];
        var c = [
            point2[0],
            point1[1]
        ];

        // cos
        var cos = viewer.Sakura5cms(a, c) / viewer.Sakura5cms(a, b);
        var angle = Number((Math.acos(cos) / (Math.PI / 180)).toFixed(2));
        if (a[0] >= b[0] && a[1] >= b[1]) {
            angle = angle - 180;
        }
        else if (a[0] < b[0] && a[1] < b[1]) {
            // no transform
        }
        else if (a[0] < b[0] && a[1] >= b[1]) {
            angle = 180 - angle;
        }
        else if (a[0] >= b[0] && a[1] < b[1]) {
            angle = - angle;
        }

        return Number(angle);
    }


    /**
     * 通过屏幕二维坐标获取经纬度
     * @param {Object} screenPosition 屏幕二维坐标 {x,y}
     * @param {Boolean} type 转换方式 default: false
     * @returns {Object} 经纬度(degree) {longtiude, latitude, height} 或者 null
     */
    CVP.GetDegreeByScreenPosition = function (screenPosition, type = false) {
        var viewer = this;
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var cartesian = type
            ? viewer.camera.pickEllipsoid(screenPosition, ellipsoid)
            : viewer.scene.pickPosition(screenPosition);
        try {
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        }
        catch (error) {
            console.warn('未获取到经纬度');
            return null;
        }
        var pos = {};
        pos.longitude = Number(Cesium.Math.toDegrees(cartographic.longitude).toFixed(9));
        pos.latitude = Number(Cesium.Math.toDegrees(cartographic.latitude).toFixed(9));
        pos.height = Number(cartographic.height.toFixed(3));
        return pos;
    }


    /**
     * 是否开启地形深度检测
     * @param {Boolean} enabled true开启, false关闭
     */
    CVP.DepthTestAgainstTerrainTrigger = function (enabled) {
        if (typeof enabled === 'boolean') {
            var viewer = this;
            viewer.scene.globe.depthTestAgainstTerrain = enabled;
        }
    }

    /**
     * 是否开启抗锯齿
     * @param {Boolean} enabled true开启, false关闭
     */
    CVP.FxaaTrigger = function (enabled) {
        if (typeof enabled === 'boolean') {
            var viewer = this;
            viewer.scene.postProcessStages.fxaa.enabled = enabled;
        }
    }


    /**
     * 是否开启碰撞检测(相机入地)
     * @param {Boolean} enabled true开启, false关闭
     */
    CVP.CollisionDetectionTrigger = function (enabled) {
        if (typeof enabled === 'boolean') {
            var viewer = this;
            viewer.scene.screenSpaceCameraController.enableCollisionDetection = enabled;
        }
    }

    /**
     * 鼠标单击获取经纬度
     * @param {Function} fn 回调函数 f({longtiude, latitude, height})
     * @param {Boolean} type 转换方式 default: false
     */
    CVP.GetPositionByLeftClick = function (fn, type = false) {
        var viewer = this;
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (evt) {
            var pos = viewer.GetDegreeByScreenPosition(evt.position, type);
            if (pos)
                fn(pos);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    /**
     * 鼠标单击获取实体
     * @param {Function} fn 回调函数 f({Object})
     */
    CVP.GetObjectByLeftClick = function (fn) {
        var viewer = this;
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (evt) {
            var pickedFeature = viewer.scene.pick(evt.position);
            fn(pickedFeature);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    /**
     * 跳转至白天
     */
    CVP.ToDaybeak = function () {
        viewer.clock.currentTime =
            new Cesium.JulianDate.fromDate(new Date('2012-08-04T04:00:00Z'));
    }

    /**
     * 跳转至现在
     */
    CVP.ToNow = function () {
        viewer.clock.currentTime =
            new Cesium.JulianDate.fromDate(new Date());
    }

    /**
     * 移除默认双击事件
     */
    CVP.RemoveDefaultLeftDoubleClick = function () {
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
    
})()














