function clipModel(tile, points) {
    if (points.length < 3)
        return;
    // sort...
    for (let i = 0; i < points.length - 1; i++)
        for (let j = 0; j < points.length - i - 1; j++) {
            let pre = points[j];
            let suf = points[j + 1];
            if (pre.sequence < suf.sequence) {
                let tmp = pre;
                points[j] = suf;
                points[j + 1] = tmp;
            }
        }
    // decide the way to sort
    var A = points[0];
    var B = points[1];
    var C = points[2];
    var AB = [A.longitude - B.longitude, A.latitude - B.latitude];
    var AC = [A.longitude - C.longitude, A.latitude - C.latitude];
    var M = [A.latitude - B.latitude, B.longitude - A.longitude];
    var result = AC[0] * M[0] + AC[1] * M[1];
    var hole = [];
    if (result > 0)
        for (let i = 0; i < points.length; i++) {
            var point = points[i];
            hole.push([point.longitude, point.latitude]);
        }
    else
        for (let i = points.length - 1; i >= 0; i--) {
            var point = points[i];
            hole.push([point.longitude, point.latitude]);
        }

    if (tile) {
        digHole(tile, hole);
    }
}

function digHole(tile, hole) {
    var tilesetMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(tile.boundingSphere.center);
    var tranform = Cesium.Matrix4.inverse(tilesetMatrix, new Cesium.Matrix4());
    let planes = [];
    for (let i = 0; i < hole.length; i++) {
        var position1 = hole[i];
        var position2 = hole[i + 1 >= hole.length ? 0 : i + 1];
        let p1 = new Cesium.Cartesian3.fromDegrees(position1[0], position1[1]);
        let p2 = new Cesium.Cartesian3.fromDegrees(position2[0], position2[1]);
        let up = new Cesium.Cartesian3.fromDegrees(position1[0], position1[1], 1);
        let right = Cesium.Cartesian3.subtract(p1, p2, new Cesium.Cartesian3());
        let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
        normal = Cesium.Cartesian3.normalize(normal, normal);
        let plane = new Cesium.ClippingPlane(normal, 0);
        planes.push(plane);
    }
    var clippingPlanes = new Cesium.ClippingPlaneCollection(
        {
            modelMatrix: tranform,
            planes: planes,
        },
    );
    tile.clippingPlanes = clippingPlanes;
}