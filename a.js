'use strict';
/* ───────── core ───────── */
const T=16,MW=40,MH=38,VW=480,VH=300,WPX=MW*T,HPX=MH*T,FH=48,WH=28,LOW=6;
const $=s=>document.querySelector(s);
const C={olive:'#5e6a4a',oliveD:'#4c573b',oliveL:'#6f7c58',pl:'#efe9dd',pl2:'#e6e1d3',pl3:'#d1cabb',wal:'#6e4a2e',walL:'#8a6240',walD:'#553722',char:'#2a2622',charL:'#3d3732',conc:'#d3cdc1',concD:'#b7b0a3',wood:'#b08a62',tat:'#d2c286',side:'#cbc4b6',road:'#55575a',ink:'#23211b',ink2:'#2a221c',red:'#b13a2c',ind:'#2c3a5a',ind2:'#3d4f78',cream:'#efe6cf',brass:'#c9a45c',cedar:'#b98a5a',oak:'#d6bf97',leaf:'#4f6b3a',leafL:'#6f8c4d',leafD:'#3a5230',cog:'#a3552c'};
function mk(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function sh(hex,f){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=f<0?0:255,a=Math.abs(f);r=Math.round(r+(t-r)*a);g=Math.round(g+(t-g)*a);b=Math.round(b+(t-b)*a);return'#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}
function R(g,x,y,w,h,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h)}
function L(g,x0,y0,x1,y1,c,th=1){const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))|0||1;g.fillStyle=c;for(let i=0;i<=n;i++)g.fillRect(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),th,th)}
function ell(g,cx,cy,rx,ry,c){g.fillStyle=c;for(let y=-ry;y<=ry;y++){const w=Math.round(rx*Math.sqrt(Math.max(0,1-(y*y)/(ry*ry+.3))));g.fillRect(Math.round(cx-w),Math.round(cy+y),w*2+1,1)}}
function fol(g,cx,cy,rx,ry,base,light,dark,seed=1){ell(g,cx,cy,rx,ry,base);const r=rng(seed*977+cx*31+cy);for(let i=0;i<rx*ry*.55;i++){const a=r()*6.283,d=Math.sqrt(r())*.92,x=cx+Math.cos(a)*d*rx,y=cy+Math.sin(a)*d*ry;R(g,x,y,r()<.5?2:1,1,(x-cx)/rx+(y-cy)/ry<-.1?light:dark)}}
function outline(c,col){const g=c.getContext('2d'),w=c.width,h=c.height,d=g.getImageData(0,0,w,h),a=d.data,o=new Uint8Array(w*h);col=col||[42,34,28];
  for(let i=0;i<w*h;i++)o[i]=a[i*4+3]>20?1:0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if(o[i])continue;if((x>0&&o[i-1])||(x<w-1&&o[i+1])||(y>0&&o[i-w])||(y<h-1&&o[i+w])){a[i*4]=col[0];a[i*4+1]=col[1];a[i*4+2]=col[2];a[i*4+3]=255}}
  g.putImageData(d,0,0)}
function spr(w,h,fn,ol=true){const c=mk(w+2,h+2),g=c.getContext('2d');g.translate(1,1);fn(g,w,h);g.setTransform(1,0,0,1,0,0);if(ol)outline(c);return c}
function box(g,x,y,w,d,h,top,front){R(g,x,y,w,d,top);R(g,x,y+d,w,h,front);R(g,x,y,w,1,sh(top,.2));R(g,x,y+d,w,1,sh(front,-.22))}
const FONT={A:'010101111101101',B:'110101110101110',C:'011100100100011',D:'110101101101110',E:'111100110100111',F:'111100110100100',H:'101101111101101',I:'111010010010111',K:'101101110101101',L:'100100100100111',M:'101111111101101',N:'110101101101101',O:'111101101101111',P:'111101111100100',R:'110101110101101',S:'011100010001110',T:'111010010010010',U:'101101101101111',Y:'101101010010010','0':'111101101101111','2':'110001010100111','3':'110001010001110','4':'101101111001001',' ':'000000000000000'};
function txt(g,s,x,y,col,sc=1,gap=1){g.fillStyle=col;for(const ch of s){const f=FONT[ch]||FONT[' '];for(let i=0;i<15;i++)if(f[i]==='1')g.fillRect(x+(i%3)*sc,y+((i/3)|0)*sc,sc,sc);x+=(3+gap)*sc}}
const K_TSUKASA=['#########','........#','######..#','........#','######..#','#....#..#','#....#..#','######.##','.......#.'];
const K_CHA=['..#...#..','#########','..#...#..','....#....','..##.##..','##.....##','....#....','#########','..#.#.#..','.#..#..#.'];
function bmp(g,rows,x,y,col,sc=1){g.fillStyle=col;rows.forEach((r,j)=>{for(let i=0;i<r.length;i++)if(r[i]==='#')g.fillRect(x+i*sc,y+j*sc,sc,sc)})}

