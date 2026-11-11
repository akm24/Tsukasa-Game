/* ───────── prop sprites ───────── */
const S={};
const lampGlow=(g,cx,cy,rx,ry)=>{ell(g,cx,cy,rx,ry,'#f6e3b4');ell(g,cx,cy,rx-1,ry-1,'#fff3cf');ell(g,cx,cy,Math.max(1,rx-3),Math.max(1,ry-3),'#fffbe8');for(let y=-ry+2;y<ry;y+=3)R(g,cx-rx+1,cy+y,rx*2-1,1,'rgba(190,150,80,.28)')};
const garment=(g,x,y,c,n)=>{R(g,x+3,y-2,1,2,'#3a2c22');R(g,x+1,y,6,1,c);R(g,x,y+1,8,n,c);R(g,x,y+1,1,n,sh(c,-.22));R(g,x+7,y+1,1,n,sh(c,-.22));R(g,x+4,y+2,1,n-2,sh(c,.14))};
function buildSprites(){
  S.cactus=spr(26,48,g=>{R(g,4,32,18,7,'#c9c3b7');R(g,6,33,14,5,'#3c2f24');R(g,4,39,18,9,'#b0aa9d');R(g,4,39,18,1,'#8f897c');R(g,4,32,18,1,'#e1dccf');
    [[7,10,4,24,'#5f7f4f'],[12,1,5,33,'#6b8c58'],[18,15,4,19,'#5a784b']].forEach(q=>{R(g,q[0],q[1]+1,q[2],q[3]-1,q[4]);R(g,q[0]+1,q[1],q[2]-2,1,q[4]);R(g,q[0],q[1]+1,1,q[3]-1,sh(q[4],-.2));R(g,q[0]+q[2]-2,q[1]+2,1,q[3]-3,sh(q[4],.18));for(let y=q[1]+3;y<q[1]+q[3];y+=4)R(g,q[0]+1,y,1,1,'#dfe6c4')});R(g,13,0,2,1,'#e9a0a8')});
  S.olive=spr(28,48,g=>{R(g,5,32,18,7,'#c9c3b7');R(g,7,33,14,5,'#3c2f24');R(g,5,39,18,9,'#b0aa9d');R(g,5,39,18,1,'#8f897c');R(g,5,32,18,1,'#e1dccf');L(g,13,34,14,18,'#6b5a45',2);L(g,14,24,9,16,'#6b5a45');L(g,14,22,20,15,'#6b5a45');
    fol(g,14,11,12,9,'#8a9a72','#aab892','#6c7c58',3);fol(g,7,16,5,4,'#8a9a72','#aab892','#6c7c58',4);fol(g,21,15,5,4,'#8a9a72','#aab892','#6c7c58',5)});
  S.palm=spr(48,78,g=>{for(let y=77;y>=20;y--){const x=22+Math.round(Math.sin(y/14)*1.6);R(g,x,y,4,1,y%4<2?'#8a6f52':'#7a6046');R(g,x,y,1,1,'#5f4a38')}
    const cs=['#4a6634','#5b7a3f','#6f8f4c'];[-2.9,-2.3,-1.75,-1.3,-.8,-.25,.25,3.4,2.9].forEach((a,i)=>{for(let t=0;t<=1;t+=.04){const x=24+Math.cos(a)*22*t,y=20+Math.sin(a)*14*t+t*t*9;R(g,x-1,y,3,2,cs[i%3]);if(t>.3)R(g,x-1,y+2,1,2,cs[(i+1)%3])}});ell(g,24,20,3,2,'#5b4a35');R(g,22,22,2,2,'#6b4a30');R(g,26,22,2,2,'#6b4a30')});
  S.jac=spr(64,80,g=>{L(g,31,79,31,44,'#4a3a30',4);L(g,32,50,22,34,'#4a3a30',3);L(g,33,48,44,32,'#4a3a30',3);R(g,31,60,1,19,'#352a23');
    const p=['#8f7ac8','#b3a2e0','#6c59a8'];fol(g,32,24,24,16,p[0],p[1],p[2],1);fol(g,15,30,13,10,p[0],p[1],p[2],2);fol(g,49,30,13,10,p[0],p[1],p[2],3);fol(g,32,11,16,10,p[0],p[1],p[2],4);for(let i=0;i<10;i++)R(g,8+i*5,36+(i*7)%6,2,2,'#5d7a45')});
  S.agave=spr(30,22,g=>{const cs=['#5f8070','#7d9e8e','#93b3a2'];[[-12,-4],[12,-4],[-13,-10],[13,-10],[-8,-15],[8,-15],[-3,-18],[3,-18],[0,-19],[-10,1],[10,1]].forEach((d,i)=>{L(g,14,18,14+d[0],18+d[1],cs[i%3],3);L(g,14,18,14+d[0],18+d[1],cs[(i+1)%3],1)});R(g,12,16,5,4,'#6c8c7c')});
  S.stop=spr(18,42,g=>{R(g,8,13,2,29,'#9a9a98');R(g,8,13,1,29,'#77777a');R(g,5,0,8,13,'#b9352b');R(g,3,2,12,9,'#b9352b');R(g,4,1,10,11,'#b9352b');R(g,4,1,10,1,'#f0ece2');R(g,4,11,10,1,'#f0ece2');txt(g,'STOP',2,4,'#f6f1e4')});
  S.stsign=spr(52,42,g=>{R(g,25,9,2,33,'#9a9a98');R(g,25,9,1,33,'#77777a');R(g,0,0,52,9,'#2f5d8a');R(g,0,0,52,1,'#f0ece2');R(g,0,8,52,1,'#f0ece2');txt(g,'ABBOT KINNEY',2,2,'#f6f1e4')});
  S.csign=spr(36,42,g=>{const cr='#efe6cf';R(g,17,13,2,29,'#3a3632');R(g,17,13,1,29,'#55504a');R(g,0,0,36,14,C.wal);R(g,1,1,34,12,C.char);R(g,1,1,34,1,'#4a433c');
    R(g,3,7,7,1,cr);R(g,4,6,1,3,cr);R(g,5,5,1,5,cr);R(g,3,7,1,1,cr);txt(g,'CAFE',14,5,cr);R(g,27,3,2,1,cr);R(g,1,12,34,1,C.red)});
  S.pole=spr(26,74,g=>{R(g,11,4,4,70,'#6b5644');R(g,11,4,1,70,'#57463a');R(g,14,4,1,70,'#7d6652');R(g,1,8,24,3,'#5a4838');R(g,4,14,18,2,'#5a4838');[2,8,16,22].forEach(x=>R(g,x,5,2,3,'#b9c1c4'));R(g,16,20,7,11,'#8d8f90');R(g,16,20,7,2,'#a9abac');R(g,10,44,6,8,'#e6dcc4');R(g,11,46,4,1,'#b13a2c');R(g,12,54,5,5,'#cfe0e2')});
  S.dump=spr(18,34,g=>{R(g,0,0,18,20,'#44624f');R(g,0,0,18,1,'#5d7d68');R(g,0,10,18,1,'#2f4739');R(g,3,3,5,2,'#5d7d68');R(g,0,20,18,12,'#35503f');for(let x=3;x<18;x+=5)R(g,x,21,1,10,'#2a4033');R(g,6,24,7,4,'#e6dcc4');R(g,1,32,4,2,'#1a1a1a');R(g,13,32,4,2,'#1a1a1a');R(g,10,-0,7,2,'#b98a5a')});
  S.car=(col,trim)=>spr(48,26,g=>{const d=sh(col,-.25),l=sh(col,.2);R(g,2,24,44,2,'rgba(0,0,0,.3)');R(g,1,7,46,5,col);R(g,0,9,48,3,col);R(g,1,12,46,9,d);R(g,0,12,48,6,d);R(g,13,0,22,7,l);R(g,11,5,26,4,'#2b3640');R(g,13,5,10,3,'#5d7684');R(g,25,5,10,3,'#5d7684');R(g,23,5,2,4,col);R(g,1,7,10,1,l);R(g,37,7,10,1,l);
    R(g,0,13,2,3,trim?'#c9544a':'#f6e7a6');R(g,46,13,2,3,trim?'#f6e7a6':'#c9544a');R(g,5,17,9,7,'#1c1c1e');R(g,34,17,9,7,'#1c1c1e');R(g,8,19,3,3,'#8d8f90');R(g,37,19,3,3,'#8d8f90');R(g,15,20,18,1,'#1c1c1e');R(g,22,14,3,1,sh(col,-.45))});
  S.carV=col=>spr(24,48,g=>{const d=sh(col,-.25),l=sh(col,.2);R(g,1,2,22,38,col);R(g,2,0,20,2,col);R(g,0,6,1,8,'#1c1c1e');R(g,23,6,1,8,'#1c1c1e');R(g,0,28,1,8,'#1c1c1e');R(g,23,28,1,8,'#1c1c1e');R(g,3,9,18,6,'#2b3640');R(g,4,10,16,4,'#5d7684');R(g,3,15,18,13,l);R(g,3,28,18,4,'#2b3640');R(g,4,29,16,2,'#4a5f6b');R(g,1,40,22,7,d);R(g,2,42,4,2,'#c9544a');R(g,18,42,4,2,'#c9544a');R(g,9,43,6,2,'#f0ece2');R(g,1,46,22,2,'#1c1c1e');R(g,8,3,8,1,'#f6f1e4')});
  S.benchOut=spr(30,15,g=>{R(g,0,0,30,8,C.cedar);for(let y=2;y<8;y+=3)R(g,0,y,30,1,'#9b7146');R(g,0,0,30,1,'#d3a674');R(g,0,8,30,2,'#8a6240');R(g,2,10,3,5,C.char);R(g,25,10,3,5,C.char)});
  S.stool=spr(12,14,g=>{ell(g,6,3,5,3,C.walL);ell(g,6,3,3,1,'#a67a52');R(g,1,4,11,2,C.wal);R(g,2,6,1,8,C.walD);R(g,9,6,1,8,C.walD);R(g,5,6,1,7,C.walD)});
  S.aframe=spr(14,22,g=>{R(g,1,0,12,18,C.char);R(g,1,0,12,1,'#4a433c');bmp(g,K_CHA,2.5|0,2,'#efe6cf');R(g,3,14,8,1,C.red);R(g,1,18,2,4,'#3a2c22');R(g,11,18,2,4,'#3a2c22')});
  S.bins=spr(30,24,g=>{box(g,1,5,12,5,13,'#6b7a82','#4f5c63');R(g,1,23,12,1,'#222');box(g,16,2,13,5,15,'#4a7797','#365a74');R(g,19,12,6,4,'#e6dcc4');R(g,16,22,13,2,'#222')});
  S.crates=spr(30,26,g=>{box(g,0,10,16,6,10,'#b98a5a','#96704a');for(let x=3;x<16;x+=4)R(g,x,17,1,9,'#7d5c3c');box(g,14,4,16,6,16,'#c49666','#a27a50');R(g,14,16,16,1,'#7d5c3c');txt(g,'KYOTO',15,19,'#5a3f28',.75|0||1,0);box(g,2,0,12,5,6,'#c9a070','#a8805a')});
  S.lumber=spr(16,48,g=>{R(g,0,0,16,40,'#c49666');for(let x=3;x<16;x+=4)R(g,x,0,1,40,'#a27a50');R(g,0,0,16,1,'#dab686');R(g,0,40,16,8,'#96704a');for(let y=42;y<48;y+=2)R(g,0,y,16,1,'#7d5c3c');R(g,0,12,16,2,'#3a6ea5');R(g,0,28,16,2,'#3a6ea5')});
  /* shop */
  S.sofa=spr(46,30,g=>{const c=C.cog,d=sh(c,-.22),l=sh(c,.16);R(g,0,2,46,6,l);R(g,0,8,46,9,c);R(g,0,2,46,1,sh(c,.3));R(g,5,17,36,7,l);R(g,5,17,36,1,sh(c,.28));R(g,22,17,1,7,d);R(g,0,10,5,16,c);R(g,41,10,5,16,c);R(g,0,10,5,2,l);R(g,41,10,5,2,l);R(g,5,24,36,4,d);R(g,15,8,1,9,d);R(g,30,8,1,9,d);R(g,2,28,3,2,C.char);R(g,41,28,3,2,C.char);R(g,9,11,2,1,d);R(g,24,12,2,1,d);R(g,36,10,2,1,d);R(g,8,14,7,5,'#e6dcc4');R(g,8,14,7,1,'#f6f1e4')});
  S.ctable=spr(30,17,g=>{box(g,0,0,30,11,4,C.charL,C.char);for(let x=2;x<30;x+=3)R(g,x,1,1,10,'#332e2a');R(g,2,15,3,2,'#1a1816');R(g,25,15,3,2,'#1a1816');R(g,4,3,9,6,'#e6dcc4');R(g,4,3,9,1,'#b13a2c');R(g,5,5,6,1,'#9a9484');ell(g,21,5,3,2,'#a9bfae');ell(g,21,5,2,1,'#5a7a4a')});
  S.console=spr(30,26,g=>{box(g,0,0,30,10,12,C.walL,C.wal);R(g,2,2,12,7,'#23211b');ell(g,7,5,4,3,'#111');ell(g,7,5,1,1,C.red);L(g,12,3,9,5,'#c9c3b7');R(g,17,3,10,5,'#3a3632');R(g,18,4,2,2,C.brass);R(g,22,4,4,1,'#e0a23a');R(g,15,11,1,10,C.walD);R(g,2,13,11,7,'#3a2c22');[C.red,'#e6dcc4',C.ind2,'#d9a23a','#66734f','#e6dcc4',C.ink,'#8f7ac8','#c9544a'].forEach((c,i)=>R(g,3+i,13,1,7,c));R(g,18,13,10,7,C.walD);R(g,22,16,2,1,C.brass);R(g,2,22,2,4,C.char);R(g,26,22,2,4,C.char)});
  S.fig=spr(26,46,g=>{R(g,8,36,10,9,'#e3dccb');R(g,8,36,10,1,'#f6f1e4');R(g,9,44,8,2,'#bdb5a2');R(g,9,37,8,2,'#3c2f24');L(g,13,37,13,12,'#5a4636',2);
    [[13,6],[6,11],[19,10],[9,19],[18,19],[13,14],[5,24],[20,26],[12,26]].forEach((p,i)=>{ell(g,p[0],p[1],4,5,i%2?'#3f6a3a':'#4d7c45');R(g,p[0],p[1]-4,1,9,'#6f9c5c');R(g,p[0]-2,p[1]-1,2,1,'#6f9c5c')})});
  S.mirror=spr(14,36,g=>{R(g,0,0,14,33,C.wal);R(g,0,0,14,1,C.walL);R(g,2,2,10,29,'#cfdfe0');R(g,2,2,10,10,'#e3eeee');R(g,2,22,10,9,'#b6c9c8');L(g,4,12,9,4,'#fff');L(g,5,20,10,12,'#f2f8f8');R(g,1,33,2,3,C.walD);R(g,11,33,2,3,C.walD)});
  S.bonsai=spr(34,52,g=>{box(g,5,28,24,10,13,'#d9d4c9','#b9b3a6');R(g,5,50,24,1,'#9a9488');R(g,9,29,16,5,'#2f3b33');R(g,9,29,16,1,'#44554a');R(g,10,30,14,2,'#5c6b3d');
    L(g,17,30,15,22,'#6a4a34',3);L(g,15,22,20,15,'#6a4a34',2);L(g,16,24,9,19,'#6a4a34',2);L(g,20,15,17,9,'#6a4a34');R(g,16,26,1,3,'#e6dcc4');
    fol(g,8,17,7,4,'#4f7245','#6f9460','#35522f',1);fol(g,22,13,8,4,'#4f7245','#6f9460','#35522f',2);fol(g,16,6,7,4,'#4f7245','#6f9460','#35522f',3);fol(g,27,21,5,3,'#4f7245','#6f9460','#35522f',4)});
  S.ftable=spr(64,38,g=>{R(g,6,26,11,10,C.char);R(g,47,26,11,10,C.char);R(g,6,26,11,1,'#4a433c');R(g,47,26,11,1,'#4a433c');for(let x=8;x<17;x+=3){R(g,x,27,1,9,'#1d1a17');R(g,x+41,27,1,9,'#1d1a17')}
    R(g,0,10,64,13,C.walL);R(g,1,9,62,1,C.walL);R(g,0,10,64,1,'#a67a52');for(let i=0;i<9;i++)R(g,3+i*7,12+(i*5)%9,9,1,'#7d5738');R(g,0,23,64,3,C.walD);R(g,2,26,60,1,'rgba(0,0,0,.25)');
    [[4,C.ind],[13,C.ind2],[22,'#22304d']].forEach((d,i)=>{const h=5-i;R(g,d[0],16-h,8,h+5,d[1]);for(let y=16-h+2;y<21;y+=2)R(g,d[0],y,8,1,sh(d[1],-.25));R(g,d[0]+7,16-h,1,h+5,'#e6dcc4');R(g,d[0],16-h,8,1,sh(d[1],.2))});
    [[34,'#e6dcc4'],[39,'#a9bfae'],[44,'#5a4636']].forEach(q=>{R(g,q[0],14,4,5,q[1]);R(g,q[0],14,4,1,sh(q[1],.3));R(g,q[0]+1,15,2,1,'#3a3027')});
    R(g,53,10,5,8,'#2f3b33');R(g,54,8,3,2,'#2f3b33');R(g,53,10,1,8,'#44554a');L(g,55,8,58,0,'#5a4030');L(g,57,3,61,2,'#5a4030');L(g,56,5,52,1,'#5a4030');[[58,0],[61,1],[52,0],[60,4]].forEach(p=>R(g,p[0],p[1],2,2,'#e9a0a8'))});
  S.knife=spr(30,30,g=>{box(g,0,6,30,10,14,'#efe6cf',C.wal);R(g,0,28,30,2,C.char);R(g,1,18,28,1,C.walL);
    [[3,8],[10,10],[17,8],[22,12]].forEach((k,i)=>{R(g,k[0],k[1],7,2,'#dfe4e6');R(g,k[0],k[1],7,1,'#fff');R(g,k[0]+1,k[1]+2,5,1,'#b9c1c4');R(g,k[0]+7,k[1],4-(i%2),2,i%2?'#3a2c22':'#8a6240')});
    g.fillStyle='rgba(200,228,232,.34)';g.fillRect(0,0,30,16);R(g,0,0,30,1,'rgba(255,255,255,.8)');R(g,0,0,1,16,'rgba(255,255,255,.6)');R(g,29,0,1,16,'rgba(255,255,255,.6)');R(g,0,6,30,1,'rgba(255,255,255,.5)');L(g,4,5,8,1,'rgba(255,255,255,.7)');L(g,20,14,25,8,'rgba(255,255,255,.5)')});
  S.ceram=spr(30,38,g=>{R(g,0,0,30,38,C.wal);R(g,0,0,30,2,C.walL);R(g,2,2,26,34,'#4a3320');[12,24,36].forEach(y=>{R(g,1,y-1,28,2,C.walL);R(g,1,y+1,28,1,C.walD)});R(g,2,2,26,1,'#f3cd86');
    const it=[[4,5,'#e6dcc4',5,6],[11,6,'#a9bfae',6,5],[19,4,'#3a2c22',4,7],[24,7,'#d9b9a8',4,4],[3,17,'#5a4636',6,6],[11,18,'#f0ece2',4,5],[17,16,'#2c3a5a',5,7],[23,19,'#c9a57c',5,4],[4,29,'#f0ece2',7,6],[13,30,'#8a9a72',5,5],[20,28,'#e6dcc4',4,7],[25,31,'#3d4f78',3,4]];
    it.forEach(q=>{R(g,q[0],q[1],q[3],q[4],q[2]);R(g,q[0],q[1],q[3],1,sh(q[2],.3));R(g,q[0]+q[3]-1,q[1]+1,1,q[4]-1,sh(q[2],-.2))})});
  S.lamps=spr(30,40,g=>{box(g,0,22,30,9,9,'#c99a6a',C.cedar);for(let x=4;x<30;x+=6)R(g,x,32,1,8,'#9b7146');lampGlow(g,7,15,5,6);R(g,6,21,3,2,C.walD);lampGlow(g,17,10,4,10);R(g,16,20,3,3,C.walD);lampGlow(g,25,18,3,4);R(g,24,22,3,1,C.walD)});
  S.setta=spr(14,36,g=>{R(g,0,0,14,30,C.cedar);R(g,0,0,14,1,'#d3a674');for(let y=7;y<30;y+=7)R(g,0,y,14,1,'#9b7146');R(g,0,30,14,6,'#96704a');R(g,0,30,14,1,'#7d5c3c');
    [[1,C.red],[8,C.ind],[15,'#23211b'],[22,'#66734f']].forEach(s=>{[2,8].forEach(x=>{R(g,x,s[0]+1,4,5,'#d9c38f');R(g,x,s[0]+1,4,1,'#e9d9a8');R(g,x+1,s[0]+2,1,2,s[1]);R(g,x+2,s[0]+2,1,2,s[1]);R(g,x,s[0]+4,1,1,s[1]);R(g,x+3,s[0]+4,1,1,s[1])})})});
  S.rail=(w,cols)=>spr(w,34,g=>{R(g,1,2,1,30,'#3a3632');R(g,w-2,2,1,30,'#3a3632');R(g,0,3,w,1,'#55504a');R(g,0,32,4,2,'#3a3632');R(g,w-4,32,4,2,'#3a3632');cols.forEach((c,i)=>garment(g,4+i*9,6,c,14+(i*5)%5))});
  S.wdisp=spr(46,30,g=>{box(g,0,18,46,8,4,'#efe9dd','#d1cabb');R(g,8,6,6,12,'#2a2622');R(g,9,4,4,2,'#2a2622');R(g,8,6,1,12,'#4a433c');L(g,11,4,17,-0,'#5a4030');L(g,13,2,8,0,'#5a4030');R(g,17,0,2,2,'#c9544a');R(g,7,0,2,2,'#e9a0a8');lampGlow(g,28,10,6,8);R(g,26,18,5,2,C.walD);R(g,38,14,5,5,'#a9bfae');R(g,38,14,5,1,'#c5d6c9')});
  S.till=spr(30,28,g=>{box(g,0,2,30,10,16,C.walL,C.wal);R(g,0,14,30,1,'#a67a52');for(let x=7;x<30;x+=8)R(g,x,13,1,15,C.walD);R(g,3,3,8,6,'#23211b');R(g,4,4,6,4,'#8fb3c4');R(g,6,-0,2,3,'#3a3632');ell(g,19,5,3,3,'#c9a070');ell(g,19,5,1,1,'#7d5c3c');R(g,22,3,6,5,'#d9bf94');R(g,24,9,4,2,'#e6dcc4');R(g,14,8,3,1,C.red)});
  S.dtable=spr(30,22,g=>{box(g,0,6,30,10,4,C.walL,C.wal);R(g,2,20,3,2,C.walD);R(g,25,20,3,2,C.walD);
    [[2,C.ind,7],[11,'#22304d',5],[20,C.ind2,8]].forEach(d=>{R(g,d[0],14-d[2],8,d[2],d[1]);for(let y=14-d[2]+2;y<14;y+=2)R(g,d[0],y,8,1,sh(d[1],-.28));R(g,d[0],14-d[2],8,1,sh(d[1],.22));R(g,d[0]+7,14-d[2],1,d[2],'#e6dcc4');R(g,d[0]+7,14-d[2]+1,1,1,C.red)})});
  S.counter=spr(112,34,g=>{const Y=4;R(g,0,Y,112,10,C.walL);R(g,0,Y,112,1,'#a67a52');for(let i=0;i<14;i++)R(g,3+i*8,Y+2+(i*5)%6,7,1,'#7d5738');
    R(g,0,Y+10,112,13,C.wal);R(g,0,Y+10,112,1,C.walD);for(let x=16;x<112;x+=16)R(g,x,Y+11,1,11,C.walD);R(g,0,Y+14,112,1,C.brass);R(g,0,Y+22,112,4,C.char);R(g,0,Y+22,112,1,'#4a433c');
    R(g,6,Y-1,14,7,'#c9a070');R(g,6,Y-1,14,1,'#dab686');R(g,6,Y+2,14,1,'#a8805a');R(g,8,Y-3,10,2,'#c9a070');
    R(g,30,Y-4,14,9,'#23211b');R(g,31,Y-3,12,6,'#8fb3c4');R(g,32,Y-2,6,1,'#e6f1f6');R(g,36,Y+5,2,2,'#3a3632');
    R(g,48,Y+1,5,6,'#2a2c30');R(g,49,Y+2,3,2,'#9fc3d6');
    R(g,60,Y,24,6,'#c9a070');R(g,60,Y,24,1,'#dab686');R(g,60,Y,2,6,'#8a6240');R(g,82,Y,2,6,'#8a6240');ell(g,91,Y+3,3,2,'#e6dcc4');ell(g,91,Y+3,1,1,C.red);
    R(g,101,Y-2,5,8,'#2f3b33');R(g,102,Y-4,3,2,'#2f3b33');L(g,103,Y-4,107,-3,'#5a4030');L(g,104,Y-3,99,-3,'#5a4030');R(g,106,-3,2,2,'#e9a0a8');R(g,98,-3,2,2,'#e9a0a8')});
  S.flamp=spr(12,36,g=>{R(g,5,12,2,22,'#3a3632');R(g,2,33,8,3,'#3a3632');R(g,2,33,8,1,'#55504a');lampGlow(g,6,7,5,7)});
  /* café + seating */
  S.bar=spr(96,58,g=>{const oak=C.oak,cc='#c4bdb0';
    R(g,0,0,16,48,oak);R(g,0,0,16,1,'#e8d6b4');R(g,15,0,1,34,'#b99f76');
    R(g,0,32,96,12,oak);R(g,16,32,80,1,'#e8d6b4');for(let i=0;i<8;i++)R(g,6+i*11,35+(i*3)%7,8,1,'#c4ab82');
    R(g,0,44,96,14,cc);R(g,0,44,96,1,'#a69f92');for(let y=48;y<58;y+=4)R(g,0,y,96,1,'#b6afa2');for(let x=11;x<96;x+=17)R(g,x,45,1,13,'#b6afa2');R(g,0,57,96,1,'#8f897c');
    ell(g,8,10,5,4,'rgba(210,235,238,.75)');R(g,3,12,11,3,'#e6dcc4');R(g,6,9,4,3,'#c99a5e');R(g,3,14,11,1,'#a69f92');R(g,5,22,6,5,'#e6dcc4');R(g,6,23,4,3,'#6f8f4a');
    R(g,24,35,7,5,'#23211b');R(g,25,36,5,3,'#8fb3c4');R(g,40,34,3,6,'#e6dcc4');R(g,44,35,3,5,'#e6dcc4');R(g,40,34,7,1,'#fff');
    R(g,58,33,5,7,'#a9bfae');R(g,58,33,5,1,'#c5d6c9');R(g,59,34,3,1,'#5a7a4a');R(g,66,36,2,4,'#d9c38f');R(g,65,34,4,2,'#e9d9a8');
    R(g,80,34,8,6,'#cfe0e2');R(g,80,34,8,1,'#fff');R(g,82,36,4,3,'#c9a45c')});
  S.backbar=spr(80,44,g=>{R(g,2,2,76,2,C.walL);R(g,2,4,76,1,C.walD);[[6,'#e6dcc4'],[11,'#e6dcc4'],[16,'#a9bfae'],[24,'#6f8f4a'],[29,'#6f8f4a'],[34,'#5a7a3c'],[44,'#3a2c22'],[50,'#e6dcc4'],[55,'#d9b9a8'],[64,'#2c3a5a'],[69,'#e6dcc4']].forEach(q=>{R(g,q[0],-0,4,3,q[1]);R(g,q[0],0,4,1,sh(q[1],.3))});
    box(g,0,20,80,8,16,C.charL,C.wal);for(let x=16;x<80;x+=16)R(g,x,29,1,15,C.walD);for(let x=7;x<80;x+=16)R(g,x,35,2,1,C.brass);
    R(g,6,8,24,16,'#c4c8ca');R(g,6,8,24,2,'#eef1f2');R(g,6,10,24,3,'#8d9396');R(g,8,5,5,3,'#e6dcc4');R(g,14,5,5,3,'#e6dcc4');R(g,20,5,5,3,'#e6dcc4');R(g,10,17,3,5,'#55595c');R(g,22,17,3,5,'#55595c');R(g,9,22,5,2,'#e6dcc4');R(g,27,12,2,2,C.red);R(g,6,23,24,1,'#6f7578');
    R(g,36,10,7,5,'rgba(120,90,60,.8)');R(g,35,9,9,1,'#23211b');R(g,37,15,5,9,'#23211b');R(g,36,22,7,2,'#3a3632');
    R(g,50,14,8,9,'#2f3b33');R(g,50,14,8,1,'#44554a');R(g,58,16,3,1,'#2f3b33');L(g,52,13,56,10,'#2f3b33');
    R(g,65,17,5,6,'#6f8f4a');R(g,65,17,5,1,'#e6dcc4');R(g,71,15,5,8,'#6f8f4a');R(g,71,15,5,1,'#e6dcc4');R(g,72,18,3,2,'#e6dcc4')});
  S.barV=spr(16,96,g=>{const oak='#e3cfa9';R(g,0,0,16,84,oak);R(g,0,0,16,1,'#f1e3c4');R(g,0,0,1,84,'#c4ab82');R(g,15,0,1,84,'#f1e3c4');for(let i=0;i<9;i++)R(g,3+(i*5)%9,4+i*9,5,1,'#d1bc93');
    R(g,0,84,16,12,'#c4bdb0');R(g,0,84,16,1,'#a69f92');for(let y=88;y<96;y+=4)R(g,0,y,16,1,'#b6afa2');R(g,0,95,16,1,'#8f897c');
    ell(g,8,9,5,4,'rgba(210,235,238,.75)');R(g,3,11,11,3,'#e6dcc4');R(g,5,8,6,3,'#c99a5e');R(g,3,13,11,1,'#a69f92');
    R(g,3,24,10,8,'#23211b');R(g,4,25,8,6,'#8fb3c4');R(g,5,26,3,1,'#e6f1f6');R(g,12,27,2,2,'#3a3632');
    ell(g,8,44,4,3,'#e6dcc4');ell(g,8,44,3,2,'#6f8f4a');R(g,12,40,1,6,'#d9c38f');R(g,11,46,3,1,'#d9c38f');
    R(g,3,56,4,6,'#e6dcc4');R(g,8,56,4,6,'#e6dcc4');R(g,3,56,9,1,'#fff');R(g,4,64,3,4,'#a9bfae');R(g,4,64,3,1,'#c5d6c9');
    R(g,9,72,4,7,'#cfe0e2');R(g,9,72,4,1,'#fff');R(g,10,75,2,3,'#c9a45c')});
  S.backbarV=spr(16,96,g=>{R(g,0,0,16,84,C.walL);R(g,0,0,16,1,'#a67a52');R(g,0,0,1,84,C.walD);for(let y=16;y<84;y+=16)R(g,0,y,16,1,C.walD);R(g,0,84,16,12,C.wal);R(g,0,84,16,1,C.walD);R(g,7,88,2,1,C.brass);
    R(g,1,3,14,16,'#c4c8ca');R(g,1,3,14,2,'#eef1f2');R(g,1,5,14,2,'#8d9396');R(g,3,9,3,4,'#55595c');R(g,3,13,4,2,'#e6dcc4');R(g,9,9,3,4,'#55595c');R(g,9,13,4,2,'#e6dcc4');R(g,12,4,2,1,C.red);
    R(g,4,24,7,5,'rgba(120,90,60,.8)');R(g,3,23,9,1,'#23211b');R(g,5,29,5,8,'#23211b');R(g,4,36,7,2,'#3a3632');
    [[2,44],[8,44],[2,52],[8,52],[2,60],[8,60]].forEach(q=>{R(g,q[0],q[1],5,6,'#6f8f4a');R(g,q[0],q[1],5,1,'#8aa860');R(g,q[0],q[1]+2,5,2,'#e6dcc4')});
    ell(g,8,74,5,4,'#2b2d2f');ell(g,7,73,3,2,'#44474a');R(g,6,69,4,2,'#2b2d2f');R(g,13,73,3,2,'#2b2d2f')});
  S.tins=spr(16,30,g=>{box(g,0,6,16,8,16,C.walL,C.wal);R(g,2,16,12,5,'#3a2c22');R(g,2,23,12,5,'#3a2c22');[[3,17],[7,17],[11,17],[3,24],[7,24],[11,24]].forEach(q=>{R(g,q[0],q[1],3,4,'#6f8f4a');R(g,q[0],q[1]+1,3,1,'#e6dcc4')});[[2,3],[7,1],[11,4]].forEach(q=>{R(g,q[0],q[1],4,7,'#5a7a3c');R(g,q[0],q[1],4,1,'#8aa860');R(g,q[0],q[1]+3,4,2,'#e6dcc4')})});
  S.rtable=spr(16,20,g=>{ell(g,8,5,7,4,C.oak);ell(g,8,4,7,4,'#e3cfa9');R(g,7,9,2,9,'#3a3632');R(g,4,18,8,2,'#3a3632');R(g,9,2,3,3,'#f0ece2');R(g,10,3,1,1,'#6f8f4a');ell(g,5,5,2,1,'#d1bc93')});
  S.olivebig=spr(30,54,g=>{R(g,8,42,14,11,'#b8704a');R(g,7,41,16,2,'#c98560');R(g,9,52,12,2,'#96583a');R(g,9,42,12,2,'#3c2f24');L(g,14,43,15,22,'#6b5a45',2);L(g,15,30,8,20,'#6b5a45');L(g,15,28,23,18,'#6b5a45');
    fol(g,15,12,13,10,'#8a9a72','#aab892','#6c7c58',7);fol(g,7,20,6,5,'#8a9a72','#aab892','#6c7c58',8);fol(g,23,19,6,5,'#8a9a72','#aab892','#6c7c58',9)});
  S.comm=spr(64,30,g=>{const o=C.oak;R(g,0,6,64,14,'#e3cfa9');R(g,0,6,64,1,'#f1e3c4');for(let i=0;i<9;i++)R(g,2+i*7,8+(i*5)%10,9,1,'#d1bc93');R(g,0,20,64,3,o);R(g,0,22,64,1,'#b99f76');R(g,3,23,3,7,'#b99f76');R(g,58,23,3,7,'#b99f76');R(g,30,23,3,6,'#a68d66');
    [3,35].forEach(x=>{R(g,x,2,10,7,'#b9bec2');R(g,x,2,10,1,'#dfe3e6');R(g,x+4,5,2,2,'#eef1f2');R(g,x,9,10,1,'#8d9396')});
    [19,51].forEach(x=>{R(g,x,10,10,6,'#2a2c30');R(g,x+1,11,8,4,'#9fc3d6');R(g,x+2,12,5,1,'#e6f1f6');R(g,x,16,10,3,'#b9bec2');R(g,x+1,17,8,1,'#8d9396')});
    R(g,15,9,3,3,'#f0ece2');R(g,16,10,1,1,'#6f8f4a');R(g,46,14,3,3,'#f0ece2');R(g,47,15,1,1,'#5a3f28');R(g,29,10,5,6,'#e6dcc4');R(g,30,12,3,1,'#9a9484')});
  S.two=k=>spr(16,22,g=>{R(g,1,4,14,10,'#e3cfa9');R(g,1,4,14,1,'#f1e3c4');R(g,1,14,14,2,C.oak);R(g,7,16,2,5,'#3a3632');R(g,4,20,8,2,'#3a3632');
    if(k===0){R(g,3,1,9,6,'#b9bec2');R(g,3,1,9,1,'#dfe3e6');R(g,7,3,2,2,'#eef1f2');R(g,11,9,3,3,'#f0ece2')}else{R(g,2,5,2,6,'#2a2c30');R(g,4,6,1,4,'#9fc3d6');R(g,2,10,7,2,'#b9bec2');R(g,10,6,3,3,'#f0ece2');R(g,11,7,1,1,'#6f8f4a')}});
  S.rchair=spr(16,24,g=>{const c='#8f4d2b',d=sh(c,-.22),l=sh(c,.15);R(g,2,0,12,12,c);R(g,2,0,12,1,l);R(g,4,3,8,7,l);R(g,0,8,3,12,c);R(g,13,8,3,12,c);R(g,0,8,3,1,l);R(g,13,8,3,1,l);R(g,3,12,10,5,l);R(g,3,17,10,4,d);R(g,1,20,2,4,C.char);R(g,13,20,2,4,C.char);R(g,7,5,1,1,d)});
  S.books=spr(64,40,g=>{R(g,0,0,64,40,C.wal);R(g,0,0,64,2,C.walL);R(g,2,3,60,35,'#3f2b1c');const r=rng(9),bc=['#b13a2c','#e6dcc4','#2c3a5a','#66734f','#d9a23a','#3a3632','#8a6240','#a9bfae','#efe9dd','#3d4f78','#7c3226'];
    [3,15,27].forEach((y,j)=>{let x=3;while(x<60){const w=2+(r()*2|0),h=8+(r()*3|0);if(r()<.12){x+=5;continue}const c=bc[r()*bc.length|0];R(g,x,y+11-h,w,h,c);R(g,x,y+11-h,1,h,sh(c,.2));if(r()<.4)R(g,x,y+14-h,w,1,'#e6dcc4');x+=w+(r()<.15?2:0)}R(g,1,y+11,62,2,C.walL);R(g,1,y+13,62,1,C.walD)});
    R(g,44,18,6,8,'#a9bfae');R(g,22,31,7,7,'#e6dcc4');R(g,23,32,5,5,'#efe9dd')});
  S.wbench=spr(30,18,g=>{box(g,0,2,30,9,7,'#c99a6a',C.cedar);for(let x=5;x<30;x+=6)R(g,x,12,1,6,'#9b7146');R(g,2,1,11,8,C.ind);R(g,2,1,11,1,C.ind2);R(g,7,5,1,1,'#e6dcc4');R(g,16,1,11,8,'#e6dcc4');R(g,16,1,11,1,'#f6f1e4');R(g,21,5,1,1,C.ind)});
  S.plant=k=>spr(26,44,g=>{R(g,7,33,12,10,k?'#3a3632':'#d9d4c9');R(g,7,33,12,1,k?'#55504a':'#efe9dd');R(g,8,42,10,2,k?'#23211b':'#b9b3a6');R(g,8,34,10,2,'#3c2f24');
    if(k===0){[[13,8,7,6],[6,15,6,5],[20,16,6,5],[11,22,6,5],[17,26,5,4],[6,26,4,4]].forEach((p,i)=>{L(g,13,34,p[0],p[1],'#4a6a3c');ell(g,p[0],p[1],p[2],p[3],i%2?'#3f6f42':'#4d8250');R(g,p[0]-p[2]+1,p[1],p[2]*2-1,1,'#2f5633');R(g,p[0]-2,p[1]-2,2,1,'#73a56e');R(g,p[0]+2,p[1]+2,2,1,'#2f5633')})}
    else{[[-7,-26],[-3,-31],[2,-30],[7,-24],[-9,-17],[9,-15],[0,-22]].forEach((d,i)=>{L(g,13,34,13+d[0],34+d[1],i%2?'#4d7c45':'#3f6a3a',3);L(g,13,34,13+d[0],34+d[1],'#7aa868',1)})}});
  S.shoes=spr(16,15,g=>{box(g,0,0,16,8,6,'#c99a6a',C.cedar);R(g,0,11,16,1,'#9b7146');R(g,2,2,3,5,'#6b4a30');R(g,6,2,3,5,'#6b4a30');R(g,10,1,2,5,'#e6e1d3');R(g,13,1,2,5,'#e6e1d3');R(g,10,1,5,1,C.red);R(g,3,10,4,2,'#3a3632');R(g,9,10,4,2,'#3a3632')});
  S.zstack=spr(14,14,g=>{[[10,C.ind],[7,'#8f3a30'],[4,C.ind2],[1,'#e6dcc4']].forEach(z=>{R(g,0,z[0],14,4,z[1]);R(g,0,z[0],14,1,sh(z[1],.22));R(g,0,z[0]+3,14,1,sh(z[1],-.25))})});
  S.toko=spr(30,44,g=>{R(g,0,32,30,9,'#3a2c22');R(g,0,32,30,1,'#5a4636');R(g,0,41,30,3,'#2a201a');R(g,1,33,28,7,'#4a382b');
    R(g,7,0,12,2,'#3a2c22');R(g,8,2,10,24,'#efe6cf');R(g,8,2,10,3,'#c9b78c');R(g,8,23,10,3,'#c9b78c');R(g,7,26,12,2,'#3a2c22');L(g,11,8,14,12,'#23211b',2);L(g,14,12,11,17,'#23211b',2);R(g,13,19,2,2,'#23211b');R(g,15,7,1,3,'#23211b');R(g,10,21,2,1,C.red);
    R(g,21,29,5,7,'#5f6a5a');R(g,21,29,5,1,'#8a9684');R(g,22,27,3,2,'#5f6a5a');L(g,23,27,26,14,'#5a4030');L(g,25,20,21,15,'#5a4030');[[26,13],[20,14],[27,18],[23,19]].forEach(p=>R(g,p[0],p[1],2,2,'#d2574c'))});
  S.andon=spr(12,26,g=>{R(g,1,0,10,20,'#3a2c22');R(g,2,1,8,18,'#fff3cf');R(g,3,3,6,13,'#fffbe8');R(g,5,1,1,18,'#3a2c22');R(g,2,9,8,1,'#3a2c22');R(g,1,20,2,6,'#3a2c22');R(g,9,20,2,6,'#3a2c22');R(g,0,0,12,1,'#5a4636')});
  S.kettle=spr(16,22,g=>{box(g,1,10,14,6,6,'#5a4636','#3a2c22');R(g,3,11,10,4,'#b9b3a6');R(g,5,12,6,2,'#d9643a');ell(g,8,8,5,4,'#2b2d2f');ell(g,7,7,3,2,'#44474a');R(g,6,3,4,2,'#2b2d2f');R(g,7,2,2,1,'#55595c');R(g,13,6,3,2,'#2b2d2f');L(g,3,6,8,0,'#3a3c3f');L(g,8,0,13,6,'#3a3c3f')});
  /* emotes */
  const EM={'!':[['...#...','...#...','...#...','...#...','.......','...#...'],C.red],'?':[['..###..','.#...#.','....#..','...#...','.......','...#...'],C.ind],'…':[['.......','.......','.......','.......','#..#..#','.......'],C.ink],
    'heart':[['.##.##.','#######','#######','.#####.','..###..','...#...'],C.red],'note':[['...###.','...#.#.','...#...','...#...','.###...','.##....'],C.ink],'tea':[['..#.#..','.#.#...','#######','#######','.#####.','..###..'],'#5a7a3c']};
  S.em={};for(const k in EM)S.em[k]=spr(13,13,g=>{R(g,1,0,11,10,'#fffdf5');R(g,0,1,13,8,'#fffdf5');R(g,5,10,3,1,'#fffdf5');R(g,6,11,1,2,'#fffdf5');bmp(g,EM[k][0],3,2,EM[k][1])});
}

