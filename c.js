/* ───────── characters ───────── */
const SPEC={
  player:{skin:'#e8b88f',hair:'#3a2a22',style:'short',kind:'jacket',top:C.ind,shirt:'#efe6cf',pants:'#e9dfc8',wide:1,shoe:'#f4f1ea',tote:1,v:520},
  ren:{skin:'#e3b089',hair:'#1c1a1a',style:'short',kind:'wrap',top:'#2b2b2e',trim:'#55555c',belt:'#6a6a72',pants:'#232326',wide:1,shoe:'#111111',v:300},
  kenji:{skin:'#d9a57c',hair:'#2a211c',style:'cap',cap:'#27324f',beard:1,kind:'jacket',denim:1,top:C.ind2,shirt:'#f0ece2',pants:'#2c3a5a',shoe:'#6b4a30',v:230},
  mika:{skin:'#ecc19c',hair:'#241c1a',style:'bun',kind:'wrap',top:'#66734f',trim:'#8c9a70',belt:'#3c452e',pants:'#ece3cd',wide:1,shoe:'#3a2c22',v:440},
  dee:{skin:'#a9744f',hair:'#1a1413',style:'long',kind:'coat',top:'#26262a',shirt:'#d8d2c4',pants:'#f1eee6',wide:1,shoe:'#111111',v:380},
  jo:{skin:'#e0aa84',hair:'#6b4526',style:'curly',beard:1,kind:'jacket',top:'#b39a6b',shirt:'#f4efe4',pants:'#4a4f58',shoe:'#5a3d28',v:250},
  sora:{skin:'#e9bd97',hair:'#2c2320',style:'short',band:C.red,kind:'apron',top:'#efe6cf',apron:C.wal,pants:'#3b3f48',shoe:'#eeeeee',v:480},
  hana:{skin:'#efc8a6',hair:'#17130f',style:'bun',kind:'kimono',top:C.ind,trim:'#f3efe6',obi:C.red,pants:C.ind,shoe:'#f3f0ea',v:400},
  ash:{skin:'#d9a57c',hair:'#1a1413',style:'short',kind:'jacket',top:'#3a3632',shirt:'#efe6cf',pants:'#d8cfb8',wide:1,shoe:'#2a2622',v:320},
  local:{skin:'#c98d5f',hair:'#5a4632',style:'cap',cap:C.red,kind:'tee',top:'#f5f3ee',pants:'#7a8a96',shorts:1,shoe:'#dddddd',v:270},
  l1:{skin:'#c68a5e',hair:'#1a1413',style:'long',kind:'tee',top:'#c9544a',pants:'#3b3f48',shoe:'#eeeeee',glasses:1,v:460},
  l2:{skin:'#e8b88f',hair:'#8a6240',style:'short',kind:'jacket',top:'#7a8a96',shirt:'#f4efe4',pants:'#2c3a5a',shoe:'#333333',v:280},
  l3:{skin:'#8d5a3b',hair:'#141110',style:'curly',kind:'tee',top:'#e0a23a',pants:'#3b3f48',shoe:'#eeeeee',v:330},
  l4:{skin:'#efc8a6',hair:'#d9b36a',style:'bun',kind:'tee',top:'#efe9dd',pants:'#66734f',shoe:'#333333',glasses:1,v:500},
  l5:{skin:'#d9a57c',hair:'#2a211c',style:'cap',cap:'#3a3632',kind:'jacket',top:'#3a3632',shirt:'#9fc3d6',pants:'#55504a',shoe:'#eeeeee',beard:1,v:240},
  l6:{skin:'#e3b089',hair:'#3a2a22',style:'short',kind:'tee',top:'#5f7f8f',pants:'#e9dfc8',shoe:'#6b4a30',glasses:1,v:360},
};
const cc=new Map();
function charSprite(o,dir,fr,ex,blink,mouth,pose){const k=[o.id,dir,fr,ex,blink?1:0,mouth?1:0,pose].join('|');let s=cc.get(k);if(!s){s=paintChar(o,dir,fr,ex,blink,mouth,pose);cc.set(k,s)}return s}
function paintChar(o,dir,fr,ex,blink,mouth,pose){
  const flip=dir==='right',d=flip?'left':dir,side=d==='left',back=d==='up';
  const c=mk(30,44),g=c.getContext('2d');g.translate(1,3);
  const sit=pose==='sit',kneel=pose==='kneel',walk=!sit&&!kneel;
  const bob=walk&&(fr&1)?1:0,hy=(sit?3:kneel?6:0)+bob,ty0=21+hy;
  const sk=o.skin,skD=sh(sk,-.14),hair=o.hair,hairL=sh(hair,.2),top=o.top,topD=sh(top,-.2),topL=sh(top,.16),pants=o.pants,pantsD=sh(pants,-.16),shoe=o.shoe,ink='#23211b';
  const X=(x,y,w,h,col)=>R(g,x,y,w,h,col);
  // legs
  if(kneel){if(side){X(6,33,15,6,top);X(6,38,15,1,topD)}else{X(4,33,20,6,top);X(4,38,20,1,topD);X(12,34,1,4,topD)}}
  else if(o.kind==='kimono'){if(side){X(10,31,9,7,top);X(9,38,9,2,shoe)}else{X(8,31,12,7,top);X(8,37,12,1,topD);X(13,32,1,5,topD);X(9,38,4,2,shoe);X(15,38,4,2,shoe)}}
  else if(side){
    const leg=(x,up,col)=>{if(o.shorts){X(x,32,5,3,col);X(x+1,35,3,3-up,sk)}else X(x,32,5,6-up,col);X(x-1,38-up,6,2,shoe)};
    if(sit){X(7,33,11,4,pants);X(7,36,4,2,o.shorts?sk:pants);X(6,38,5,2,shoe)}
    else if(fr===1){leg(14,1,pantsD);leg(8,0,pants)}else if(fr===3){leg(8,1,pantsD);leg(13,0,pants)}else{if(o.shorts){X(10,32,8,3,pants);X(11,35,6,3,sk)}else X(10,32,8,6,pants);X(9,38,9,2,shoe)}}
  else{const w=o.wide?6:5,lx=8,rx=o.wide?14:15,y0=sit?34:32,h=sit?4:6;
    [[lx,fr===1],[rx,fr===3]].forEach(([x,up])=>{const u=up&&walk?2:0;if(o.shorts){X(x,y0,w,3,pants);X(x+1,y0+3,w-2,h-3-u,sk)}else{X(x,y0,w,h-u,pants);X(x,y0,1,h-u,pantsD)}X(x,38-u,w,2,shoe)})}
  // torso + arms
  const K=o.kind;
  if(side){
    X(9,ty0,10,11,top);X(9,ty0+10,10,1,topD);
    if(K==='coat'){X(9,ty0+11,10,4,top);X(9,ty0+14,10,1,topD)}
    if(K==='jacket'||K==='coat')X(9,ty0,2,11,o.shirt);
    if(K==='wrap'){X(10,ty0,1,5,o.trim);X(9,ty0+7,10,2,o.belt)}
    if(K==='apron'){X(8,ty0+3,3,8,o.apron);X(8,32,3,3,o.apron);X(11,ty0+6,8,1,o.apron)}
    if(K==='kimono'){X(10,ty0,1,5,o.trim);X(9,ty0+5,10,4,o.obi);X(18,ty0+3,3,7,sh(o.obi,-.12))}
    if(K==='tee')X(11,ty0,3,1,sk);
    const ax=12+(walk?(fr===1?-2:fr===3?2:0):0)-(sit?3:0),al=sit?6:9,ay=ty0+1+(sit?(fr&1):0);
    if(kneel){X(11,ty0+1,4,7,topD);X(9,ty0+8,4,2,sk)}
    else{X(ax,ay,4,al,topD);if(K==='tee'){X(ax,ay+4,4,al-4,sk)}X(ax-(sit?2:0),ay+al,4,2,sk)}
    if(o.tote){X(13,ty0,1,6,'#cfc4a6');X(11,ty0+6,8,8,'#e9dfc8');X(11,ty0+13,8,1,'#cfc4a6');X(11,ty0+6,8,1,'#f6f1e4')}
  }else{
    X(7,ty0,14,11,top);X(7,ty0+10,14,1,topD);
    if(K==='coat'){X(7,ty0+11,14,4,top);X(13,ty0+11,1,4,topD);X(7,ty0+14,14,1,topD)}
    if(!back){
      if(K==='jacket'||K==='coat'){X(12,ty0,4,K==='coat'?12:11,o.shirt);X(11,ty0,1,11,topD);X(16,ty0,1,11,topD);X(10,ty0,2,2,topL);X(16,ty0,2,2,topL);
        if(o.denim){X(8,ty0+4,3,1,topL);X(17,ty0+4,3,1,topL);X(11,ty0+3,1,1,C.brass);X(11,ty0+6,1,1,C.brass);X(11,ty0+9,1,1,C.brass)}}
      if(K==='wrap'){X(12,ty0,4,1,sk);X(13,ty0+1,2,1,sk);L(g,11,ty0,15,ty0+5,o.trim);L(g,16,ty0,13,ty0+3,o.trim);X(7,ty0+7,14,2,o.belt);X(15,ty0+7,2,4,o.belt)}
      if(K==='tee'){X(12,ty0,4,1,sk)}
      if(K==='apron'){X(12,ty0,4,1,sk);X(10,ty0,1,3,o.apron);X(17,ty0,1,3,o.apron);X(9,ty0+3,10,8,o.apron);X(11,ty0+7,6,1,sh(o.apron,-.25));if(!sit)X(9,32,10,3,o.apron)}
      if(K==='kimono'){X(12,ty0,4,1,sk);X(13,ty0+1,2,1,sk);L(g,10,ty0,13,ty0+4,o.trim);L(g,17,ty0,14,ty0+4,o.trim);X(7,ty0+5,14,4,o.obi);X(7,ty0+7,14,1,'#e9d9a8')}
    }else{
      if(K==='jacket'||K==='coat')X(13,ty0+1,1,K==='coat'?14:9,topD);
      if(K==='wrap')X(7,ty0+7,14,2,o.belt);
      if(K==='apron'){L(g,9,ty0,18,ty0+6,o.apron);L(g,18,ty0,9,ty0+6,o.apron);X(7,ty0+6,14,1,o.apron);X(12,ty0+7,4,2,o.apron)}
      if(K==='kimono'){X(10,ty0,8,1,o.trim);X(7,ty0+5,14,4,o.obi);X(10,ty0+3,8,7,sh(o.obi,-.12));X(10,ty0+3,8,1,sh(o.obi,.15))}
    }
    const sw=walk?(fr===1?-1:fr===3?1:0):0;
    if(kneel){X(4,ty0+1,3,7,topD);X(21,ty0+1,3,7,topD);if(!back){X(11,ty0+9,6,2,sk);X(13,ty0+9,1,2,skD)}}
    else if(sit){const b=fr&1;X(4,ty0+1,3,6,topD);X(21,ty0+1,3,6,topD);if(!back){X(6,ty0+7+b,3,2,sk);X(19,ty0+8-b,3,2,sk)}}
    else[[4,sw],[21,-sw]].forEach(([x,s])=>{X(x,ty0+1+s,3,9,topD);if(K==='tee')X(x,ty0+5+s,3,5,sk);X(x,ty0+10+s,3,2,sk)});
    if(o.tote){if(back){L(g,9,ty0,6,ty0+6,'#cfc4a6');X(2,ty0+6,6,8,'#e9dfc8');X(2,ty0+13,6,1,'#cfc4a6')}else{L(g,18,ty0,21,ty0+6,'#cfc4a6');X(20,ty0+6,6,8,'#e9dfc8');X(20,ty0+13,6,1,'#cfc4a6');X(20,ty0+6,6,1,'#f6f1e4')}}
    X(8,ty0,12,1,'rgba(35,33,27,.5)');
  }
  // head
  const hx=(x,y,w,h,col)=>X(x,y+hy,w,h,col),ey=13+hy,my=18+hy,cap=o.cap,st=o.style;
  if(back){
    hx(7,3,14,1,hair);hx(5,4,18,1,hair);hx(4,5,20,13,hair);hx(5,18,18,1,hair);hx(7,19,14,1,hair);hx(10,20,8,1,sk);hx(8,6,5,1,hairL);hx(7,8,2,1,hairL);
    if(st==='long'){hx(4,18,20,8,hair);hx(6,26,16,1,hair);hx(9,12,1,12,hairL);hx(15,14,1,10,hairL)}
    if(st==='bun'){hx(11,0,6,3,hair);hx(12,-1,4,1,hair);hx(12,0,2,1,hairL)}
    if(st==='curly'){[6,9,12,15,18].forEach(x=>hx(x,2,2,1,hair));hx(3,7,1,8,hair);hx(24,7,1,8,hair);[[7,9],[13,7],[18,11],[10,14],[16,16]].forEach(p=>hx(p[0],p[1],2,1,hairL))}
    if(st==='cap'){hx(7,3,14,1,cap);hx(5,4,18,1,cap);hx(4,5,20,6,cap);hx(4,10,20,1,sh(cap,-.25));hx(11,8,6,3,sh(cap,-.3));hx(8,5,5,1,sh(cap,.2))}
    if(o.band){hx(4,7,20,2,o.band);hx(12,9,2,3,o.band)}
    hx(3,12,1,3,skD);hx(24,12,1,3,skD);
  }else if(side){
    hx(5,8,12,11,sk);hx(6,19,10,1,sk);hx(7,20,8,1,sk);hx(4,15,1,2,sk);
    hx(7,3,13,1,hair);hx(6,4,16,1,hair);hx(5,5,19,4,hair);hx(15,9,9,9,hair);hx(16,18,7,1,hair);hx(17,19,5,1,hair);hx(13,9,2,4,hair);hx(6,9,8,1,hair);hx(9,5,6,1,hairL);
    if(st==='long'){hx(15,18,9,8,hair);hx(16,26,7,1,hair);hx(19,12,1,12,hairL)}
    if(st==='bun'){hx(20,1,5,5,hair);hx(21,0,3,1,hair);hx(21,2,2,1,hairL)}
    if(st==='curly'){[7,10,13,16,19].forEach(x=>hx(x,2,2,1,hair));hx(24,7,1,9,hair);hx(4,6,1,3,hair);[[9,6],[16,8],[20,12],[18,16]].forEach(p=>hx(p[0],p[1],2,1,hairL))}
    if(st==='cap'){hx(7,3,13,1,cap);hx(6,4,16,1,cap);hx(5,5,19,4,cap);hx(1,8,9,2,sh(cap,-.25));hx(1,8,9,1,sh(cap,.1));hx(9,5,6,1,sh(cap,.2));hx(6,9,8,1,sk)}
    if(o.band)hx(5,7,19,2,o.band);
    if(o.beard){const b=sh(hair,.06);hx(5,16,9,3,b);hx(6,19,9,1,b);hx(7,20,7,1,b);hx(5,17,4,2,sk)}
    hx(15,12,2,3,sk);hx(16,13,1,1,skD);
    const e=(x,y,w,h,col)=>X(x,ey+y,w,h,col||ink);
    if(ex==='happy'){e(7,1,1,1);e(8,0,2,1);e(10,1,1,1);e(10,3,3,1,'#e58f7d')}
    else if(ex==='calm'){e(7,1,1,1);e(8,2,2,1);e(10,1,1,1)}
    else if(blink){e(7,1,3,1)}
    else if(ex==='surprised'){e(7,-1,3,4);e(7,-1,1,1,'#fff');e(7,-4,4,1,hair)}
    else{e(8,0,2,3);e(8,0,1,1,'#fff');if(ex==='thinking')e(7,-3,4,1,hair)}
    if(mouth)X(6,my,2,2,'#7a2e25');else if(ex==='happy'){X(6,my,3,1,'#9a4a3a');X(9,my-1,1,1,'#9a4a3a')}else if(ex==='surprised')X(6,my,2,2,'#7a2e25');else X(6,my,2,1,'#9a5a48');
    if(o.glasses){e(6,-1,6,1);e(6,3,6,1);e(6,-1,1,5);e(11,-1,1,5);e(12,0,4,1)}
  }else{
    hx(5,8,18,11,sk);hx(6,19,16,1,sk);hx(8,20,12,1,sk);hx(4,13,1,2,skD);hx(23,13,1,2,skD);
    if(st==='cap'){hx(4,9,2,4,hair);hx(22,9,2,4,hair);hx(7,3,14,1,cap);hx(6,4,16,1,cap);hx(4,5,20,4,cap);hx(3,9,22,2,sh(cap,-.25));hx(3,9,22,1,sh(cap,.08));hx(8,5,5,1,sh(cap,.2));hx(13,6,2,2,'#efe6cf')}
    else{hx(7,3,14,1,hair);hx(6,4,16,1,hair);hx(4,5,20,4,hair);hx(4,9,2,4,hair);hx(22,9,2,4,hair);hx(6,9,16,1,hair);hx(6,10,3,1,hair);hx(17,10,5,1,hair);hx(8,5,6,1,hairL);hx(7,7,2,1,hairL);
      if(st==='long'){hx(3,9,3,16,hair);hx(22,9,3,16,hair);hx(4,25,2,1,hair);hx(22,25,2,1,hair)}
      if(st==='bun'){hx(11,0,6,3,hair);hx(12,-1,4,1,hair);hx(12,0,2,1,hairL)}
      if(st==='curly'){[6,9,12,15,18].forEach(x=>hx(x,2,2,1,hair));hx(3,6,1,8,hair);hx(24,6,1,8,hair);hx(9,10,2,1,hair);hx(13,10,2,1,hair);[[10,6],[15,5],[19,8],[5,8]].forEach(p=>hx(p[0],p[1],2,1,hairL))}}
    if(o.band)hx(4,7,20,2,o.band);
    if(o.beard){const b=sh(hair,.06);hx(5,16,2,3,b);hx(21,16,2,3,b);hx(6,17,16,2,b);hx(6,19,16,1,b);hx(8,20,12,1,b);hx(11,17,6,2,sk)}
    const e=(x,y,w,h,col)=>X(x,ey+y,w,h,col||ink),Lx=9,Rx=17;
    if(ex==='happy'){[Lx,Rx].forEach(x=>{e(x-1,1,1,1);e(x,0,2,1);e(x+2,1,1,1)});e(6,3,3,1,'#e58f7d');e(19,3,3,1,'#e58f7d')}
    else if(ex==='calm'){[Lx,Rx].forEach(x=>{e(x-1,1,1,1);e(x,2,2,1);e(x+2,1,1,1)})}
    else if(blink){e(Lx-1,1,3,1);e(Rx,1,3,1)}
    else if(ex==='surprised'){[Lx-1,Rx].forEach(x=>{e(x,-1,3,4);e(x,-1,1,1,'#fff');e(x,-4,3,1,hair)})}
    else if(ex==='thinking'){e(Lx+1,0,2,3);e(Rx+1,0,2,3);e(Lx+1,0,1,1,'#fff');e(Rx+1,0,1,1,'#fff');e(Lx-1,-4,4,1,hair);e(Rx,-2,4,1,hair)}
    else{e(Lx,0,2,3);e(Rx,0,2,3);e(Lx,0,1,1,'#fff');e(Rx,0,1,1,'#fff')}
    if(mouth)X(13,my,2,2,'#7a2e25');
    else if(ex==='happy'){X(12,my,1,1,'#9a4a3a');X(13,my+1,2,1,'#9a4a3a');X(15,my,1,1,'#9a4a3a')}
    else if(ex==='surprised')X(13,my,2,2,'#7a2e25');
    else if(ex==='thinking')X(14,my,3,1,'#9a5a48');
    else if(ex==='calm'){X(12,my,4,1,'#9a5a48')}
    else X(13,my,2,1,'#9a5a48');
    if(o.glasses){[7,15].forEach(x=>{e(x,-1,6,1);e(x,3,6,1);e(x,-1,1,5);e(x+5,-1,1,5)});e(13,0,2,1)}
  }
  g.setTransform(1,0,0,1,0,0);outline(c,[35,33,27]);
  if(!flip)return c;const f=mk(30,44),fg=f.getContext('2d');fg.translate(30,0);fg.scale(-1,1);fg.drawImage(c,0,0);return f}

