import"./modulepreload-polyfill-B5Qt9EMX.js";import{W as u,S as f,P as M,g as P,C as H,O as S,A as W,a as b,b as L,c as x,M as y,D as C,d as s,e as z,f as O}from"./OrbitControls-hkLXg3m7.js";const A=document.querySelector("#app"),e=new u({antialias:!0});e.setPixelRatio(window.devicePixelRatio);e.setSize(window.innerWidth,window.innerHeight);A.appendChild(e.domElement);e.autoClear=!1;const t=new f,a=window.innerWidth/window.innerHeight,r=new M(50,.5*a,1,1e4);r.position.set(500,500,2e3);r.lookAt(0,0,0);const i=500,n=new P(.5*i*a/-2,.5*i*a/2,i/2,i/-2,0,3e3);n.position.set(0,500,0);const h=new H(n);t.add(n,h);const G=new S(n,e.domElement),R=new W(16777215,1);t.add(R);const d=new b("blue",10,500);d.position.set(0,100,0);t.add(d);const j=new L(d,10);t.add(j);const v=new x(1e4,1e4),E=new y({color:"#333",side:C}),w=new s(v,E);w.position.y=-.01;w.rotation.x=-Math.PI*.5;t.add(w);const l=new z(5,128,128),m=new O;for(let o=0;o<30;o++){const p=new s(l,m);p.position.z=-o*100,t.add(p)}const c=new s(l,m);c.position.y=100;c.scale.setScalar(5);t.add(c);function q(){const o=window.innerWidth/window.innerHeight;e.setSize(window.innerWidth,window.innerHeight),r.aspect=.5*o,r.updateProjectionMatrix(),n.left=-.5*i*o/2,n.right=.5*i*o/2,n.top=i/2,n.bottom=-i/2,n.updateProjectionMatrix()}window.addEventListener("resize",q);function g(){requestAnimationFrame(g),D(),G.update()}function D(){n.updateProjectionMatrix(),h.update(),e.clear(),e.setViewport(0,0,window.innerWidth/2,window.innerHeight),e.render(t,n),e.setViewport(window.innerWidth/2,0,window.innerWidth/2,window.innerHeight),e.render(t,r)}g();
