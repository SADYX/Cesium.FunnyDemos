var url1 = '../../GeoJson/forest.json';
var url2 = '../../GeoJson/water.json';
const ModelUri = '../../Models/Cesium_Man.glb';
const TextureUri1 = '../../Images/wetland.jpg';
const TextureUri2 = '../../Images/waterNormals.jpg';
drawRandomByGeoJson(url1);
drawGroundPolygonByGeoJson(url1, TextureUri1);
drawGroundPolygonByGeoJson(url2, TextureUri2, true);

var randomPointEntities = [];
function drawRandomByGeoJson(url) {
    var promise = Cesium.GeoJsonDataSource.load(url);
    promise.then(function (dataSource) {
        var entities = dataSource.entities.values;
        var clampPositions = [];
        entities.forEach(entity => {
            var polygon = entity.polygon;
            if (polygon) {
                var mass = getBboxByPolygon(polygon);
                var points = getRandomPointsInBbox(mass.bbox, mass.turfPolygon, 2);
                var innerPoints = getInnerPointsInPolygon(points, mass.turfPolygon);
                innerPoints.features.forEach(feature => {
                    var coordinates = feature.geometry.coordinates;
                    clampPositions.push(Cesium.Cartographic.fromDegrees(...coordinates));
                })
            }
        })
        var terrainProvider = viewer.terrainProvider;
        var promiseTerrain = Cesium.sampleTerrainMostDetailed(terrainProvider, clampPositions);
        Cesium.when(promiseTerrain, function (updatedPositions) {
            var instances = [];
            updatedPositions.forEach(updatedPosition => {
                var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
                    Cesium.Cartographic.toCartesian(updatedPosition)
                );
                instances.push({
                    modelMatrix: modelMatrix
                });
            })
            let primitive = new Cesium.ModelInstanceCollection({
                url: ModelUri,
                instances: instances
            });
            viewer.scene.primitives.add(primitive);
        });
    })
}

function getBboxByPolygon(polygon) {
    var positions = polygon.hierarchy.getValue().positions;
    var degrees = [];
    positions.forEach(position => {
        var radin = Cesium.Cartographic.fromCartesian(position);
        var degree = getDegreeByRadin(radin);
        degrees.push(degree);
    });
    var turfPolygon = turf.polygon([degrees]);
    var bbox = turf.bbox(turfPolygon);
    return { bbox, turfPolygon };
}

function getRandomPointsInBbox(bbox, polygon, weight = 1) {
    const DefautValue = 0.01; //  number/area
    var area = turf.area(polygon);
    var count = area * DefautValue * weight;
    var points = turf.randomPoint(count, { bbox });
    return points;
}

function getInnerPointsInPolygon(points, polygon) {
    var innerPoints = turf.pointsWithinPolygon(points, polygon);
    return innerPoints;
}

function getDegreeByRadin(radin) {
    return [rad2deg(radin.longitude), rad2deg(radin.latitude)];
}

function rad2deg(rad) {
    return rad * 180 / Math.PI;
}


function drawGroundPolygonByGeoJson(url, imageUri, isWater) {
    var promise = Cesium.GeoJsonDataSource.load(url);
    promise.then(function (dataSource) {
        var entities = dataSource.entities.values;
        entities.forEach(entity => {
            var polygon = entity.polygon;
            if (polygon) {
                var instance = new Cesium.GeometryInstance({
                    geometry: new Cesium.PolygonGeometry({
                        polygonHierarchy: polygon.hierarchy.getValue()
                    })
                });
                var material;
                if (isWater) {
                    material = new Cesium.Material({
                        fabric: {
                            type: "Water",
                            uniforms: {
                                normalMap: imageUri,
                                frequency: 10000.0,
                                animationSpeed: 0.01,
                                amplitude: 1.0,
                            },
                        },
                    });

                }
                else {
                    material = new Cesium.Material({
                        fabric: {
                            type: 'Image',
                            uniforms: {
                                image: imageUri,
                            }
                        }
                    });
                }

                viewer.scene.primitives.add(new Cesium.GroundPrimitive({
                    geometryInstances: instance,
                    appearance: new Cesium.EllipsoidSurfaceAppearance({
                        aboveGround: false,
                        material
                    })
                }));
            }
        })
    });
}