/* ───────── state ───────── */
const G={state:'title',card:false,stamps:new Set(),six:false,seen:new Set(),shoes:false,boost:0,t:0,lock:false,fin:false,met:false};
const DV={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]},OPP={up:'down',down:'up',left:'right',right:'left'};
const chars=[],byId={};
function mkChar(id,name,tx,ty,dir,o){const c=Object.assign({id,name,o:Object.assign({id},SPEC[o&&o.spec||id]),tx,ty,x:tx*T,y:ty*T,dir,fr:0,ex:'neutral',blink:0,nb:1+Math.random()*4,mouth:0,em:null,pose:'stand',moving:false,mt:0,dur:.2,stepN:0,wait:1,path:null},o||{});chars.push(c);byId[id]=c;return c}
let p;
const propGrid=[];
function setupWorld(){
  for(let y=0;y<MH;y++)propGrid.push(new Array(MW).fill(null));
  props.forEach(q=>{if(q.solid)for(let y=q.ty;y<q.ty+q.td;y++)for(let x=q.tx;x<q.tx+q.tw;x++)propGrid[y][x]=q});
  p=mkChar('player','You',15,34,'up');
  mkChar('ren','Ian',18,21,'down');mkChar('kenji','Ary',14,14,'down');mkChar('mika','Mika',24,17,'down');mkChar('ash','Ash',24,12,'down');
  mkChar('dee','Dee',8,20,'left');mkChar('jo','Jo',17,17,'down',{ai:'wander',rect:[9,17,19,20]});
  mkChar('sora','G',26,6,'left');mkChar('hana','Hana',6,6,'down',{pose:'kneel',ex:'calm'});
  mkChar('local','Venice local',9,25,'right',{ai:'patrol',sgn:1});
  [['l1','Priya',11,9,'down'],['l2','Marcus',13,9,'down'],['l3','Dev',12,11,'up'],['l4','Camille',14,11,'up'],['l5','Theo',17,9,'down'],['l6','Noor',14,12,'right']].forEach(q=>mkChar(q[0],q[1],q[2],q[3],q[4],{pose:'sit',ph:Math.random()*9}));
}
function edge(x,y,dx,dy){if(dx&&y>=5&&y<=9&&y!==7&&((x===8&&dx===1)||(x===9&&dx===-1)))return true;if(dy&&x>=4&&x<=8&&((y===9&&dy===1)||(y===10&&dy===-1)))return true;return false}
const baseSolid=(tx,ty)=>{const t=gt(tx,ty);return t==='void'||t==='gar'||t==='hedge'||t==='fence'||t==='nbr'||t==='wall'};
const charAt=(tx,ty,ex)=>chars.find(c=>c!==ex&&c.tx===tx&&c.ty===ty);
const car={x:-200,y:30*T-6,v:0};
function carHits(tx,ty){return ty>=30&&ty<=31&&tx*T+T>car.x&&tx*T<car.x+48}
function blocked(c,dx,dy){const tx=c.tx+dx,ty=c.ty+dy;return baseSolid(tx,ty)||!!propGrid[ty][tx]||edge(c.tx,c.ty,dx,dy)||!!charAt(tx,ty,c)||(c===p&&carHits(tx,ty))}
function bfs(a,b){const q=[a],seen=new Set([a[0]+','+a[1]]);while(q.length){const[x,y]=q.shift();if(x===b[0]&&y===b[1])return true;for(const k in DV){const[dx,dy]=DV[k],nx=x+dx,ny=y+dy,s=nx+','+ny;if(seen.has(s)||baseSolid(nx,ny)||propGrid[ny][nx]||edge(x,y,dx,dy))continue;seen.add(s);q.push([nx,ny])}}return false}
function step(c,dir,dur){c.dir=dir;const[dx,dy]=DV[dir];if(blocked(c,dx,dy))return false;c.fx=c.x;c.fy=c.y;c.tx+=dx;c.ty+=dy;c.moving=true;c.mt=0;c.dur=dur;c.stepN++;return true}

