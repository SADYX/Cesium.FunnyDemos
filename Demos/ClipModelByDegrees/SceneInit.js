Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MTIzNzY5OC1hOWM2LTRiMWMtYTc5YS1lNjFmZmJhNDcxZjEiLCJpZCI6MTEzNjIsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NjAxMzMzOTZ9.u3sp8GEkT7NjKeexeoUzMjgND6FHk0iGhdV-YxrJw-o';
const viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate: true
});

var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: '../../tilesets/instancedOrientation/tileset.json'
}));
tileset.readyPromise.then(function (tileset) {
    viewer.zoomTo(tileset);
    // clip by degrees
    clipModel(tileset, [
        { longitude: -75.612827083, latitude: 40.043082344, sequence: 0 },
        { longitude: -75.612752539, latitude: 40.042006406, sequence: 1 },
        { longitude: -75.611472882, latitude: 40.041971, sequence: 2 },
        { longitude: -75.611471244, latitude: 40.04310531, sequence: 3 }
    ]);
});