/* ───────── prop placement ───────── */
const props=[],glows=[];
function P(id,tx,ty,tw,td,s,o={}){const p=Object.assign({id,tx,ty,tw,td,s,solid:true},o);p.x=tx*T+Math.round((tw*T-s.width)/2)+(o.ox||0);p.y=(ty+td)*T-s.height+1+(o.oy||0);
  p.ext=(ty+td-1>=24||tx>=29);p.key=(ty+td)*T+(o.kz||0)+(p.ext?100000:0);props.push(p);
  (o.glow||[]).forEach(q=>glows.push({x:p.x+q[0],y:p.y+q[1],r:q[2],a:q[3],ext:p.ext}));return p}
const LOOK={
  cactus:['Cactus planter','Columnar cactus in a concrete planter. Low water, high drama.'],
  olive:['Olive tree','A young olive tree. The leaves flip silver when the wind comes up from the beach.'],
  benchOut:['Storefront bench','A cedar bench under the shop window. Good for waiting on someone who said five minutes.'],
  palm:['Fan palm','A fan palm, far too tall. It was here before any of this.'],
  jac:['Jacaranda','A jacaranda, dropping purple on everything. The sidewalk under it is a little sticky.'],
  agave:['Blue agave','A blue agave the size of a small car.'],
  stop:['Stop sign','A stop sign at the corner, sun-bleached to pink at the edges.'],
  csign:['Café sign','A small sign with an arrow: CAFÉ, down the alley. Big wooden garage door, number 2324.'],
  stsign:['Street sign','ABBOT KINNEY BL. 2300 S.'],
  pole:['Utility pole','A utility pole, stapled with ten years of flyers. Lost cat. Sound bath. Lost cat, found.'],
  dump:['Dumpsters','Flattened boxes with Japanese shipping labels stick out from under the lid.'],
  car1:['Parked wagon','An old wagon with roof racks and a dent the size of a longboard.'],
  car2:['Parked truck','A small pickup. There is sand in the bed and probably always will be.'],
  car3:['Hatchback','A hatchback with a parking ticket and a Dodgers air freshener.'],
  stool:['Stool','A walnut stool with three legs, each a little different.'],
  aframe:['Sandwich board','A sandwich board with 茶 painted on it, and under that: MATCHA. COFFEE. TEA ROOM.'],
  bins:['Bins','Recycling and trash. Pickup is Tuesday.'],
  crates:['Shipping crates','Wooden crates stamped KYOTO and FRAGILE. One is still nailed shut.'],
  lumber:['Stacked lumber','Lumber, strapped and stacked. The shaper next door is building something.'],
  slider:['Café doors','The café doors, slid wide open. Brass numbers on the right one: 2324.'],
  sofa:['Lobby sofa','A cognac leather sofa out of a 1970s Tokyo hotel lobby. The cushions gave up being firm a long time ago.'],
  ctable:['Low table','A low table in charred cedar. The grain stands up under your fingers like corduroy.'],
  console:['Record console','A walnut console. The turntable is playing Haruomi Hosono, quietly, and side A ended a while ago.'],
  fig:['Fiddle-leaf fig','A fiddle-leaf fig, taller than you. Somebody dusts every leaf.'],
  mirror:['Standing mirror','A standing mirror in a walnut frame. You look like someone who shops here.'],
  bonsai:['Juniper bonsai','A juniper on a concrete plinth. The tag says it was started in 1962. It is not for sale.'],
  ftable:['Front table','One long walnut slab on charred blocks. Folded denim, tea cups, a single branch in a vase. Nothing on it is in a hurry.'],
  knife:['Seki knives','Kitchen knives from Seki, in Gifu. Each blade is signed near the heel. The glass is very clean.'],
  ceram:['Ceramics shelf','Cups and bowls from a dozen small kilns. No two glazes match, and you can feel the potter\'s thumb in the foot of each one.'],
  lamps:['Paper lamps','Paper lamps from Mino. Mulberry paper over bamboo ribs. The light comes out the color of weak tea.'],
  setta:['Setta sandals','Setta: woven bamboo on top, leather underneath. They slap softly when you walk. That is the point.'],
  rail:['Menswear rail','Wrap jackets and wide trousers on a steel rail. The tags are handwritten: maker, town, how many were made.'],
  wrail:['Window rail','The window display. Three jackets, changed every Friday.'],
  wdisp:['Window display','A vase, a paper lamp and a lot of empty space. The window is mostly about the empty space.'],
  till:['The till','A walnut desk, a tablet and a roll of kraft paper. Everything leaves here wrapped and tied with string.'],
  dtable:['Selvedge stack','Raw denim, folded cuff-out so the selvedge shows. Stiff enough to stand up without you.'],
  flamp:['Floor lamp','A floor lamp with a paper shade. It is on, even in daylight.'],
  tins:['Matcha tins','Tins of matcha from Uji, stacked by harvest. The newest are still sealed with paper tape.'],
  rtable:['Café table','A small round table. Someone left a perfect ring from a cup.'],
  olivebig:['Potted olive','An olive tree in a clay pot. It leans toward the door like it is expecting someone.'],
  comm:['Communal table','A long white-oak table. The outlets are hidden under the edge, which is why nobody ever leaves.'],
  two:['Two-top','A table for two with one person and one laptop.'],
  rchair:['Reading chair','A leather reading chair, worn pale on the arms. Dangerous after lunch.'],
  books:['Bookshelf','Books on indigo, joinery, tea and Showa-era graphic design. Most are in Japanese. The pictures are enough.'],
  wbench:['Cedar bench','A built-in cedar bench with two cushions. One indigo, one undyed.'],
  plant:['Monstera','A monstera that has outgrown two pots since the shop was drawn up.'],
  shoes:['Shoe shelf','A low shelf for shoes. A pair of loafers and some very tired sneakers.'],
  zstack:['Spare cushions','Floor cushions, stacked square.'],
  toko:['Alcove','The alcove: one ink scroll, one quince branch, nothing else. The scroll says, roughly, "this meeting, once."'],
  andon:['Andon lamp','A paper lamp in a cedar frame. It makes the corner feel later than it is.'],
};
function placeProps(){
  const A=(id,tx,ty,tw,td,s,o)=>{const l=LOOK[(o&&o.lk)||id];return P(id,tx,ty,tw,td,s,Object.assign({name:l&&l[0],look:l&&l[1]},o||{}))};
  // street
  A('cactus',4,24,1,1,S.cactus);A('olive',13,24,1,1,S.olive);A('olive',18,24,1,1,S.olive);A('cactus',27,24,1,1,S.cactus);A('benchOut',8,24,2,1,S.benchOut);
  A('car1',5,27,3,2,S.car('#8a9a8c',0),{oy:-3});A('car2',21,27,3,2,S.car('#b9643a',1),{oy:-3});A('car3',32,16,1,3,S.carV('#d9d4c9'),{ox:3});
  [3,10,21,28].forEach(x=>A('palm',x,33,1,1,S.palm,{tall:1}));A('palm',38,10,1,1,S.palm,{tall:1});A('palm',38,22,1,1,S.palm,{tall:1});A('palm',31,18,1,1,S.palm,{tall:1});
  A('jac',31,1,1,1,S.jac,{tall:1});A('agave',31,3,1,1,S.agave,{ox:-3});A('csign',31,5,1,1,S.csign,{ox:-6});A('stop',31,23,1,1,S.stop);A('stsign',31,26,1,1,S.stsign,{ox:8});
  // alley
  A('olive',17,3,1,1,S.olive);A('aframe',19,3,1,1,S.aframe);A('stool',26,3,1,1,S.stool,{oy:-2});A('stool',27,3,1,1,S.stool,{oy:-2});
  A('bins',6,1,2,1,S.bins);A('crates',11,1,2,1,S.crates);A('lumber',2,1,1,3,S.lumber);
  // shop: lounge
  A('console',5,16,2,1,S.console);A('fig',7,16,1,1,S.fig);A('sofa',5,18,3,1,S.sofa);A('ctable',6,20,2,1,S.ctable,{oy:-2});A('flamp',4,18,1,1,S.flamp,{glow:[[7,8,34,.3]]});A('mirror',10,16,1,1,S.mirror);
  A('wrail',7,22,3,1,S.rail(46,[C.ind,'#efe6cf','#66734f','#2a2a2e']),{lk:'wrail'});
  // shop: centre
  A('dtable',12,16,2,1,S.dtable);A('bonsai',15,16,2,1,S.bonsai);A('ftable',14,19,4,1,S.ftable);
  // shop: checkout counter (back right) and objects (front right)
  P('counter',21,13,7,1,S.counter,{through:'ash',name:'Counter'});
  A('ceram',26,16,2,1,S.ceram,{stamp:'土'});A('knife',22,17,2,1,S.knife,{stamp:'刃'});A('rail',20,16,2,1,S.rail(30,['#2a2a2e','#66734f','#e3d9bf']),{lk:'rail'});
  A('lamps',26,19,2,1,S.lamps,{stamp:'灯',glow:[[8,16,30,.34],[18,11,34,.34],[26,19,22,.3]]});A('setta',27,21,1,2,S.setta);A('wdisp',19,22,3,1,S.wdisp,{glow:[[29,11,30,.3]]});
  // café
  A('tins',19,5,1,1,S.tins);
  P('bar',25,4,1,5,mk(1,1),{through:'sora',name:'Bar',inv:1});P('backbar',27,5,1,4,mk(1,1),{name:'Back bar',look:'The back bar: espresso machine, grinder, a row of matcha tins and an iron kettle that never quite cools down.',inv:1});
  A('rtable',19,10,1,1,S.rtable);A('stool',18,10,1,1,S.stool,{oy:-2});A('stool',20,10,1,1,S.stool,{oy:-2});A('rtable',23,10,1,1,S.rtable);A('stool',22,10,1,1,S.stool,{oy:-2});A('stool',24,10,1,1,S.stool,{oy:-2});
  A('olivebig',18,11,1,1,S.olivebig);A('plant',4,14,1,1,S.plant(1),{lk:'plant'});A('flamp',4,10,1,1,S.flamp,{glow:[[7,8,34,.3]]});A('wbench',5,10,2,1,S.wbench);A('rtable',6,13,1,1,S.rtable);A('stool',5,13,1,1,S.stool,{oy:-2});A('stool',7,13,1,1,S.stool,{oy:-2});
  // seating room
  A('plant',9,5,1,1,S.plant(0));A('books',10,5,4,1,S.books);A('wbench',14,5,2,1,S.wbench);A('rchair',16,5,1,1,S.rchair);A('rchair',17,5,1,1,S.rchair);A('flamp',18,5,1,1,S.flamp,{glow:[[7,8,34,.3]]});
  A('comm',11,10,4,1,S.comm);A('two',17,10,1,1,S.two(0));A('two',15,12,1,1,S.two(1));
  A('shoes',9,9,1,1,S.shoes);A('zstack',8,10,1,1,S.zstack);A('plant',9,13,1,1,S.plant(0));
  // tea room
  A('toko',4,5,2,1,S.toko);A('andon',8,5,1,1,S.andon,{glow:[[7,10,30,.34]]});P('kettle',6,7,1,1,S.kettle,{through:'hana',name:'Kettle',oy:-2});
  // exterior light
  glows.push({x:232,y:356,r:22,a:.3,ext:1},{x:281,y:356,r:22,a:.3,ext:1},{x:152,y:388,r:56,a:.16,ext:1},{x:360,y:388,r:56,a:.16,ext:1},{x:256,y:392,r:36,a:.2,ext:1});
}