/* ───────── sound ───────── */
let AC=null,soundOn=true;
function tone(f,d,type,v,when=0,f2){if(!AC||!soundOn)return;const t=AC.currentTime+when,o=AC.createOscillator(),g=AC.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d+.02)}
const sfx={blip:f=>tone((f||420)+Math.random()*40,.035,'square',.018),ok:()=>{tone(660,.07,'triangle',.07);tone(990,.12,'triangle',.06,.07)},sel:()=>tone(520,.04,'triangle',.05),bump:()=>tone(120,.09,'square',.04,0,70),
  stamp:()=>{tone(140,.16,'sine',.3,0,50);tone(70,.1,'square',.08);tone(784,.2,'triangle',.07,.14);tone(1175,.35,'triangle',.06,.26)},pop:()=>tone(880,.06,'triangle',.05,0,1320),door:()=>tone(200,.18,'sine',.03,0,320),fin:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.3,'triangle',.07,i*.13))};
function initAudio(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}

/* ───────── UI ───────── */
const STAMPS=[['藍','Indigo'],['刃','Blade'],['土','Clay'],['灯','Light'],['茶','Matcha'],['和','Harmony']];
const el={};
function buildUI(){
  const s=$('#stamps');STAMPS.forEach((q,i)=>{const d=document.createElement('div');d.className='st';d.style.setProperty('--r',[-7,5,-3,6,-5,4][i]+'deg');d.innerHTML=`<span class="seal">${i===5?'?':q[0]}</span><small>${i===5?'???':q[1]}</small>`;d.addEventListener('animationend',()=>d.classList.remove('new'));s.appendChild(d)});
  ['wrap','c','hint','bubble','narr','banner','finale','title','cnt','loc','dot','seen','scnt','snd'].forEach(k=>el[k]=$('#'+k));
  el.btxt=$('#bubble .txt');el.bnm=$('#bubble .nm');el.bch=$('#bubble .ch');el.ntxt=$('#narr .txt');
}
function refreshCard(newKey){const s=$('#stamps');s.classList.toggle('off',!G.card);el.cnt.textContent=G.card?G.stamps.size+' / 6':'Not yet';
  [...s.children].forEach((d,i)=>{const k=STAMPS[i][0],got=G.stamps.has(k);if(i===5){d.firstChild.textContent=G.six||got?k:'?';d.lastChild.textContent=G.six||got?STAMPS[5][1]:'???'}d.classList.toggle('got',got);if(k===newKey)d.classList.add('new')})}