/* ───────── map ───────── */
const DOORX=[15,16],CAFX=[20,21,22,23,24];
const wrow=tx=>Math.floor((165+4*(27-tx))/16);           // tile row the angled wall crosses in column tx
const wallY=x=>163+Math.floor((447-x)/4);                 // wall centre line in world px
function gt(tx,ty){
  if(tx<0||ty<0||tx>=MW||ty>=MH)return'void';
  if(ty>=36)return'hedge';if(ty>=33)return'side';if(ty>=27)return'road';
  if(tx>=32&&tx<=37)return'road';
  if(ty>=24)return'side';
  if(tx>=38)return tx===39?'hedge':'side';
  if(tx>=29)return'side';
  if(ty===0)return'fence';if(ty<=3)return'alley';
  if(tx<=2)return'nbr';
  if(ty===23&&DOORX.includes(tx))return'door';if(ty===4&&CAFX.includes(tx))return'door';if(ty===4&&tx>=25&&tx<=27)return'gar';
  if(tx===3||tx===28||ty===4||ty===23)return'wall';
  const w=wrow(tx);if(ty===w)return'wall';
  if(ty<w)return tx<=8&&ty<=9?'tatami':'wood';
  return'conc'}
const inB=(tx,ty)=>tx>=4&&tx<=27&&ty>=5&&ty<=22;
const isBack=(tx,ty)=>(inB(tx,ty)&&ty<wrow(tx))||(ty===4&&CAFX.includes(tx));
const isShop=(tx,ty)=>(inB(tx,ty)&&ty>wrow(tx))||(ty===23&&DOORX.includes(tx));
const isTea=(tx,ty)=>tx>=4&&tx<=8&&ty>=5&&ty<=9;
function area(tx,ty){
  if(isTea(tx,ty))return['Tea Room','茶室'];
  if(isBack(tx,ty))return tx>=19?['TSUKASA Café','茶']:['Seating Room',''];
  if(isShop(tx,ty)){if(tx>=21&&ty<=14)return['Counter',''];if(tx<=10)return['Lounge',''];if(tx>=19)return['Objects','物'];return ty>=18?['Entrance','司']:['Denim & Workwear','藍']}
  if(ty<=3&&tx<=28)return['Back alley',''];
  if(tx>=29&&ty<=23)return['Side street',''];
  if(ty>=24&&ty<=26&&tx<=31)return['Storefront',''];
  return['Abbot Kinney Blvd','']}

