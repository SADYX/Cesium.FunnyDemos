define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-a8ce88a9","./Transforms-31e2659a","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./AttributeCompression-88d6db09","./IndexDatatype-53503fee","./IntersectionTests-836e8b79","./Plane-ef10ab79","./createTaskProcessorWorker","./EllipsoidTangentPlane-5d1ab0af","./OrientedBoundingBox-fd971f99","./Color-59d05b60"],function(Be,e,Le,Oe,a,r,n,Ue,Pe,t,i,o,s,Fe,Se){"use strict";var Re=new Oe.Cartesian3,De=new Oe.Ellipsoid,Me=new Oe.Rectangle,_e={min:void 0,max:void 0,indexBytesPerElement:void 0};function Ge(e,a,r){var n=a.length,t=2+n*Fe.OrientedBoundingBox.packedLength+1+function(e){for(var a=e.length,r=0,n=0;n<a;++n)r+=Se.Color.packedLength+3+e[n].batchIds.length;return r}(r),i=new Float64Array(t),o=0;i[o++]=e,i[o++]=n;for(var s=0;s<n;++s)Fe.OrientedBoundingBox.pack(a[s],i,o),o+=Fe.OrientedBoundingBox.packedLength;var f=r.length;i[o++]=f;for(var d=0;d<f;++d){var c=r[d];Se.Color.pack(c.color,i,o),o+=Se.Color.packedLength,i[o++]=c.offset,i[o++]=c.count;var u=c.batchIds,h=u.length;i[o++]=h;for(var l=0;l<h;++l)i[o++]=u[l]}return i}var Ye=new Oe.Cartesian3,Ve=new Oe.Cartesian3,He=new Oe.Cartesian3,We=new Oe.Cartesian3,ze=new Oe.Cartesian3,Ze=new Oe.Cartographic,je=new Oe.Rectangle;return o(function(e,a){var r,n,t;r=e.packedBuffer,n=new Float64Array(r),t=0,_e.indexBytesPerElement=n[t++],_e.min=n[t++],_e.max=n[t++],Oe.Cartesian3.unpack(n,3,Re),t+=Oe.Cartesian3.packedLength,Oe.Ellipsoid.unpack(n,t,De),t+=Oe.Ellipsoid.packedLength,Oe.Rectangle.unpack(n,t,Me);var i,o=new(2===_e.indexBytesPerElement?Uint16Array:Uint32Array)(e.indices),s=new Uint16Array(e.positions),f=new Uint32Array(e.counts),d=new Uint32Array(e.indexCounts),c=new Uint32Array(e.batchIds),u=new Uint32Array(e.batchTableColors),h=new Array(f.length),l=Re,g=De,p=Me,b=_e.min,C=_e.max,y=e.minimumHeights,I=e.maximumHeights;Be.defined(y)&&Be.defined(I)&&(y=new Float32Array(y),I=new Float32Array(I));var m=s.length/2,w=s.subarray(0,m),v=s.subarray(m,2*m);Ue.AttributeCompression.zigZagDeltaDecode(w,v);for(var x=new Float64Array(3*m),A=0;A<m;++A){var E=w[A],N=v[A],T=Le.CesiumMath.lerp(p.west,p.east,E/32767),k=Le.CesiumMath.lerp(p.south,p.north,N/32767),B=Oe.Cartographic.fromRadians(T,k,0,Ze),L=g.cartographicToCartesian(B,Ye);Oe.Cartesian3.pack(L,x,3*A)}var O=f.length,U=new Array(O),P=new Array(O),F=0,S=0;for(A=0;A<O;++A)U[A]=F,P[A]=S,F+=f[A],S+=d[A];var R,D=new Float32Array(3*m*2),M=new Uint16Array(2*m),_=new Uint32Array(P.length),G=new Uint32Array(d.length),Y=[],V={};for(A=0;A<O;++A)i=u[A],Be.defined(V[i])?(V[i].positionLength+=f[A],V[i].indexLength+=d[A],V[i].batchIds.push(A)):V[i]={positionLength:f[A],indexLength:d[A],offset:0,indexOffset:0,batchIds:[A]};var H,W=0,z=0;for(i in V){V.hasOwnProperty(i)&&((R=V[i]).offset=W,R.indexOffset=z,W+=2*R.positionLength,z+=H=2*R.indexLength+6*R.positionLength,R.indexLength=H)}var Z=[];for(i in V)V.hasOwnProperty(i)&&(R=V[i],Z.push({color:Se.Color.fromRgba(parseInt(i)),offset:R.indexOffset,count:R.indexLength,batchIds:R.batchIds}));for(A=0;A<O;++A){var j=(R=V[i=u[A]]).offset,q=3*j,J=j,K=U[A],Q=f[A],X=c[A],$=b,ee=C;Be.defined(y)&&Be.defined(I)&&($=y[A],ee=I[A]);for(var ae=Number.POSITIVE_INFINITY,re=Number.NEGATIVE_INFINITY,ne=Number.POSITIVE_INFINITY,te=Number.NEGATIVE_INFINITY,ie=0;ie<Q;++ie){var oe=Oe.Cartesian3.unpack(x,3*K+3*ie,Ye);g.scaleToGeodeticSurface(oe,oe);var se=g.cartesianToCartographic(oe,Ze),fe=se.latitude,de=se.longitude,ae=Math.min(fe,ae),re=Math.max(fe,re),ne=Math.min(de,ne),te=Math.max(de,te),ce=g.geodeticSurfaceNormal(oe,Ve),ue=Oe.Cartesian3.multiplyByScalar(ce,$,He),he=Oe.Cartesian3.add(oe,ue,We),ue=Oe.Cartesian3.multiplyByScalar(ce,ee,ue),le=Oe.Cartesian3.add(oe,ue,ze);Oe.Cartesian3.subtract(le,l,le),Oe.Cartesian3.subtract(he,l,he),Oe.Cartesian3.pack(le,D,q),Oe.Cartesian3.pack(he,D,q+3),M[J]=X,M[J+1]=X,q+=6,J+=2}(p=je).west=ne,p.east=te,p.south=ae,p.north=re,h[A]=Fe.OrientedBoundingBox.fromRectangle(p,b,C,g);var ge=R.indexOffset,pe=P[A],be=d[A];for(_[A]=ge,ie=0;ie<be;ie+=3){var Ce=o[pe+ie]-K,ye=o[pe+ie+1]-K,Ie=o[pe+ie+2]-K;Y[ge++]=2*Ce+j,Y[ge++]=2*ye+j,Y[ge++]=2*Ie+j,Y[ge++]=2*Ie+1+j,Y[ge++]=2*ye+1+j,Y[ge++]=2*Ce+1+j}for(ie=0;ie<Q;++ie){var me=ie,we=(ie+1)%Q;Y[ge++]=2*me+1+j,Y[ge++]=2*we+j,Y[ge++]=2*me+j,Y[ge++]=2*me+1+j,Y[ge++]=2*we+1+j,Y[ge++]=2*we+j}R.offset+=2*Q,R.indexOffset=ge,G[A]=ge-_[A]}Y=Pe.IndexDatatype.createTypedArray(D.length/3,Y);for(var ve=Z.length,xe=0;xe<ve;++xe){for(var Ae=Z[xe].batchIds,Ee=0,Ne=Ae.length,Te=0;Te<Ne;++Te)Ee+=G[Ae[Te]];Z[xe].count=Ee}var ke=Ge(2===Y.BYTES_PER_ELEMENT?Pe.IndexDatatype.UNSIGNED_SHORT:Pe.IndexDatatype.UNSIGNED_INT,h,Z);return a.push(D.buffer,Y.buffer,_.buffer,G.buffer,M.buffer,ke.buffer),{positions:D.buffer,indices:Y.buffer,indexOffsets:_.buffer,indexCounts:G.buffer,batchIds:M.buffer,packedBuffer:ke.buffer}})});