function addSeen(n){if(!n||G.seen.has(n))return;G.seen.add(n);if(G.seen.size===1)el.seen.innerHTML='';const li=document.createElement('li');li.textContent=n;el.seen.prepend(li);el.scnt.textContent=G.seen.size}
let bannerT=0,curArea='';
function setArea(force){const a=area(p.tx,p.ty);if(a[0]===curArea&&!force)return;curArea=a[0];el.loc.innerHTML=a[0]+(a[1]?`<b>${a[1]}</b>`:'');if(G.state==='play'){el.banner.innerHTML=a[0]+(a[1]?`<b>${a[1]}</b>`:'');el.banner.classList.add('on');bannerT=2.2}}

/* ───────── dialogue ───────── */
const dlg={active:false,q:[],cur:null,shown:0,focus:null,sel:0,done:null,bl:0};
function run(steps,done){dlg.q=steps.slice();dlg.done=done||null;dlg.active=true;el.hint.hidden=true;next()}
function next(){
  if(dlg.cur&&dlg.cur.c0)dlg.cur.c0.mouth=0;
  const s=dlg.q.shift();
  if(s===undefined){dlg.active=false;dlg.cur=null;el.bubble.hidden=true;el.narr.hidden=true;chars.forEach(c=>{c.busy=false;if(c.pose!=='kneel')c.ex='neutral';else c.ex='calm'});dlg.focus=null;const d=dlg.done;dlg.done=null;if(d)d();if(G.stamps.size===6&&!G.fin&&!dlg.active){G.fin=true;const f=()=>{if(dlg.active)return setTimeout(f,300);el.finale.hidden=false;el.hint.hidden=true;sfx.fin()};setTimeout(f,500)}return}
  if(typeof s==='function'){const r=s();if(Array.isArray(r))dlg.q=r.concat(dlg.q);return next()}
  const st=Array.isArray(s)?{w:s[0],t:s[1],e:s[2],m:s[3]}:s;st.c0=st.w?byId[st.w]:null;dlg.cur=st;dlg.shown=0;dlg.sel=0;
  if(st.c0){const c=st.c0;dlg.focus=c;c.busy=true;if(st.e)c.ex=st.e;if(st.m){c.em={k:st.m,t:0};sfx.pop()}el.narr.hidden=true;el.bubble.hidden=false;el.bnm.textContent=c.name;el.btxt.textContent='';el.bch.hidden=true}
  else{el.bubble.hidden=true;el.narr.hidden=false;el.ntxt.textContent=''}
}
function dlgTick(dt){const s=dlg.cur;if(!s)return;const n=s.t.length;
  if(dlg.shown<n){const b=dlg.shown;dlg.shown=Math.min(n,dlg.shown+dt*52);const tx=s.t.slice(0,dlg.shown|0);(s.c0?el.btxt:el.ntxt).textContent=tx;if((dlg.shown|0)>(b|0)&&((dlg.shown|0)%2===0)&&/\w/.test(s.t[(dlg.shown|0)-1]||''))sfx.blip(s.c0?s.c0.o.v:180);
    if(s.c0)s.c0.mouth=(G.t*11|0)%2;if(dlg.shown>=n)fin(s)}
}
function fin(s){dlg.shown=s.t.length;const t=s.c0?el.btxt:el.ntxt;t.textContent=s.t;if(s.c0)s.c0.mouth=0;
  if(s.c){el.bch.innerHTML='';s.c.forEach((o,i)=>{const li=document.createElement('li');li.textContent=o[0];if(i===0)li.className='sel';li.onclick=e=>{e.stopPropagation();dlg.sel=i;choose()};el.bch.appendChild(li)});el.bch.hidden=false}
  else{const m=document.createElement('span');m.className='more';m.textContent='▾';t.appendChild(m)}}
function choose(){const s=dlg.cur;sfx.ok();const r=s.c[dlg.sel][1]();dlg.q=(r||[]).concat(dlg.q);next()}
function advance(){const s=dlg.cur;if(!s)return;if(dlg.shown<s.t.length){fin(s);return}if(s.c){choose();return}sfx.sel();next()}
function moveSel(d){const s=dlg.cur;if(!s||!s.c||dlg.shown<s.t.length)return;dlg.sel=(dlg.sel+d+s.c.length)%s.c.length;[...el.bch.children].forEach((li,i)=>li.classList.toggle('sel',i===dlg.sel));sfx.sel()}
const award=k=>()=>{if(G.stamps.has(k))return;G.stamps.add(k);refreshCard(k);sfx.stamp();p.em={k:'heart',t:0};p.ex='happy';p.exT=2.2};
const stampLook=(pr)=>{const k=pr.stamp,s=[[null,pr.look]];if(G.stamps.has(k))return s;
  if(!G.card)s.push([null,'A small rubber stamp and an ink pad sit beside it. Ian, by the front door, has the cards.']);
  else s.push(award(k),[null,`You press the stamp onto your card. ${k}  ${STAMPS.find(q=>q[0]===k)[1]}.`]);return s};