/* ───────── ground ───────── */
const ground=mk(WPX,HPX);
function buildGround(){
  const g=ground.getContext('2d'),r=rng(11);
  for(let ty=0;ty<MH;ty++)for(let tx=0;tx<MW;tx++){const t=gt(tx,ty),x=tx*T,y=ty*T;
    if(t==='side'){R(g,x,y,T,T,C.side);R(g,x,y,T,1,'#bcb5a6');R(g,x,y,1,T,'#bcb5a6');for(let i=0;i<5;i++)R(g,x+1+r()*14,y+1+r()*14,1,1,r()<.5?'#d8d2c6':'#b9b2a3')}
    else if(t==='road'){R(g,x,y,T,T,C.road);for(let i=0;i<7;i++)R(g,x+r()*15,y+r()*15,1,1,r()<.5?'#5f6164':'#4c4e51')}
    else if(t==='alley'){R(g,x,y,T,T,'#515254');for(let i=0;i<7;i++)R(g,x+r()*15,y+r()*15,r()<.2?2:1,1,r()<.5?'#5b5c5e':'#47484a')}
    else if(t==='fence'){R(g,x,y,T,T,'#7d6046');for(let i=0;i<4;i++)R(g,x+i*4,y,1,T,'#634a35');R(g,x,y,T,2,'#96765a');R(g,x,y+13,T,3,'#3d3a36');if(r()<.5){R(g,x+r()*10,y+2+r()*4,3,2,'#b0457a');R(g,x+r()*12,y+1+r()*5,2,2,'#5d7a45')}}
    else if(t==='hedge'){R(g,x,y,T,T,'#4a6638');for(let i=0;i<16;i++)R(g,x+r()*15,y+r()*15,2,1,r()<.5?'#6a894b':'#39522c');if(gt(tx,ty-1)!=='hedge')R(g,x,y,T,2,'#7c9a59');if(tx===39&&gt(tx-1,ty)!=='hedge')R(g,x,y,1,T,'#2f4425')}
    else R(g,x,y,T,T,'#3a3530')}
  // alley dressing
  R(g,0,38,464,3,'#6d6c68');R(g,0,41,464,1,'#444547');
  for(let i=0;i<9;i++){const x=20+r()*420,y=18+r()*40;R(g,x,y,10+r()*26,5+r()*6,'rgba(60,61,63,.5)')}
  ell(g,150,30,13,4,'#3c4854');ell(g,148,29,7,2,'#55667a');
  for(let i=0;i<26;i++){const x=r()*460;R(g,x,15,1,2,'#6f8a4c');R(g,x+1,14,1,3,'#58703d')}
  // interior floors
  const cf=mk(384,288),cg=cf.getContext('2d'),r2=rng(5);
  R(cg,0,0,384,288,C.conc);for(let i=0;i<1500;i++)R(cg,r2()*384,r2()*288,r2()<.3?2:1,1,r2()<.5?'#d9d4c9':'#cbc5b8');
  for(let x=0;x<384;x+=48)R(cg,x,0,1,288,'#c0b9ac');for(let y=16;y<288;y+=48)R(cg,0,y,384,1,'#c0b9ac');
  cg.globalAlpha=.16;for(let i=0;i<26;i++){const x=r2()*370,y=r2()*280,n=6+r2()*12;L(cg,x,y,x+n,y+n*.5,'#ffffff')}cg.globalAlpha=1;
  const wf=mk(384,288),wg=wf.getContext('2d'),wc=[C.wood,sh(C.wood,.07),sh(C.wood,-.06),sh(C.wood,.03)];
  for(let y=0;y<288;y+=4){let x=-((y*7)%19);while(x<384){const n=20+(r2()*28|0);R(wg,x,y,n,4,wc[r2()*4|0]);R(wg,x+n-1,y,1,4,'#93714d');if(r2()<.4)R(wg,x+3+r2()*(n-8),y+1,4,1,'#a27d57');x+=n}R(wg,0,y+3,384,1,'#9b7852')}
  g.drawImage(wf,64,80);
  g.save();g.beginPath();g.moveTo(64,259);g.lineTo(448,163);g.lineTo(448,368);g.lineTo(64,368);g.closePath();g.clip();g.drawImage(cf,64,80);g.restore();
  // tatami 5x5
  R(g,64,80,80,80,C.tat);for(let y=80;y<160;y+=2)R(g,64,y,80,1,'#c9b97c');
  for(let i=0;i<60;i++)R(g,64+r()*78,80+r()*78,2,1,'#dccd94');
  const he='#3f4636';[[64,80,32,16],[96,80,32,16],[128,80,16,32],[64,96,16,32],[80,96,32,16],[80,112,32,16],[112,96,16,32],[128,112,16,32],[64,128,32,16],[96,128,32,16],[64,144,32,16],[96,144,48,16]].forEach(m=>{g.fillStyle=he;g.fillRect(m[0],m[1],m[2],1);g.fillRect(m[0],m[1],1,m[3]);g.fillRect(m[0]+m[2]-1,m[1],1,m[3]);g.fillRect(m[0],m[1]+m[3]-1,m[2],1)});
  // garage threshold: concrete apron with the door track
  R(g,320,64,128,16,'#b2ab9f');for(let i=0;i<60;i++)R(g,320+r()*126,64+r()*15,1,1,r()<.5?'#bdb7ab':'#a39c90');R(g,320,64,128,2,'#6f6a62');R(g,320,66,128,1,'#cfc9bd');R(g,320,78,128,2,'#9b7852');
  // soft shadow under the back wall
  [.2,.13,.08,.04].forEach((a,i)=>R(g,64,80+i*2,384,2,`rgba(40,30,20,${a})`));
  // rug (lounge)
  {const x=80,y=306,w=64,h=44;for(let i=0;i<h;i+=2){R(g,x-3,y+i,3,1,'#e6dcc4');R(g,x+w,y+i,3,1,'#e6dcc4')}
   R(g,x,y,w,h,'#2c3a5a');R(g,x+2,y+2,w-4,h-4,'#d9c9a0');R(g,x+3,y+3,w-6,h-6,'#8a3a2c');R(g,x+6,y+6,w-12,h-12,'#7c3226');
   for(let i=0;i<w-8;i+=4){R(g,x+4+i,y+4,2,1,'#d9c9a0');R(g,x+4+i,y+h-5,2,1,'#d9c9a0')}for(let i=0;i<h-8;i+=4){R(g,x+4,y+4+i,1,2,'#d9c9a0');R(g,x+w-5,y+4+i,1,2,'#d9c9a0')}
   for(let k=0;k<10;k++){const ww=20-k*2;R(g,x+32-ww,y+12+k,ww*2,1,k%3===0?'#d9c9a0':k%3===1?'#2c3a5a':'#b98a3a');R(g,x+32-ww,y+31-k,ww*2,1,k%3===0?'#d9c9a0':k%3===1?'#2c3a5a':'#b98a3a')}
   R(g,x+29,y+20,6,4,'#d9c9a0');R(g,x+31,y+21,2,2,'#8a3a2c');
   [[10,10],[52,10],[10,32],[52,32]].forEach(p=>{R(g,x+p[0]-1,y+p[1]-1,4,4,'#2c3a5a');R(g,x+p[0],y+p[1],2,2,'#b98a3a')})}
  // entry mat, zabuton
  R(g,241,355,30,11,'#2f2b27');for(let i=0;i<30;i+=2)R(g,241+i,356,1,9,'#3c3733');R(g,241,355,30,1,'#4a443e');
  [[5,8,C.ind],[6,8,C.ind],[7,8,C.ind],[6,6,'#8f3a30']].forEach(z=>{const x=z[0]*T+2,y=z[1]*T+3;R(g,x-1,y,14,11,'#23211b');R(g,x,y+1,12,9,z[2]);R(g,x,y+1,12,1,sh(z[2],.2));R(g,x+5,y+5,2,1,'#e6dcc4')});
  // road markings
  for(let x=0;x<WPX;x++){if((x>=222&&x<290)||(x>=510&&x<610))continue;R(g,x,478,1,1,'#cfa93a');R(g,x,481,1,1,'#cfa93a')}
  for(let y=0;y<27*T-8;y++)if(y%20<12)R(g,559,y,2,1,'#cfa93a');
  for(let y=27*T+3;y<33*T-4;y+=12){R(g,224,y,64,6,'#e6e2d6');for(let i=0;i<10;i++)R(g,224+r()*62,y+r()*5,2,1,C.road)}
  R(g,32*T,27*T-6,48,3,'#e6e2d6');
  [[25*T+8,29*T-2],[35*T,30*T+6]].forEach(m=>{ell(g,m[0],m[1],7,4,'#3e4043');ell(g,m[0],m[1],5,3,'#4b4d50');R(g,m[0]-3,m[1],7,1,'#3e4043');R(g,m[0],m[1]-2,1,5,'#3e4043')});
  for(let i=0;i<14;i++){const x=r()*WPX,y=27*T+r()*90;R(g,x,y,8+r()*20,1,'rgba(70,72,75,.9)')}
  ell(g,410,470,9,3,'rgba(60,62,64,.6)');
  // curbs
  const red=(tx,ty)=>(ty===26&&((tx>=11&&tx<=13)||(tx>=18&&tx<=20)||tx>=27))||(tx===31&&(ty>=21||ty<=6))||(ty===33&&((tx>=11&&tx<=13)||(tx>=18&&tx<=20)));
  for(let ty=0;ty<MH;ty++)for(let tx=0;tx<MW;tx++){if(gt(tx,ty)!=='side')continue;const x=tx*T,y=ty*T,rd=red(tx,ty),ct=rd?'#b9443a':'#dfd9cd',cfc=rd?'#8a2d24':'#a39b8d';
    if(gt(tx,ty+1)==='road'){R(g,x,y+11,T,3,ct);R(g,x,y+14,T,2,cfc)}
    if(gt(tx,ty-1)==='road'){R(g,x,y,T,3,ct);R(g,x,y+3,T,1,'#b0a899')}
    if(gt(tx+1,ty)==='road'){R(g,x+13,y,3,T,ct);R(g,x+12,y,1,T,'#b0a899')}
    if(gt(tx-1,ty)==='road'){R(g,x,y,3,T,ct);R(g,x+3,y,1,T,'#b0a899')}}
  // cracks, dry grass, fallen petals
  for(let i=0;i<22;i++){let tx,ty;do{tx=r()*MW|0;ty=r()*MH|0}while(gt(tx,ty)!=='side');let x=tx*T+r()*10,y=ty*T+3+r()*8;for(let k=0;k<7;k++){const nx=x+1+r()*2,ny=y+(r()*3-1);L(g,x,y,nx,ny,'#a59d8e');x=nx;y=ny}}
  for(let i=0;i<46;i++){let tx,ty;do{tx=r()*MW|0;ty=r()*MH|0}while(!(gt(tx,ty)==='side'&&(gt(tx,ty+1)==='road'||gt(tx+1,ty)==='road'||gt(tx,ty-1)==='hedge'||ty===24)));const x=tx*T+r()*12,y=ty*T+(ty===24?1:gt(tx,ty+1)==='road'?8:r()*12);R(g,x,y,1,3,'#b3a25f');R(g,x+1,y-1,1,4,'#9a9050');R(g,x+2,y+1,1,2,'#c2b377')}
  for(let i=0;i<70;i++){const x=440+r()*90,y=10+r()*110;if(gt(x/T|0,y/T|0)==='side'||gt(x/T|0,y/T|0)==='road'||gt(x/T|0,y/T|0)==='alley')R(g,x,y,r()<.3?2:1,1,r()<.5?'#a892d8':'#8c76c4')}
}
function buildMini(){const c=$('#mini'),g=c.getContext('2d'),col={side:'#cbc4b6',road:'#6a6c6f',alley:'#56575a',fence:'#7d6046',hedge:'#4a6638',nbr:'#9a9892',wall:'#23211b',door:'#b13a2c',gar:'#c9a57c',conc:'#e6e1d3',wood:'#c9a57c',tatami:'#d2c286'};
  for(let ty=0;ty<MH;ty++)for(let tx=0;tx<MW;tx++){g.fillStyle=col[gt(tx,ty)];g.fillRect(tx*4,ty*4,4,4)}
  g.fillStyle=col.conc;g.fillRect(16,20,96,72);g.fillStyle=col.wood;g.beginPath();g.moveTo(16,20);g.lineTo(112,20);g.lineTo(112,40.75);g.lineTo(16,64.75);g.fill();g.fillStyle=col.tatami;g.fillRect(16,20,20,20);g.strokeStyle='#23211b';g.lineWidth=1.6;g.beginPath();g.moveTo(16,64.75);g.lineTo(112,40.75);g.stroke();
  g.fillStyle='#5a4636';g.fillRect(36,20,1,20);g.fillRect(16,40,21,1);
  g.fillStyle='#e6e2d6';for(let y=109;y<132;y+=3)g.fillRect(56,y,16,1)}

