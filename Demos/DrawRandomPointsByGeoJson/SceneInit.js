Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MTIzNzY5OC1hOWM2LTRiMWMtYTc5YS1lNjFmZmJhNDcxZjEiLCJpZCI6MTEzNjIsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NjAxMzMzOTZ9.u3sp8GEkT7NjKeexeoUzMjgND6FHk0iGhdV-YxrJw-o';
const viewer = new Cesium.Viewer('cesiumContainer',{
    terrainProvider: Cesium.createWorldTerrain(),
});
viewer.scene.globe.depthTestAgainstTerrain = true;

viewer.camera.setView({
    destination: new Cesium.Cartesian3(-2781687.3704578388,4649943.050372719, 3355152.8370280676),
    orientation: {
        heading: 6.035952312256276, // 方向
        pitch: -0.6642366272714, // 倾斜角度
        roll: 6.2822474200219105
    },
});