const TALK={
  ren:()=>{if(!G.card)return renWelcome();
    const h={'藍':['Ary is at the denim wall, straight back from the door. Ask him anything. Clear your afternoon first.','happy'],'刃':['The knife case is on the right side of the floor. Look all you want. Mika will take one out if you ask.'],'土':['Ceramics are on the shelf by the right-hand wall. Pick one up. They\'re made to be handled.'],'灯':['Paper lamps, front right corner, by the window. They look better the longer you stand there.'],'茶':['The café is around the back. Out the front, turn right, up the side street, left into the alley. G will take it from there.'],'和':G.six?['Last one is the tea room, past the people on laptops. Hana runs it. Shoes off at the tatami.','calm']:['There\'s one more back there, but it\'s G\'s to tell you about. Order the matcha.','thinking','…']};
    for(const q of STAMPS)if(!G.stamps.has(q[0]))return[['ren',h[q[0]][0],h[q[0]][1],h[q[0]][2]]];
    return[['ren','A full card. That\'s rarer than you would think. Most people get as far as the sofa.','happy','heart']]},
  kenji:()=>G.stamps.has('藍')?[['kenji','Come back in a year and show me the fades. I mean that.','happy']]:[
    ['kenji','You went straight to the denim. Good. That\'s the right wall.','neutral','!'],
    ['kenji','Everything you see is high quality Japanese denim from some of the best brands. Most of them are sourced from the indigo artisans in Okayama.','happy'],
    ['kenji','It\'s woven on shuttle looms from the fifties. Slow and loud, and the edge of the cloth comes off finished. Flip a cuff and you can see it. That\'s the selvedge.'],
    ['kenji','The indigo is rope-dyed, so the middle of each thread stays white. That\'s why these fade, instead of just getting old.','thinking'],
    ['kenji','Wear them six months before the first wash. Or wash them tomorrow. They\'re your pants.','happy'],
    ...(G.card?[award('藍'),[null,'Ary inks a stamp and presses it onto your card. 藍  Indigo.']]:[['kenji','There\'s a stamp for this wall. Ian has the cards, up by the door.']])],
  mika:()=>G.mika?[['mika','The honest test is a tomato. A good edge goes through under the weight of the knife.','calm']]:[()=>{G.mika=1},
    ['mika','These are from Seki. They have made blades there for about eight hundred years. Swords first, then kitchen knives once that market dried up.','neutral','note'],
    ['mika','The long one on the left is a gyuto. If you\'re only going to own one good knife, own that one.'],
    ['mika','I can take any of them out for you. I just have to stand here the whole time you\'re holding it.','happy']],
  dee:()=>G.dee?[['dee','Don\'t tell them, but the thing I actually want is the rug.','thinking']]:[()=>{G.dee=1},
    ['dee','I came in for a candle. That was forty minutes ago.','neutral','…'],['dee','I\'ve sat on this sofa twice. I think it\'s working on me.','happy']],
  jo:()=>G.jo?[['jo','If anyone asks, I was only looking.','happy']]:[()=>{G.jo=1},
    ['jo','I was sent in here for one cup. One. I\'m now holding three jackets.','surprised','!'],['jo','Did you know there\'s a kind of jacket with no buttons at all? I did not. I need two.','happy']],
  sora:()=>{const menu=(t,e)=>({w:'sora',t,e,c:[['Matcha, whisked thin',()=>[
        ['sora','Good. This one\'s from Uji, just outside Kyoto. Stone-milled, about an ounce an hour, which is why I get protective of it.','happy'],
        [null,'He sifts, pours and whisks. The bowl comes across the bar with a fine green foam on top.'],
        ['sora','No milk, no syrup. Give it a second. The bitter turns sweet.','calm'],
        ()=>{G.boost=75;p.em={k:'note',t:0}},[null,'It\'s bright and grassy and gone too fast. Your legs feel lighter.'],
        ...(G.stamps.has('茶')?[]:G.card?[award('茶'),[null,'G stamps your card. 茶  Matcha.'],()=>{G.six=true;refreshCard()},
          ['sora','Since you took it straight: there\'s a sixth stamp. It\'s not on the card until someone tells you.','happy','tea'],
          ['sora','Tea room, far end, past the laptops. Hana makes it the long way. Shoes off at the tatami.']]
          :[['sora','There\'s a stamp for that, if you had a card. Ian hands them out at the front door.','thinking']])]],
      ['Kyoto-style cold drip',()=>[['sora','Twelve hours through a glass tower, one drop at a time. I set this one up last night.'],()=>{G.boost=75;p.em={k:'note',t:0}},[null,'Clean, a little like cocoa. You feel quicker on your feet.'],
        ...(G.stamps.has('茶')?[]:[['sora','The stamp is for the matcha, though. No pressure. Some pressure.','happy']])]],
      ['Just looking',()=>[['sora','Look all you want. The stools are free.','happy']]]]});
    return G.sora?[menu('Back again. What can I get you?','happy')]:[()=>{G.sora=1},['sora','Hey. You found us around back. Most people walk right past the alley.','happy','!'],menu('What can I get you?')]},
  hana:()=>G.stamps.has('和')?[['hana','Stay as long as you like. The kettle is the only clock in here.','calm']]:!G.stamps.has('茶')?[['hana','You\'re welcome to sit. If you want tea made the slow way, have a bowl at the bar first. This is better once you know the quick version.','calm','tea']]:[
    ['hana','Sit anywhere. There\'s no wrong cushion.','calm','tea'],
    ['hana','I\'ll tell you what I\'m doing as I do it. It\'s mostly paying attention.','neutral'],
    ['hana','First I wipe the scoop. It\'s already clean. The point is that you watch me do it.','calm'],
    [null,'She folds a cloth and draws it down the bamboo scoop once, slowly.'],
    ['hana','Two scoops of tea. Water just off the boil. Then the whisk, fast, from the wrist, like writing the letter M.','neutral'],
    [null,'The whisk taps the bowl. A fine green foam comes up.'],
    ['hana','Take the bowl in your right hand and rest it on your left. Turn it twice toward you. The front is its best side, and you leave that facing the room.','calm'],
    ['hana','Three sips. On the last one, a small slurp. It tells me you finished, and that it was good.','happy'],
    [null,'Three sips. A small slurp. The room is very quiet, and that turns out to be fine.'],
    ['hana','That\'s all of it. People have done exactly this for four hundred years. Now also you.','happy','heart'],
    ...(G.card?[award('和'),[null,'Hana presses the last stamp onto your card. 和  Harmony.']]:[])],
  local:()=>G.loc?[['local','The café is around back. Seriously, go check out the tea room.','happy']]:[()=>{G.loc=1},
    ['local','Yoo, have you seen this new store? Finally we have a cool store in Venice where we can discover new brands and home goods!','happy','!'],
    ['local','Btw the café is around back. There\'s a sick tea room and some tables you can work on!','happy']],
  ash:()=>G.stamps.size===6?[['ash','You did the whole card. Thanks for taking the long way around.','happy','heart']]:G.ash?[['ash','Take your time. I\'m not going anywhere.','happy']]:[()=>{G.ash=1},
    ['ash','Hey, I\'m Ash. This is the counter, so if anything follows you over here, I\'ll wrap it up.','happy','!'],
    ['ash','Everything goes out in kraft paper and string. Takes a minute. That\'s on purpose.','calm']],
  l1:()=>[['l1','The deck is due at five. The matcha is doing what it can.','thinking','…']],
  l2:()=>[['l2','Sorry, I\'m on a call. Well. I\'m about to be on a call.','surprised','!']],
  l3:()=>[['l3','I\'ve been "working from the tea shop" for three weeks. Nobody has questioned it.','happy']],
  l4:()=>[['l4','The wifi password is printed on the receipt. So you do have to order something.','neutral']],
  l5:()=>[['l5','It\'s a screenplay. It\'s about a guy writing a screenplay in a tea shop. Don\'t say anything.','thinking','…']],
  l6:()=>[['l6','Headphones in. Nothing is playing. Please keep that between us.','happy','note']],
};
function renWelcome(){return[
  ['ren','Hey, come on in. First time?','happy'],
  ['ren','Welcome to our multi-brand select shop. We\'ve spent years traveling around Japan, finding great makers and objects. Most of what you see here comes from the brands and artisans we discovered along the way.'],
  ['ren','Feel free to wander around and discover something new. If you need help or have any questions, you can always ask me, Ary or Ash.','happy'],
  ['ren','One more thing. Train stations in Japan keep a rubber stamp by the gate. You ink a page to prove you were there. We stole the idea.','thinking'],
  ()=>{G.card=true;refreshCard();sfx.ok();p.em={k:'!',t:0}},[null,'Ian hands you a stamp card. Six empty circles.'],
  ['ren','Don\'t forget to say hi to G in the café around back. He has a stamp for you and some of the best matcha in the world, from Kyoto!','happy'],
  ['ren','No rush, feel free to explore.','happy']]}