/* ───────── walls (pre-rendered tall + cutaway versions) ───────── */
const W={};
function buildWalls(){
  const r=rng(23);let c,g;
  // FRONT FACADE, tall. local x0 = world 48, y0 = world 320
  c=W.facT=mk(416,64);g=c.getContext('2d');
  R(g,0,0,416,16,'#727f5b');R(g,0,0,416,1,C.ink);R(g,0,15,416,1,C.oliveD);
  R(g,0,16,416,48,C.olive);for(let i=0;i<900;i++)R(g,r()*416,16+r()*38,r()<.3?2:1,1,r()<.5?'#667250':'#566144');
  R(g,0,16,416,2,'#465036');R(g,0,18,416,1,'#525d40');
  R(g,0,54,416,10,C.char);for(let x=0;x<416;x+=6)R(g,x,55,1,9,'#1d1a17');R(g,0,54,416,1,'#4a433c');R(g,0,63,416,1,'#161412');
  const win=(x0,kind)=>{const w=112,y0=24,h=30;R(g,x0-2,y0-2,w+4,h+4,C.char);
    const gr=g.createLinearGradient(0,y0,0,y0+h);gr.addColorStop(0,'#f4d697');gr.addColorStop(1,'#d7a35c');g.fillStyle=gr;g.fillRect(x0,y0,w,h);
    R(g,x0,y0+h-4,w,4,'#8a6240');R(g,x0,y0+h-4,w,1,'#a67a52');
    if(kind===0){R(g,x0+10,y0+5,w-20,1,'#3a2c22');R(g,x0+10,y0+5,1,21,'#3a2c22');R(g,x0+w-11,y0+5,1,21,'#3a2c22');
      [[C.ind,16],[C.cream,17],['#66734f',15],['#2a2a2e',19],[C.ind2,14],['#e3d9bf',16],['#58633f',17]].forEach((q,i)=>{const x=x0+16+i*12;R(g,x+3,y0+4,1,2,'#3a2c22');R(g,x+1,y0+6,7,1,q[0]);R(g,x,y0+7,9,q[1],q[0]);R(g,x,y0+7,1,q[1],sh(q[0],-.2));R(g,x+4,y0+8,1,q[1]-2,sh(q[0],.14))})}
    else{R(g,x0+18,y0+16,34,10,'#c9c3b7');R(g,x0+18,y0+16,34,1,'#e6e1d3');R(g,x0+26,y0+7,5,9,'#2a2622');R(g,x0+25,y0+10,7,5,'#2a2622');L(g,x0+28,y0+7,x0+34,y0-0+2,'#5a4030');L(g,x0+31,y0+4,x0+37,y0+3,'#5a4030');R(g,x0+34,y0+1,2,2,'#c9544a');R(g,x0+37,y0+2,2,2,'#d98a80');
      ell(g,x0+76,y0+15,9,10,'#fff3cf');ell(g,x0+76,y0+15,6,7,'#fffbe8');for(let k=-8;k<=8;k+=3)R(g,x0+68,y0+15+k,17,1,'rgba(200,160,90,.35)');R(g,x0+73,y0+25,7,2,'#6e4a2e');
      R(g,x0+92,y0+20,8,6,'#a9bfae');R(g,x0+92,y0+20,8,1,'#c5d6c9')}
    g.globalAlpha=.16;for(let k=0;k<3;k++){g.fillStyle='#fff';g.beginPath();const sx=x0+14+k*38;g.moveTo(sx,y0);g.lineTo(sx+10,y0);g.lineTo(sx-8,y0+h-4);g.lineTo(sx-18,y0+h-4);g.fill()}g.globalAlpha=1;
    R(g,x0+w/2-1,y0,2,h,C.char)};
  win(48,0);win(256,1);
  // door surround (opening 192..224, from y=26)
  R(g,189,23,38,41,C.char);g.clearRect(192,26,32,38);
  {const gr=g.createLinearGradient(0,26,0,64);gr.addColorStop(0,'rgba(38,28,20,.92)');gr.addColorStop(.6,'rgba(70,48,30,.8)');gr.addColorStop(1,'rgba(214,160,90,.55)');g.fillStyle=gr;g.fillRect(192,26,32,38)}
  txt(g,'TSUKASA',180,17,C.brass,1,5);
  [182,231].forEach(x=>{R(g,x,30,3,7,C.brass);R(g,x,30,3,1,'#e9cf8f');R(g,x+1,33,1,3,'#fff3c4')});
  R(g,0,16,1,48,C.ink);R(g,415,16,1,48,C.ink);
  // noren (three panels, 司 in the middle)
  c=W.noren=mk(32,14);g=c.getContext('2d');R(g,0,0,32,2,'#3a2c22');
  [[0,10,12],[11,10,13],[22,10,12]].forEach(p=>{R(g,p[0],2,p[1],p[2]-2,'#efe6cf');R(g,p[0],2,1,p[2]-2,'#d9cfb4');R(g,p[0],p[2]-1,p[1],1,'#cfc4a6')});
  bmp(g,K_TSUKASA,11.5|0,3,'#2c3a5a');
  // FRONT FACADE, cutaway. world (48,362)
  c=W.facL=mk(416,22);g=c.getContext('2d');
  const seg=(a,b)=>{R(g,a,0,b-a,16,'#ddd7c9');R(g,a,0,b-a,1,C.ink);R(g,a,15,b-a,1,C.ink);R(g,a,16,b-a,6,C.char);R(g,a,16,b-a,1,'#4a433c');R(g,a,2,b-a,3,'#727f5b');R(g,a,11,b-a,3,C.pl)};
  seg(0,192);seg(224,416);R(g,191,0,1,22,C.ink);R(g,224,0,1,22,C.ink);R(g,0,0,1,22,C.ink);R(g,415,0,1,22,C.ink);
  [[48,160],[256,368]].forEach(q=>{R(g,q[0],5,q[1]-q[0],6,'#bfd5d2');R(g,q[0],5,q[1]-q[0],1,'#e3f0ee');R(g,q[0],4,q[1]-q[0],1,C.char);R(g,q[0],11,q[1]-q[0],1,C.char);R(g,(q[0]+q[1])/2-1,4,2,8,C.char)});
  // BACK WALL, tall. world (48,36)
  c=W.backT=mk(416,44);g=c.getContext('2d');
  R(g,0,0,416,16,C.pl);R(g,0,0,416,1,C.ink);R(g,0,15,416,1,C.ink);R(g,0,2,416,2,'#f6f2e8');
  R(g,16,16,384,28,C.pl2);for(let i=0;i<500;i++)R(g,16+r()*382,16+r()*24,2,1,r()<.5?'#ebe6da':'#ddd7c8');
  R(g,16,16,384,2,'#cfc8b8');R(g,16,41,384,3,C.wal);R(g,16,41,384,1,C.walL);
  R(g,16,16,81,25,'#d6c59c');for(let i=0;i<120;i++)R(g,16+r()*80,18+r()*22,2,1,r()<.5?'#decfa8':'#c9b78c');[16,56,95].forEach(x=>R(g,x,16,2,28,'#4a382b'));R(g,16,16,81,2,'#4a382b');
  R(g,178,18,28,22,C.wal);R(g,180,20,24,18,'#cfe0e2');R(g,180,20,24,7,'#e2eef0');R(g,180,31,24,7,'#b7c9c4');R(g,191,20,2,18,C.wal);R(g,180,28,24,2,C.wal);R(g,178,18,28,1,C.walL);R(g,177,40,30,1,C.walD);L(g,183,26,187,22,'#fff');
  g.clearRect(272,16,128,28);R(g,270,16,2,28,C.char);R(g,398,16,2,28,C.char);R(g,272,16,126,6,'#7c7f82');for(let x=273;x<398;x+=2)R(g,x,17,1,4,'#64676a');R(g,272,16,126,1,'#9a9da0');R(g,272,22,126,1,C.ink);
  R(g,0,0,1,16,C.ink);R(g,415,0,1,16,C.ink);
  // BACK WALL, cutaway (alley view), with the big doors slid open. world (48,28)
  c=W.backL=mk(416,52);g=c.getContext('2d');
  const bs=(a,b)=>{R(g,a,30,b-a,16,'#ddd7c9');R(g,a,30,b-a,1,C.ink);R(g,a,45,b-a,1,C.ink);R(g,a,46,b-a,6,C.pl2);R(g,a,46,b-a,1,'#cfc8b8');R(g,a,32,b-a,3,'#727f5b')};
  bs(0,272);bs(400,416);R(g,244,32,24,7,C.char);txt(g,'2324',246,33,C.brass);R(g,180,36,24,5,'#bfd5d2');R(g,179,35,26,1,C.wal);R(g,179,41,26,1,C.wal);
  R(g,271,30,1,22,C.ink);R(g,400,30,1,22,C.ink);R(g,272,46,128,6,'#b2ab9f');R(g,272,46,128,1,'#6f6a62');R(g,0,30,1,22,C.ink);R(g,415,30,1,22,C.ink);
  // ANGLED WALL. world (64,128). One clean line: 1px down every 4px across.
  const gar=[];const sec=(x0,x1,cols,len)=>{for(let x=x0+3,i=0;x+8<=x1;x+=10,i++)gar.push({x,c:cols[(i*7+3)%cols.length],n:len[(i*5+1)%len.length]})};
  sec(80,144,['#efe6cf','#e3d9bf','#f4eedd','#d9ceb0'],[14,15,13]);sec(144,208,[C.ind,C.ind2,'#22304d','#4a5d8a',C.ind],[13,18,14,18]);sec(208,272,['#66734f','#58633f','#7a8660'],[14,15]);sec(272,304,['#2a2a2e','#1f1f22','#38383d'],[18,17]);
  c=W.diagT=mk(384,140);g=c.getContext('2d');
  for(let x=0;x<384;x++){const yc=35+((383-x)>>2),t=yc-3-WH;
    R(g,x,t,1,7,C.pl);R(g,x,t,1,1,C.ink);R(g,x,t+1,1,1,'#f8f5ec');R(g,x,t+6,1,1,C.ink);
    const f=t+7;R(g,x,f,1,WH,C.wal);R(g,x,f,1,1,'#ffe9b0');R(g,x,f+1,1,1,'#f3cd86');R(g,x,f+2,1,1,'#c99a5e');R(g,x,f+3,1,2,'#93683f');R(g,x,f+5,1,3,'#7c5534');
    if(x%32===0)R(g,x,f+3,1,WH-7,C.walD);else if((x*7)%13===0)R(g,x,f+9+((x*5)%9),1,5,'#775033');
    R(g,x,f+WH-4,1,4,C.char);R(g,x,f+WH-4,1,1,'#4a433c');R(g,x,f+WH-1,1,1,C.ink);
    if(x>=80&&x<304)R(g,x,f+6,1,1,C.brass);
    if(x>=20&&x<46){const k=x-20,row=(k/6|0),pc=['#2c3a5a','#3d4f78','#22304d','#4a5d8a','#31456e'];if(k===0||k===25)R(g,x,f+7,1,14,C.ink);else{for(let y=0;y<14;y++)R(g,x,f+7+y,1,1,(y===0||y===13)?C.ink:pc[(row*3+(y/5|0)*2)%5]);if(k%6===3)R(g,x,f+10,1,1,'#e6dcc4')}}
    if(x>=312&&x<378&&x%24>=2&&x%24<20){R(g,x,f+13,1,1,C.walL);R(g,x,f+14,1,1,C.walD)}}
  gar.forEach(q=>{for(let i=0;i<8;i++){const x=q.x+i,f=35+((383-x)>>2)-3-WH+7,edge=i===0||i===7;
    if(i===3||i===4)R(g,x,f+5,1,2,'#3a2c22');
    const y0=f+7+(edge?1:0);R(g,x,y0,1,q.n-(edge?3:0),edge?sh(q.c,-.22):q.c);if(i===4)R(g,x,y0+1,1,q.n-2,sh(q.c,.13));R(g,x,y0+q.n-(edge?3:0),1,1,'rgba(35,33,27,.55)')}
    const xa=q.x-1,xb=q.x+8;R(g,xa,35+((383-xa)>>2)-3-WH+15,1,q.n-2,'rgba(35,33,27,.45)');R(g,xb,35+((383-xb)>>2)-3-WH+15,1,q.n-2,'rgba(35,33,27,.45)')});
  R(g,383,35-3-WH,1,WH+7,C.ink);R(g,0,35+95-3-WH,1,WH+7,C.ink);
  c=W.diagL=mk(384,140);g=c.getContext('2d');
  for(let x=0;x<384;x++){const yc=35+((383-x)>>2),t=yc-3-LOW;R(g,x,t,1,7,'#ddd7c9');R(g,x,t,1,1,C.ink);R(g,x,t+6,1,1,C.ink);R(g,x,t+2,1,1,C.pl);R(g,x,t+7,1,LOW,C.wal);R(g,x,t+7+LOW-1,1,1,C.ink)}
  // SHOJI south wall of the tea room. world (63,134)
  c=W.shoT=mk(82,28);g=c.getContext('2d');R(g,0,0,82,28,'rgba(246,240,224,.86)');
  for(let y=6;y<26;y+=6)R(g,0,y,82,1,'rgba(90,70,54,.55)');for(let x=1;x<82;x+=8)R(g,x,0,1,28,'rgba(90,70,54,.55)');
  for(let x=0;x<82;x+=16)R(g,x,0,2,28,'#3a2c22');R(g,0,0,82,2,'#3a2c22');R(g,0,25,82,3,'#3a2c22');R(g,0,20,82,1,'#3a2c22');
  c=W.shoL=mk(82,8);g=c.getContext('2d');R(g,0,0,82,8,'#3a2c22');R(g,1,1,80,2,'#efe6cf');R(g,0,0,82,1,C.ink);
  // SHOJI east wall + sliding door. world x=142
  const shoE=(h,door)=>{const c=mk(6,h),g=c.getContext('2d');R(g,0,0,6,h,'#3a2c22');R(g,1,1,4,h-2,door?'#f6f0e0':'#efe6cf');for(let y=5;y<h-2;y+=5)R(g,1,y,4,1,'rgba(90,70,54,.6)');for(let y=0;y<h;y+=16)R(g,0,y,6,2,'#3a2c22');if(door)R(g,2,h/2-2,2,4,'#3a2c22');return c};
  W.shoE=shoE(94,0);W.shoD=shoE(22,1);
  // ROOF. world (48,16)
  c=W.roof=mk(416,320);g=c.getContext('2d');const rr=rng(77);
  R(g,0,0,416,320,'#bdb6a6');for(let i=0;i<2600;i++)R(g,rr()*416,rr()*320,rr()<.3?2:1,1,rr()<.5?'#c6c0b1':'#b1aa9a');
  for(let i=0;i<10;i++)R(g,rr()*380,rr()*290,20+rr()*50,8+rr()*20,'rgba(160,152,136,.25)');
  for(let x=52;x<416;x+=104)R(g,x,6,1,308,'#aaa393');
  R(g,0,0,416,6,'#727f5b');R(g,0,314,416,6,'#7a8762');R(g,0,0,6,320,'#6a7654');R(g,410,0,6,320,'#6a7654');R(g,6,6,404,1,'#8f897a');R(g,6,6,1,308,'#8f897a');R(g,0,313,416,1,C.oliveD);
  g.strokeStyle=C.ink;g.lineWidth=1;g.strokeRect(.5,.5,415,319);
  [[52,70],[188,120],[306,64]].forEach(s=>{R(g,s[0]-2,s[1]-2,46,30,'#8a8578');R(g,s[0]-3,s[1]+28,48,2,'rgba(60,55,45,.35)');R(g,s[0],s[1],42,26,'#a9c4cc');R(g,s[0],s[1],42,26,'rgba(240,215,150,.28)');R(g,s[0]+20,s[1],2,26,'#8a8578');g.globalAlpha=.4;L(g,s[0]+4,s[1]+18,s[0]+16,s[1]+4,'#fff',2);L(g,s[0]+26,s[1]+20,s[0]+36,s[1]+8,'#fff',2);g.globalAlpha=1});
  [[110,210],[322,190]].forEach(h=>{R(g,h[0]-1,h[1]+26,30,3,'rgba(60,55,45,.35)');box(g,h[0],h[1],28,18,8,'#cfccc3','#9d9a92');g.strokeRect(h[0]-.5,h[1]-.5,29,27);ell(g,h[0]+14,h[1]+9,7,6,'#77756f');ell(g,h[0]+14,h[1]+9,5,4,'#55534f');R(g,h[0]+13,h[1]+4,2,10,'#8d8a83');R(g,h[0]+9,h[1]+8,10,2,'#8d8a83');for(let k=2;k<26;k+=3)R(g,h[0]+k,h[1]+20,1,5,'#7d7a73')});
  [[40,150],[230,60],[250,250],[370,120],[80,280]].forEach(v=>{ell(g,v[0],v[1]+3,4,2,'rgba(60,55,45,.4)');R(g,v[0]-3,v[1]-4,7,7,'#9d9a92');ell(g,v[0],v[1]-4,3,2,'#d3d0c7');ell(g,v[0],v[1]-4,1,1,'#55534f')});
  L(g,124,228,124,300,'#8d887b');L(g,124,300,330,300,'#8d887b');L(g,336,216,336,300,'#8d887b');
  box(g,200,270,22,14,5,'#a9a69d','#8a877f');
  R(g,295,3,84,2,'rgba(40,36,30,.4)');R(g,300,0,2,6,'#3a3632');R(g,372,0,2,6,'#3a3632');
  // roof sign, facing the street side
  R(g,244,-0,0,0,C.ink);
  c=W.sign=mk(88,20);g=c.getContext('2d');R(g,0,0,88,17,C.brass);R(g,1,1,86,15,C.char);R(g,6,17,2,3,'#3a3632');R(g,80,17,2,3,'#3a3632');txt(g,'TSUKASA',5,4,'#efe6cf',2,1);R(g,66,2,15,13,C.red);bmp(g,K_CHA,69,3,'#efe6cf');
  // NEIGHBOUR (surf shaper). world (0,20)
  c=W.nbr=mk(48,364);g=c.getContext('2d');R(g,0,0,48,320,'#a5a39c');for(let i=0;i<500;i++)R(g,rr()*48,rr()*320,2,1,rr()<.5?'#aeaca5':'#9a9891');
  R(g,0,0,48,4,'#8b8982');R(g,0,316,48,4,'#93918a');R(g,44,0,4,320,'#8b8982');R(g,47,0,1,320,C.ink);R(g,0,0,48,1,C.ink);box(g,12,120,20,14,6,'#c4c2bb','#96948d');ell(g,22,60,5,3,'#77756f');
  R(g,0,320,48,44,'#b4b1a8');for(let i=0;i<120;i++)R(g,rr()*48,322+rr()*40,2,1,'#a8a59c');R(g,0,320,48,2,'#8b8982');R(g,6,334,30,30,'#7f8388');for(let y=336;y<364;y+=3)R(g,6,y,30,1,'#6b6f74');R(g,6,348,30,16,'#2d2b29');R(g,10,354,8,10,'#e9dfc8');R(g,20,352,6,12,'#6aa3b0');
  txt(g,'SHAPER',7,325,'#2f5d8a',1,2);R(g,40,330,5,34,'#efe6cf');R(g,42,330,1,34,C.red);R(g,41,328,3,2,'#efe6cf');R(g,47,320,1,44,C.ink);R(g,0,363,48,1,C.ink);
}
