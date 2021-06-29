define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-a8ce88a9","./Transforms-31e2659a","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-60f5bf9c","./GeometryAttributes-4fcfcf40","./IndexDatatype-53503fee","./IntersectionTests-836e8b79","./Plane-ef10ab79","./GeometryOffsetAttribute-7350d9af","./arrayRemoveDuplicates-ebc732b0","./EllipsoidTangentPlane-5d1ab0af","./EllipsoidRhumbLine-a69f63ad","./PolygonPipeline-78886f34","./PolylineVolumeGeometryLibrary-4e0e29a6","./EllipsoidGeodesic-9bc1521b","./PolylinePipeline-150121ba","./CorridorGeometryLibrary-f2488613"],function(R,e,c,B,g,t,i,U,F,Y,q,r,o,E,b,a,n,C,W,s,l,J){"use strict";var j=new B.Cartesian3,z=new B.Cartesian3,K=new B.Cartesian3;function G(e,t){var i,r=[],o=e.positions,a=e.corners,n=e.endPositions,s=new Y.GeometryAttributes,l=0,d=0,u=0;for(L=0;L<o.length;L+=2)l+=i=o[L].length-3,u+=i/3*4,d+=o[L+1].length-3;for(l+=3,d+=3,L=0;L<a.length;L++){V=a[L];var p=a[L].leftPositions;R.defined(p)?l+=i=p.length:d+=i=a[L].rightPositions.length,u+=i/3*2}var f,h=R.defined(n);h&&(l+=f=n[0].length-3,d+=f,u+=4*(f/=3));var y,c,g,b,m,v,A=l+d,_=new Float64Array(A),E=0,C=A-1,G=f/2,T=q.IndexDatatype.createTypedArray(A/3,u+4),P=0;if(T[P++]=E/3,T[P++]=(C-2)/3,h){r.push(E/3),v=j,m=z;for(var w=n[0],L=0;L<G;L++)v=B.Cartesian3.fromArray(w,3*(G-1-L),v),m=B.Cartesian3.fromArray(w,3*(G+L),m),J.CorridorGeometryLibrary.addAttribute(_,m,E),J.CorridorGeometryLibrary.addAttribute(_,v,void 0,C),b=(c=E/3)+1,g=(y=(C-2)/3)-1,T[P++]=y,T[P++]=g,T[P++]=c,T[P++]=b,E+=3,C-=3}var D=0,k=o[D++],N=o[D++];for(_.set(k,E),_.set(N,C-N.length+1),i=N.length-3,r.push(E/3,(C-2)/3),L=0;L<i;L+=3)b=(c=E/3)+1,g=(y=(C-2)/3)-1,T[P++]=y,T[P++]=g,T[P++]=c,T[P++]=b,E+=3,C-=3;for(L=0;L<a.length;L++){var O,V,x,H=(V=a[L]).leftPositions,I=V.rightPositions,S=K;if(R.defined(H)){for(C-=3,x=g,r.push(b),O=0;O<H.length/3;O++)S=B.Cartesian3.fromArray(H,3*O,S),T[P++]=x-O-1,T[P++]=x-O,J.CorridorGeometryLibrary.addAttribute(_,S,void 0,C),C-=3;r.push(x-Math.floor(H.length/6)),t===W.CornerType.BEVELED&&r.push((C-2)/3+1),E+=3}else{for(E+=3,x=b,r.push(g),O=0;O<I.length/3;O++)S=B.Cartesian3.fromArray(I,3*O,S),T[P++]=x+O,T[P++]=x+O+1,J.CorridorGeometryLibrary.addAttribute(_,S,E),E+=3;r.push(x+Math.floor(I.length/6)),t===W.CornerType.BEVELED&&r.push(E/3-1),C-=3}for(k=o[D++],N=o[D++],k.splice(0,3),N.splice(N.length-3,3),_.set(k,E),_.set(N,C-N.length+1),i=N.length-3,O=0;O<N.length;O+=3)c=(b=E/3)-1,y=(g=(C-2)/3)+1,T[P++]=y,T[P++]=g,T[P++]=c,T[P++]=b,E+=3,C-=3;E-=3,C+=3,r.push(E/3,(C-2)/3)}if(h){E+=3,C-=3,v=j,m=z;var M=n[1];for(L=0;L<G;L++)v=B.Cartesian3.fromArray(M,3*(f-L-1),v),m=B.Cartesian3.fromArray(M,3*L,m),J.CorridorGeometryLibrary.addAttribute(_,v,void 0,C),J.CorridorGeometryLibrary.addAttribute(_,m,E),c=(b=E/3)-1,y=(g=(C-2)/3)+1,T[P++]=y,T[P++]=g,T[P++]=c,T[P++]=b,E+=3,C-=3;r.push(E/3)}else r.push(E/3,(C-2)/3);return T[P++]=E/3,T[P++]=(C-2)/3,s.position=new F.GeometryAttribute({componentDatatype:U.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:_}),{attributes:s,indices:T,wallIndices:r}}function h(e){var t=(e=R.defaultValue(e,R.defaultValue.EMPTY_OBJECT)).positions,i=e.width,r=R.defaultValue(e.height,0),o=R.defaultValue(e.extrudedHeight,r);this._positions=t,this._ellipsoid=B.Ellipsoid.clone(R.defaultValue(e.ellipsoid,B.Ellipsoid.WGS84)),this._width=i,this._height=Math.max(r,o),this._extrudedHeight=Math.min(r,o),this._cornerType=R.defaultValue(e.cornerType,W.CornerType.ROUNDED),this._granularity=R.defaultValue(e.granularity,c.CesiumMath.RADIANS_PER_DEGREE),this._offsetAttribute=e.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+t.length*B.Cartesian3.packedLength+B.Ellipsoid.packedLength+6}h.pack=function(e,t,i){i=R.defaultValue(i,0);var r=e._positions,o=r.length;t[i++]=o;for(var a=0;a<o;++a,i+=B.Cartesian3.packedLength)B.Cartesian3.pack(r[a],t,i);return B.Ellipsoid.pack(e._ellipsoid,t,i),i+=B.Ellipsoid.packedLength,t[i++]=e._width,t[i++]=e._height,t[i++]=e._extrudedHeight,t[i++]=e._cornerType,t[i++]=e._granularity,t[i]=R.defaultValue(e._offsetAttribute,-1),t};var y=B.Ellipsoid.clone(B.Ellipsoid.UNIT_SPHERE),m={positions:void 0,ellipsoid:y,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};return h.unpack=function(e,t,i){t=R.defaultValue(t,0);for(var r=e[t++],o=new Array(r),a=0;a<r;++a,t+=B.Cartesian3.packedLength)o[a]=B.Cartesian3.unpack(e,t);var n=B.Ellipsoid.unpack(e,t,y);t+=B.Ellipsoid.packedLength;var s=e[t++],l=e[t++],d=e[t++],u=e[t++],p=e[t++],f=e[t];return R.defined(i)?(i._positions=o,i._ellipsoid=B.Ellipsoid.clone(n,i._ellipsoid),i._width=s,i._height=l,i._extrudedHeight=d,i._cornerType=u,i._granularity=p,i._offsetAttribute=-1===f?void 0:f,i):(m.positions=o,m.width=s,m.height=l,m.extrudedHeight=d,m.cornerType=u,m.granularity=p,m.offsetAttribute=-1===f?void 0:f,new h(m))},h.createGeometry=function(e){var t=e._positions,i=e._width,r=e._ellipsoid,t=function(e,t){for(var i=0;i<e.length;i++)e[i]=t.scaleToGeodeticSurface(e[i],e[i]);return e}(t,r),o=b.arrayRemoveDuplicates(t,B.Cartesian3.equalsEpsilon);if(!(o.length<2||i<=0)){var a,n,s,l,d=e._height,u=e._extrudedHeight,p=!c.CesiumMath.equalsEpsilon(d,u,0,c.CesiumMath.EPSILON2),f={ellipsoid:r,positions:o,width:i,cornerType:e._cornerType,granularity:e._granularity,saveAttributes:!1};p?(f.height=d,f.extrudedHeight=u,f.offsetAttribute=e._offsetAttribute,l=function(e){var t=e.ellipsoid,i=G(J.CorridorGeometryLibrary.computePositions(e),e.cornerType),r=i.wallIndices,o=e.height,a=e.extrudedHeight,n=i.attributes,s=i.indices,l=(f=n.position.values).length;(h=new Float64Array(l)).set(f);var d,u,p=new Float64Array(2*l),f=C.PolygonPipeline.scaleToGeodeticHeight(f,o,t),h=C.PolygonPipeline.scaleToGeodeticHeight(h,a,t);p.set(f),p.set(h,l),n.position.values=p,l/=3,R.defined(e.offsetAttribute)&&(u=new Uint8Array(2*l),u=e.offsetAttribute===E.GeometryOffsetAttribute.TOP?E.arrayFill(u,1,0,l):(d=e.offsetAttribute===E.GeometryOffsetAttribute.NONE?0:1,E.arrayFill(u,d)),n.applyOffset=new F.GeometryAttribute({componentDatatype:U.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:u}));var y=s.length,c=q.IndexDatatype.createTypedArray(p.length/3,2*(y+r.length));c.set(s);for(var g,b,m=y,v=0;v<y;v+=2){var A=s[v],_=s[v+1];c[m++]=A+l,c[m++]=_+l}for(v=0;v<r.length;v++)b=(g=r[v])+l,c[m++]=g,c[m++]=b;return{attributes:n,indices:c}}(f)):((l=G(J.CorridorGeometryLibrary.computePositions(f),f.cornerType)).attributes.position.values=C.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,d,r),R.defined(e._offsetAttribute)&&(a=l.attributes.position.values.length,n=new Uint8Array(a/3),s=e._offsetAttribute===E.GeometryOffsetAttribute.NONE?0:1,E.arrayFill(n,s),l.attributes.applyOffset=new F.GeometryAttribute({componentDatatype:U.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:n})));var h=l.attributes,y=g.BoundingSphere.fromVertices(h.position.values,void 0,3);return new F.Geometry({attributes:h,indices:l.indices,primitiveType:F.PrimitiveType.LINES,boundingSphere:y,offsetAttribute:e._offsetAttribute})}},function(e,t){return R.defined(t)&&(e=h.unpack(e,t)),e._ellipsoid=B.Ellipsoid.clone(e._ellipsoid),h.createGeometry(e)}});