const WALLTXT=tx=>tx<=8?['Indigo patchwork','A framed piece of boro: a hundred years of indigo patches, sewn over each other until the cloth was mostly repair.']:tx<=12?['Linen shirts','Linen shirts, washed until soft. Cream, bone, oat. The differences are small and they matter.']:tx<=16?['Denim wall','Jackets and jeans in rope-dyed indigo, hung in order from darkest to most worn.']:tx<=20?['Wrap jackets','Olive wrap jackets, cut like a farmer\'s coat. Two ties, no buttons.']:tx<=22?['Black coats','Long coats in heavy black wool. Ink black, the kind that eats light.']:['Walnut wall','Walnut panels, lit from above. The wall runs at an angle, and so does everything hung on it.'];
function facing(){const[dx,dy]=DV[p.dir],tx=p.tx+dx,ty=p.ty+dy;if(edge(p.tx,p.ty,dx,dy))return null;
  const c=charAt(tx,ty,p);if(c)return{c,x:c.x+8,y:c.y-27};
  const pr=propGrid[ty]&&propGrid[ty][tx];
  if(pr){if(pr.through){const n=byId[pr.through];return{c:n,x:n.x+8,y:n.y-27-(n.pose==='kneel'?-6:0)}}if(pr.look)return{p:pr,x:pr.inv?tx*T+8:pr.x+pr.s.width/2,y:pr.inv?ty*T-18:Math.max(pr.y,ty*T-30)};return null}
  const t=gt(tx,ty);
  if(t==='wall'&&inB(tx,ty)&&ty===wrow(tx)&&dy===-1)return{w:WALLTXT(tx),x:tx*T+8,y:ty*T-22};
  if(t==='wall'&&ty===23&&dy===-1&&((tx>=6&&tx<=12)||(tx>=19&&tx<=25)))return{w:tx<14?['Left window','Through the glass: jackets on a rail, lit warm from above.']:['Right window','Through the glass: a vase, a paper lamp and a great deal of calm.'],x:tx*T+8,y:ty*T-14};
  if(t==='gar')return{w:['Garage door','The garage door, rolled all the way up. The bar runs right up to the opening. Brass numbers on the wall: 2324.'],x:tx*T+8,y:ty*T-14};
  if(t==='nbr'&&dy===-1)return{w:['The neighbor','The neighbor shapes surfboards. The roll-up door is half open and the air smells like resin.'],x:tx*T+8,y:ty*T-14};
  if(t==='fence')return{w:['Alley fence','A cedar fence. Bougainvillea is working its way over the top.'],x:tx*T+8,y:ty*T+2};
  return null}
