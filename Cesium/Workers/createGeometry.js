define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-a8ce88a9","./Transforms-31e2659a","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-60f5bf9c","./GeometryAttributes-4fcfcf40","./AttributeCompression-88d6db09","./GeometryPipeline-0fe98df4","./EncodedCartesian3-e3c09f89","./IndexDatatype-53503fee","./IntersectionTests-836e8b79","./Plane-ef10ab79","./PrimitivePipeline-245975d6","./WebMercatorProjection-163698a4","./createTaskProcessorWorker"],function(u,e,r,t,n,o,a,i,c,s,f,d,b,m,p,l,y,P,k){"use strict";var C={};return k(function(e,r){for(var t=e.subTasks,n=t.length,o=new Array(n),a=0;a<n;a++){var i,c=t[a],s=c.geometry,f=c.moduleName;u.defined(f)?(i=function(e){var r=C[e];return u.defined(r)||("object"==typeof exports?C[r]=r=require("Workers/"+e):require(["Workers/"+e],function(e){C[r=e]=e})),r}(f),o[a]=i(s,c.offset)):o[a]=s}return u.when.all(o,function(e){return y.PrimitivePipeline.packCreateGeometryResults(e,r)})})});