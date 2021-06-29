const MODEL_URI = '../../models/Cesium_Man.glb';
const SPEED = 0.03;
const W = 400;
const G = 10;
const MASS = 50;
var V = 0; // Current velocity on Z-axis
var jumpStartTime = null;

var movement = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

var rule = {
    w: 'forward',
    s: 'backward',
    a: 'left',
    d: 'right',
    ' ': 'jump'
};

// Default position
var M1 = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(120, 30));

// Init model with default position matrix
var entity = viewer.entities.add({
    position: Cesium.Matrix4.multiplyByPoint(M1, new Cesium.Cartesian3(0, 0, 0), new Cesium.Cartesian3()),
    model: {
        uri: MODEL_URI,
        runAnimations: false
    }
});


var keyDownFun = function (evt) {
    var key = evt.key;
    if (rule.hasOwnProperty(key)) {
        if (!jumpStartTime&& key == ' ') {
            V = Math.sqrt(2 * W / MASS);
            jumpStartTime = Cesium.JulianDate.clone(viewer.clock.currentTime);
        }
        else {
            movement[rule[key]] = true;
        }
        if (entity) {
            entity.model.runAnimations = true;
        }
    }
}

var keyUpFun = function (evt) {
    var key = evt.key;
    if (rule.hasOwnProperty(key)) {
        movement[rule[key]] = false;
    }
    var enabled = false;
    for (key in movement) {
        if (movement[key] == true) {
            enabled = true;
        }
    }
    if (entity) {
        entity.model.runAnimations = enabled;
    }
}

document.addEventListener("keydown", keyDownFun);
document.addEventListener("keyup", keyUpFun);

viewer.clock.onTick.addEventListener(function () {
    if (entity) {
        viewer.trackedEntity = entity;
        var angle = viewer.camera.heading;

        // Rotate matrix
        var M2 = new Cesium.Matrix4.fromArray([
            Math.cos(angle), -Math.sin(angle), 0, 0,
            Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);

        var dx = 0;
        var dy = 0;
        var dz = 0;

        if (movement.forward) {
            dy += SPEED;
        }
        if (movement.backward) {
            dy -= SPEED;
        }
        if (movement.left) {
            dx -= SPEED;
        }
        if (movement.right) {
            dx += SPEED;
        }

        var h = 0;
        // simulate gravity
        if(jumpStartTime) {
            var T = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, jumpStartTime);
            var V0 = Math.sqrt(2 * W / MASS);
            V = V0 - G * T;
            var W1 = (MASS * Math.pow(V, 2)) / 2;
            h = (W - W1) / (MASS * G);
            if(W1 > W){ 
                // Actually, it takes advantage(or you can call it "loophole") of the fact that T is discrete to determine the condition of end
                jumpStartTime = null;
            }
            if(h < 0){
                // Fix height error caused by discrete time
                h = 0;
            }
        }

        // Translational matrix
        var M3 = new Cesium.Matrix4.fromArray([
            1, 0, 0.0, 0.0,
            0, 1, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            dx, dy, dz, 1.0
        ]);

        var entityPosition = entity.position.getValue(viewer.clock.currentTime);
        var clampPostion = Cesium.Cartographic.fromCartesian(entityPosition);
        clampPostion.height = 0;
        var currentPosition = new Cesium.Cartesian3(0, 0, h);
        M1 = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartographic.toCartesian(clampPostion));

        // Update position of the entity
        entity.position = new Cesium.CallbackProperty(function () {
            var P1 = Cesium.Matrix4.multiplyByPoint(M3, currentPosition, new Cesium.Cartesian3());
            var P2 = Cesium.Matrix4.multiplyByPoint(M2, P1, new Cesium.Cartesian3());
            var P3 = Cesium.Matrix4.multiplyByPoint(M1, P2, new Cesium.Cartesian3());
            return P3;
        }, false);

        // Update orientation of the entity
        entity.orientation = new Cesium.CallbackProperty(function () {
            // Fixed the original angle of the model
            angle = angle - Math.PI / 2;

            // Reacted by keyboard
            if (dy < 0) {
                angle = angle + Math.PI;
                if (dx < 0) {
                    angle = angle + Math.PI / 4;
                }
                else if (dx > 0) {
                    angle = angle - Math.PI / 4;
                }
            }
            else if (dy > 0) {
                if (dx < 0) {
                    angle = angle - Math.PI / 4;
                }
                else if (dx > 0) {
                    angle = angle + Math.PI / 4;
                }
            }
            else { // dy == 0
                if (dx < 0) {
                    angle = angle - Math.PI / 2;
                }
                else if (dx > 0) {
                    angle = angle + Math.PI / 2;
                }
            }

            return new Cesium.Transforms.headingPitchRollQuaternion(
                entity.position.getValue(viewer.clock.currentTime),
                new Cesium.HeadingPitchRoll(angle, 0, 0)
            );
        });
    }
});



