function interact(){const f=facing();if(!f){return}sfx.ok();
  if(f.c){const c=f.c;if(c.pose==='stand'&&!c.moving){const dx=p.x-c.x,dy=p.y-c.y;c.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up')}c.busy=true;run(TALK[c.id]())}
  else if(f.p){addSeen(f.p.name);run(f.p.stamp?stampLook(f.p):[[null,f.p.look]])}
  else{addSeen(f.w[0]);run([[null,f.w[1]]])}}

/* ───────── input ───────── */
const held=[],keys=new Set();
const KD={ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down',ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right'},KA=['KeyZ','Enter','Space','NumpadEnter'],KR=['KeyX','ShiftLeft','ShiftRight'];
function press(k){initAudio();if(AC&&AC.state==='suspended')AC.resume();
  if(k==='act'){if(G.state==='title')return start();if(!el.finale.hidden)return;if(dlg.active)return advance();if(!G.lock&&!p.moving)interact();return}
  if(k==='run'){keys.add('run');return}
  if(G.state==='title')return;
  if(dlg.active){if(k==='up')moveSel(-1);if(k==='down')moveSel(1);return}
  if(!held.includes(k))held.push(k)}
function release(k){if(k==='run')keys.delete('run');const i=held.indexOf(k);if(i>=0)held.splice(i,1)}
function bindInput(){
  addEventListener('keydown',e=>{const d=KD[e.code],a=KA.includes(e.code),r=KR.includes(e.code);if(!(d||a||r))return;if(e.target.tagName==='BUTTON'&&a&&e.target.id!=='keep')e.target.blur();if(e.target.id==='keep')return;e.preventDefault();if(e.repeat)return;press(d||(a?'act':'run'))});
  addEventListener('keyup',e=>{const d=KD[e.code];if(d)release(d);if(KR.includes(e.code))release('run')});
  addEventListener('blur',()=>{held.length=0;keys.clear()});
  el.wrap.addEventListener('pointerdown',e=>{if(e.target.closest('#finale'))return;if(G.state==='title'||dlg.active)press('act')});
  document.querySelectorAll('#pad button').forEach(b=>{const k=b.dataset.k;const dn=e=>{e.preventDefault();b.classList.add('on');press(k)},up=e=>{e.preventDefault();b.classList.remove('on');if(k!=='act')release(k)};b.addEventListener('pointerdown',dn);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);b.addEventListener('pointerleave',up);b.addEventListener('contextmenu',e=>e.preventDefault())});
  el.snd.onclick=()=>{soundOn=!soundOn;el.snd.textContent='Sound '+(soundOn?'on':'off');initAudio();el.snd.blur()};
  $('#keep').onclick=()=>{el.finale.hidden=true;sfx.ok()};
  if(matchMedia('(hover:none) and (pointer:coarse)').matches)document.body.classList.add('touch');
}
function start(){G.state='play';el.title.hidden=true;sfx.ok();setArea(true);setTimeout(()=>run([['player','Hmm, what\'s that store across the street?','thinking','?'],['player','Looks cool. Let\'s go check it out.','happy']]),450)}

/* ───────── update ───────── */
const cam={x:0,y:0,z:1.3,cx:256,cy:372};
const fx={roof:1,fac:0,back:0,diag:0,sho:0,dimS:0,dimB:0,door:0,tdoor:0};
let lastStepEnd=0,turnAt=0,bumpAt=0;
function arrive(){
  setArea();
  if(!G.met&&p.ty===22&&DOORX.includes(p.tx)){G.met=true;G.lock=true;held.length=0;const ren=byId.ren;ren.em={k:'!',t:0};sfx.pop();ren.dir='left';
    setTimeout(()=>{ren.path=[];for(let x=ren.tx;x>p.tx;x--)ren.path.push('left');ren.onPath=()=>{ren.dir='down';p.dir='up';G.lock=false;ren.busy=true;run(renWelcome(),()=>{ren.path=[];for(let x=ren.tx;x<18;x++)ren.path.push('right');ren.onPath=()=>{ren.dir='down'}})}},650)}
  if(isTea(p.tx,p.ty)&&!G.shoes){G.shoes=true;held.length=0;run([[null,'You slip off your shoes.']])}
}
function moveChar(c,dt){if(!c.moving)return;c.mt+=dt;const t=Math.min(1,c.mt/c.dur);c.x=c.fx+(c.tx*T-c.fx)*t;c.y=c.fy+(c.ty*T-c.fy)*t;c.fr=t<.55?(c.stepN&1?1:3):0;if(t>=1){c.moving=false;c.fr=0;if(c===p){lastStepEnd=performance.now();arrive()}}}
function update(dt){
  G.t+=dt;if(G.boost>0)G.boost-=dt;
  // player
  if(G.state==='play'&&!p.moving&&!dlg.active&&!G.lock&&held.length){const d=held[held.length-1],now=performance.now();
    if(p.dir!==d){p.dir=d;turnAt=now}
    if(now-turnAt>85||now-lastStepEnd<60){const dur=(keys.has('run')?.115:.19)*(G.boost>0?.78:1);if(!step(p,d,dur)&&now-bumpAt>320){bumpAt=now;sfx.bump()}}}
  if(p.exT>0){p.exT-=dt;if(p.exT<=0&&!dlg.active)p.ex='neutral'}
  chars.forEach(c=>{moveChar(c,dt);c.nb-=dt;if(c.blink>0)c.blink-=dt;if(c.nb<=0){c.blink=.13;c.nb=1.8+Math.random()*4}if(c.em){c.em.t+=dt;if(c.em.t>1.5)c.em=null}
    if(c.pose==='sit'&&!c.busy)c.fr=((G.t*5+c.ph)|0)%2;
    if(c.moving||c.busy)return;
    if(c.path){if(c.path.length){const d=c.path[0];if(step(c,d,.24))c.path.shift()}else{c.path=null;const f=c.onPath;c.onPath=null;if(f)f()}return}
    if(G.state!=='play')return;
    if(c.ai==='patrol'){c.wait-=dt;if(c.wait>0)return;const d=c.sgn>0?'right':'left';if((c.sgn>0&&c.tx>=30)||(c.sgn<0&&c.tx<=1)){c.sgn*=-1;c.wait=1.4;return}if(!step(c,d,.3))c.wait=.4}
    if(c.ai==='wander'){c.wait-=dt;if(c.wait>0)return;c.wait=1.2+Math.random()*3;const d=['up','down','left','right'][Math.random()*4|0],[dx,dy]=DV[d],nx=c.tx+dx,ny=c.ty+dy;if(nx>=c.rect[0]&&nx<=c.rect[2]&&ny>=c.rect[1]&&ny<=c.rect[3])step(c,d,.34);else c.dir=d}});
  // car
  {const ahead=(p.ty>=30&&p.ty<=31||(p.moving&&p.y>29*T+4&&p.y<32*T))&&p.x+T>car.x+30&&p.x<car.x+48+40;const tv=ahead||G.state==='title'&&0?0:78;car.v+=(tv-car.v)*Math.min(1,dt*(tv?2:9));car.x+=car.v*dt;if(car.x>WPX+80)car.x=-140-Math.random()*500}
  // modes
  const tx=p.tx,ty=p.ty,shop=isShop(tx,ty),tea=isTea(tx,ty),bk=isBack(tx,ty),alley=ty<=3&&tx<=31&&!bk,inside=shop||bk;
  const tg={roof:inside?0:alley?.08:1,fac:inside?1:0,back:alley?1:0,diag:bk||alley?1:0,sho:tea?1:0,dimS:bk||alley?.5:0,dimB:shop?.5:alley?.12:0,
    door:chars.some(c=>Math.abs(c.x+8-256)<26&&Math.abs(c.y-368)<30)?1:0,tdoor:Math.abs(p.x-136)<22&&Math.abs(p.y-112)<10?1:0};
  if(G.state==='title'){tg.roof=1;tg.fac=0}
  for(const k in tg){const r=k==='door'||k==='tdoor'?7:4.5;if(k==='door'&&Math.abs(tg[k]-fx[k])>.98)sfx.door();fx[k]+=(tg[k]-fx[k])*Math.min(1,dt*r);if(Math.abs(tg[k]-fx[k])<.004)fx[k]=tg[k]}
  // camera
  let tz=1,cx,cy;
  if(G.state==='title'){tz=1.3;cx=256+Math.sin(G.t*.13)*86;cy=372+Math.sin(G.t*.09)*5}
  else if(dlg.active&&dlg.focus){tz=5/3;const c=dlg.focus;cx=(c.x+8)*.68+(p.x+8)*.32;cy=c.y-34+(c.pose==='kneel'?6:0)}
  else{cx=p.x+8;cy=p.y-4}
  const kf=G.state==='title'?1:Math.min(1,dt*(dlg.active?5:11));
  cam.z+=(tz-cam.z)*Math.min(1,dt*5);if(Math.abs(cam.z-tz)<.003)cam.z=tz;cam.cx+=(cx-cam.cx)*kf;cam.cy+=(cy-cam.cy)*kf;
  const vw=VW/cam.z,vh=VH/cam.z;cam.x=Math.max(0,Math.min(WPX-vw,cam.cx-vw/2));cam.y=Math.max(0,Math.min(HPX-vh,cam.cy-vh/2));
  if(bannerT>0){bannerT-=dt;if(bannerT<=0)el.banner.classList.remove('on')}
  if(dlg.active)dlgTick(dt);
}

/* ───────── render ───────── */
let cv,g,U=2;
const petals=[];for(let i=0;i<30;i++)petals.push({x:380+Math.random()*260,y:Math.random()*330,v:8+Math.random()*8,ph:Math.random()*6});
const POLES=[].map(q=>[q[0]*T+8,(q[1]+1)*T-66]);
function charKey(c){const ext=c.ty>=24||c.tx>=29;let k=c.y+15;if(c.ty===23&&!c.moving||(c.y>22*T+2&&c.y<24*T-2&&DOORX.includes(c.tx)))k=385;if(c.y<5*T-2&&c.y>3*T+2&&CAFX.includes(c.tx))k=81;return k+(ext?100000:0)}
function glow(x,y,r,a){const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,`rgba(255,206,130,${a})`);gr.addColorStop(1,'rgba(255,206,130,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,2*r,2*r)}
function render(){
  const k=cv.width/VW,s=k*cam.z;g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.fillStyle='#1b1917';g.fillRect(0,0,cv.width,cv.height);
  g.setTransform(s,0,0,s,Math.round(-cam.x*s),Math.round(-cam.y*s));g.imageSmoothingEnabled=false;
  g.drawImage(ground,0,0);
  // side walls (tops only)
  [48,448].forEach(x=>{g.fillStyle=C.pl;g.fillRect(x,36,16,348);g.fillStyle='#f6f2e8';g.fillRect(x+2,38,2,344);g.fillStyle=C.ink;g.fillRect(x,36,1,348);g.fillRect(x+15,36,1,348)});
  const it=[];const add=(key,fn)=>it.push({key,fn});
  const A=a=>{g.globalAlpha=a};
  add(70,()=>{g.drawImage(S.barV,399,57);g.drawImage(S.backbarV,431,57)});
  add(80,()=>{if(fx.back<1){A(1-fx.back);g.drawImage(W.backT,48,36)}if(fx.back>0){A(fx.back);g.drawImage(W.backL,48,28)}A(1)});
  add(82,()=>{g.drawImage(W.shoE,0,0,6,38,141,74,6,38);g.drawImage(W.shoE,0,48,6,46,141,128,6,34);g.drawImage(W.shoD,141,108-fx.tdoor*20);
    if(G.shoes&&isTea(p.tx,p.ty)){g.fillStyle='#f4f1ea';g.fillRect(150,121,2,4);g.fillRect(153,121,2,4);g.fillStyle=C.ink;g.fillRect(150,125,2,1);g.fillRect(153,125,2,1)}});
  add(161,()=>{if(fx.sho<1){A(1-fx.sho);g.drawImage(W.shoT,63,134)}if(fx.sho>0){A(fx.sho);g.drawImage(W.shoL,63,154)}A(1)});
  for(let tx=4;tx<=27;tx++){const sx=(tx-4)*16,w=tx===27?16:17;add(163+(27-tx)*4+7,()=>{if(fx.diag<1){A(1-fx.diag);g.drawImage(W.diagT,sx,0,w,140,tx*16,128,w,140)}if(fx.diag>0){A(fx.diag);g.drawImage(W.diagL,sx,0,w,140,tx*16,128,w,140)}A(1)})}
  add(384,()=>{if(fx.fac<1){A(1-fx.fac);g.drawImage(W.facT,48,320);const w=16*(1-fx.door*.88);g.fillStyle='rgba(196,224,228,.42)';g.fillRect(240,347,w,37);g.fillRect(272-w,347,w,37);g.fillStyle='#2a2622';g.fillRect(240+w-1,347,1,37);g.fillRect(272-w,347,1,37);g.fillStyle='rgba(255,255,255,.5)';g.fillRect(241,350,1,20);g.fillRect(270,350,1,20)}
    if(fx.fac>0){A(fx.fac);g.drawImage(W.facL,48,362)}A(1)});
  add(386,()=>{if(fx.fac<1){A(1-fx.fac);g.drawImage(W.noren,240,345);A(1)}});
  props.forEach(q=>{if(q.inv)return;add(q.key,()=>{let a=1;if(q.tall&&p.x+16>q.x+6&&p.x<q.x+q.s.width-6&&p.y+16<=q.ty*T+T&&p.y>q.y-8)a=.4;if(a<1)A(a);g.drawImage(q.s,q.x,q.y);if(a<1)A(1)})});
  chars.forEach(c=>add(charKey(c),()=>{g.fillStyle='rgba(20,16,12,.22)';g.beginPath();g.ellipse(c.x+8,c.y+15,7,2.5,0,0,7);g.fill();
    const sp=charSprite(c.o,c.dir,c.fr,c.ex,c.blink>0,c.mouth,c.pose),fd=c===p&&dlg.focus&&dlg.focus.tx===p.tx&&dlg.focus.ty===p.ty-1;if(fd)A(.42);g.drawImage(sp,c.x-7,c.y-27);if(fd)A(1);
    if(c.em){const t=c.em.t,b=t<.18?(1-t/.18)*5:0,a=t>1.2?1-(t-1.2)/.3:1;A(Math.max(0,a));g.drawImage(S.em[c.em.k],c.x+12,c.y-40+(c.pose==='kneel'?6:c.pose==='sit'?3:0)+b);A(1)}}));
  add(100000+car.y+28,()=>g.drawImage(car.s,car.x,car.y));
  add(100000+384,()=>g.drawImage(W.nbr,0,20));
  add(99990,()=>{const dh=WH+(LOW-WH)*fx.diag+3;if(fx.dimB>0){g.fillStyle=`rgba(22,17,12,${fx.dimB})`;g.beginPath();g.moveTo(64,36);g.lineTo(448,36);g.lineTo(448,163-dh);g.lineTo(64,259-dh);g.fill()}
    if(fx.dimS>0){g.fillStyle=`rgba(22,17,12,${fx.dimS})`;g.beginPath();g.moveTo(64,259-dh);g.lineTo(448,163-dh);g.lineTo(448,384);g.lineTo(64,384);g.fill()}
    if(fx.roof<1){g.globalCompositeOperation='lighter';glows.forEach(q=>{if(!q.ext)glow(q.x,q.y,q.r,q.a*(1-fx.roof))});g.globalCompositeOperation='source-over'}
    // kettle steam
    for(let i=0;i<3;i++){const t=(G.t*.5+i/3)%1;g.fillStyle=`rgba(255,255,255,${(.5*(1-t)*(1-fx.roof)).toFixed(3)})`;g.fillRect(108+Math.sin(t*6+i)*2,104-t*14,1,2)}});
  add(99999,()=>{if(fx.roof>0){A(fx.roof);g.drawImage(W.roof,48,16);g.drawImage(W.sign,340,0);A(1)}});
  it.sort((a,b)=>a.key-b.key);for(const i of it)i.fn();
  // overlays in world space
  g.globalCompositeOperation='lighter';glows.forEach(q=>{if(q.ext)glow(q.x,q.y,q.r,q.a)});g.globalCompositeOperation='source-over';
  g.strokeStyle='rgba(30,28,26,.7)';g.lineWidth=.7;for(let i=0;i<POLES.length-1;i++){const a=POLES[i],b=POLES[i+1];[-9,0,9].forEach(o=>{g.beginPath();g.moveTo(a[0]+o,a[1]);g.quadraticCurveTo((a[0]+b[0])/2+o,(a[1]+b[1])/2+14,b[0]+o,b[1]);g.stroke()})}
  petals.forEach(q=>{const t=G.t,y=(q.y+t*q.v)%330,x=q.x-((t*q.v*.6)%200)+Math.sin(t*1.3+q.ph)*5;g.fillStyle=q.ph>3?'#b3a2e0':'#8f7ac8';g.fillRect(x,y,q.ph>4.5?2:1,1)});
  // screen space: warm wash + vignette
  g.setTransform(1,0,0,1,0,0);g.fillStyle='rgba(255,176,96,.055)';g.fillRect(0,0,cv.width,cv.height);
  const vg=g.createRadialGradient(cv.width/2,cv.height/2,cv.height*.45,cv.width/2,cv.height/2,cv.width*.72);vg.addColorStop(0,'rgba(20,14,8,0)');vg.addColorStop(1,'rgba(20,14,8,.42)');g.fillStyle=vg;g.fillRect(0,0,cv.width,cv.height);
  // DOM overlays
  const sx=x=>(x-cam.x)*cam.z*U,sy=y=>(y-cam.y)*cam.z*U;
  el.dot.style.left=(p.x+8)/WPX*100+'%';el.dot.style.top=(p.y+8)/HPX*100+'%';
  if(G.state==='play'&&!dlg.active&&!G.lock&&!p.moving&&el.finale.hidden){const f=facing();if(f){el.hint.hidden=false;el.hint.innerHTML=`<b>${touch?'A':'Z'}</b>${f.c?'talk':'look'}`;el.hint.style.left=sx(f.x)+'px';el.hint.style.top=Math.max(14*U,sy(f.y))+'px'}else el.hint.hidden=true}else el.hint.hidden=true;
  if(dlg.active&&dlg.cur&&dlg.cur.c0){const c=dlg.cur.c0,b=el.bubble,W0=el.wrap.clientWidth,bw=b.offsetWidth,bh=b.offsetHeight,hx=sx(c.x+8),hy=sy(c.y-27+(c.pose==='kneel'?6:c.pose==='sit'?3:0));
    const left=Math.max(4*U,Math.min(W0-bw-4*U,hx-bw/2)),top=Math.max(9*U,hy-bh-9*U);b.style.left=left+'px';b.style.top=top+'px';b.style.setProperty('--tx',Math.max(10*U,Math.min(bw-10*U,hx-left))+'px')}
}
let touch=false;
function fit(){const st=$('.stage'),mob=matchMedia('(max-width:820px)').matches,bar=$('.bar'),pad=$('#pad');let w;
  if(mob)w=st.clientWidth;else{const ah=st.clientHeight-bar.offsetHeight-6-(touch?pad.offsetHeight+6:0);w=Math.max(240,Math.floor(Math.min(st.clientWidth,ah*1.6)))}
  el.wrap.style.width=w+'px';el.wrap.style.height=Math.round(w/1.6)+'px';U=w/VW;el.wrap.style.setProperty('--u',U+'px');bar.style.width=w+'px';
  const dpr=Math.min(window.devicePixelRatio||1,2);cv.width=Math.max(480,Math.min(1920,Math.round(w*dpr)));cv.height=Math.round(cv.width/1.6)}
function boot(){
  buildUI();cv=el.c;g=cv.getContext('2d');
  buildGround();buildWalls();buildSprites();placeProps();setupWorld();buildMini();car.s=S.car('#3d5a6c',1);
  touch=matchMedia('(hover:none) and (pointer:coarse)').matches;bindInput();refreshCard();setArea(true);fit();addEventListener('resize',fit);
  if(!bfs([15,34],[15,23])||!bfs([15,23],[20,5])||!bfs([20,5],[6,8])||!bfs([15,22],[24,8])||!bfs([15,23],[24,6]))console.error('TSUKASA: a route is blocked');
  window.__tsukasa={G,p,chars,byId,props,bfs,cam,fx,dlg,press,release,facing,tp:(x,y,d)=>{p.tx=x;p.ty=y;p.x=x*T;p.y=y*T;if(d)p.dir=d;arrive()}};
  let last=performance.now();const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;update(dt);render();requestAnimationFrame(loop)};requestAnimationFrame(loop);
}
boot();
