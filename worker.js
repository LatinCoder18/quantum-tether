addEventListener("fetch", event => {
  event.respondWith(new Response(page(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  }));
});

function page() {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Quantum Tether | adonys.dev</title>
  <style>
    :root{--a:#00e5ff;--b:#ff3bb8;--g:#ffd84d;--bg:#070816;--glass:rgba(14,18,35,.72);--text:#ebeeff}
    *{box-sizing:border-box} html,body{margin:0;height:100%;overflow:hidden;background:radial-gradient(circle at 20% 20%,rgba(0,229,255,.12),transparent 30%),radial-gradient(circle at 80% 20%,rgba(255,59,184,.12),transparent 28%),radial-gradient(circle at 50% 80%,rgba(255,216,77,.08),transparent 30%),var(--bg);color:var(--text);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
    #w{position:relative;width:100vw;height:100vh}
    canvas{position:absolute;inset:0;width:100%;height:100%}
    .grid{position:absolute;inset:0;opacity:.45;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(circle at center,black 35%,transparent 100%)}
    .hud{position:absolute;left:0;right:0;top:0;display:flex;justify-content:space-between;padding:18px 22px;pointer-events:none;z-index:3}
    .chip{background:var(--glass);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:10px 14px;box-shadow:0 12px 40px rgba(0,0,0,.3)}
    .label{font-size:11px;letter-spacing:.28em;text-transform:uppercase;opacity:.72}
    .score{font-size:42px;font-weight:900;line-height:1;margin-top:4px}
    .a{color:var(--a);text-shadow:0 0 18px rgba(0,229,255,.6)} .b{color:var(--b);text-shadow:0 0 18px rgba(255,59,184,.6)}
    .bar{margin-top:8px;font-size:13px;opacity:.9}
    .center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:5}
    .panel{width:min(900px,calc(100vw - 28px));background:linear-gradient(180deg,rgba(18,23,44,.9),rgba(10,12,24,.8));backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.12);border-radius:28px;padding:28px 24px;box-shadow:0 30px 90px rgba(0,0,0,.45);text-align:center}
    h1{margin:0 0 10px;font-size:clamp(38px,6vw,72px);letter-spacing:.12em;background:linear-gradient(135deg,var(--a),var(--b));-webkit-background-clip:text;background-clip:text;color:transparent}
    .sub{margin:0 auto 18px;max-width:700px;color:rgba(235,238,255,.72);font-size:15px;line-height:1.7}
    .cols{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:18px 0}
    .card{padding:14px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}
    .card h3{margin:0 0 6px;font-size:12px;letter-spacing:.24em;text-transform:uppercase;opacity:.78}
    .keys{font-size:14px;opacity:.9;line-height:1.6}
    .btn{appearance:none;border:0;border-radius:999px;padding:15px 28px;font-size:15px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#04111d;background:linear-gradient(135deg,var(--a),#fff);cursor:pointer;box-shadow:0 18px 50px rgba(0,229,255,.25)}
    .tiny{margin-top:12px;font-size:12px;opacity:.6;line-height:1.6}
    .warn{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);z-index:4;font-size:22px;font-weight:900;letter-spacing:.2em;color:#ff5e6b;text-shadow:0 0 24px rgba(255,94,107,.75);opacity:0;transition:opacity .12s}
    .warn.on{opacity:1}
    .end{display:none}.end.show{display:flex}
    .win{font-size:clamp(36px,7vw,72px);font-weight:900;letter-spacing:.14em;margin:0 0 10px}
    .final{font-size:26px;margin:0 0 20px;color:rgba(235,238,255,.82)}
    .footer{position:absolute;left:0;right:0;bottom:14px;text-align:center;font-size:12px;letter-spacing:.18em;opacity:.55;z-index:2}
  </style>
</head>
<body>
  <div id="w">
    <div class="grid"></div>
    <canvas id="c"></canvas>
    <div class="hud">
      <div class="chip"><div class="label">Jugador 1</div><div class="score a" id="s1">0</div><div class="bar" id="m1">x1.0</div></div>
      <div class="chip" style="text-align:right"><div class="label">Tiempo</div><div class="score" id="time">60</div><div class="bar">Mantengan el tether corto para ganar multiplicador</div></div>
      <div class="chip" style="text-align:right"><div class="label">Jugador 2</div><div class="score b" id="s2">0</div><div class="bar" id="m2">x1.0</div></div>
    </div>
    <div class="warn" id="warn">TETHER CRITICAL</div>
    <div class="center" id="menu">
      <div class="panel">
        <h1>QUANTUM TETHER</h1>
        <p class="sub">Dos jugadores, un enlace cuántico. Recojan orbes de energía para sumar puntos, pero si se separan demasiado el multiplicador cae y el campo entra en tensión. Es rápido, competitivo y perfecto para jugar con un amigo en la misma pantalla.</p>
        <div class="cols">
          <div class="card"><h3>Jugador 1</h3><div class="keys">W A S D</div></div>
          <div class="card"><h3>Jugador 2</h3><div class="keys">Flechas</div></div>
        </div>
        <button class="btn" id="start">Empezar</button>
        <div class="tiny">Meta: puntuar más que tu amigo en 60 segundos.</div>
      </div>
    </div>
    <div class="center end" id="end">
      <div class="panel"><div class="win" id="winner">EMPATE</div><div class="final" id="final">0 - 0</div><button class="btn" id="again">Revancha</button></div>
    </div>
    <div class="footer">adonys.dev • Quantum Tether</div>
  </div>
  <script>
    const c=document.getElementById("c"),x=c.getContext("2d");let W,H,mode="menu",frame=0,t=60,orbs=[],parts=[];const P=[{x:0,y:0,vx:0,vy:0,s:0,m:1,col:"#00e5ff",gl:"rgba(0,229,255,.45)"},{x:0,y:0,vx:0,vy:0,s:0,m:1,col:"#ff3bb8",gl:"rgba(255,59,184,.45)"}],k={},MAX=250,R=20,OR=12,S=.45;function Z(){W=c.width=innerWidth;H=c.height=innerHeight;P[0].x=W*.33;P[0].y=H/2;P[1].x=W*.67;P[1].y=H/2}Z();addEventListener("resize",Z);addEventListener("keydown",e=>{k[e.key.toLowerCase()]=1;if(e.key.startsWith("Arrow"))e.preventDefault()});addEventListener("keyup",e=>k[e.key.toLowerCase()]=0);function reset(){P.forEach((p,i)=>{p.x=W*(i?0.67:0.33);p.y=H/2;p.vx=p.vy=0;p.s=0;p.m=1});orbs=[];parts=[];frame=0;t=60;document.getElementById("warn").classList.remove("on");document.getElementById("time").textContent=t}function D(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}function orb(){const m=90;orbs.push({x:m+Math.random()*(W-m*2),y:m+Math.random()*(H-m*2),vx:(Math.random()-.5)*1.7,vy:(Math.random()-.5)*1.7,p:Math.random()*6.28})}function boom(o,col){for(let i=0;i<14;i++)parts.push({x:o.x,y:o.y,vx:Math.cos(i/14*6.28)*3.5,vy:Math.sin(i/14*6.28)*3.5,l:1,col})}function loop(){if(mode!=="play")return;frame++;if(frame%60===0&&t>0){t--;document.getElementById("time").textContent=t;if(t<=0)return end()}if(frame%55===0&&orbs.length<8)orb();const C=[["w","a","s","d"],["arrowup","arrowleft","arrowdown","arrowright"]];P.forEach((p,i)=>{let ax=(k[C[i][1]]?-1:0)+(k[C[i][3]]?1:0),ay=(k[C[i][0]]?-1:0)+(k[C[i][2]]?1:0);if(ax||ay){const m=Math.hypot(ax,ay);p.vx+=ax/m*S;p.vy+=ay/m*S}p.vx*=.92;p.vy*=.92;p.x=Math.max(R,Math.min(W-R,p.x+p.vx));p.y=Math.max(R,Math.min(H-R,p.y+p.vy))});const d=D(P[0],P[1]),r=Math.min(1,d/MAX),tar=Math.max(1,3-r*2);P.forEach(p=>p.m+=(tar-p.m)*.05);document.getElementById("m1").textContent="x"+P[0].m.toFixed(1);document.getElementById("m2").textContent="x"+P[1].m.toFixed(1);document.getElementById("warn").classList.toggle("on",r>.78);for(let i=orbs.length-1;i>=0;i--){const o=orbs[i];o.x+=o.vx;o.y+=o.vy;o.p+=.08;if(o.x<OR||o.x>W-OR)o.vx*=-1;if(o.y<OR||o.y>H-OR)o.vy*=-1;o.x=Math.max(OR,Math.min(W-OR,o.x));o.y=Math.max(OR,Math.min(H-OR,o.y));for(let j=0;j<2;j++)if(D(o,P[j])<R+OR){P[j].s+=Math.round(10*P[j].m);boom(o,j?P[1].col:P[0].col);orbs.splice(i,1);break}}for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.x+=p.vx;p.y+=p.vy;p.l-=.03;if(p.l<=0)parts.splice(i,1)}x.clearRect(0,0,W,H);const g=x.createLinearGradient(P[0].x,P[0].y,P[1].x,P[1].y);g.addColorStop(0,P[0].col);g.addColorStop(1,P[1].col);x.globalAlpha=.55;x.lineWidth=2+r*5;x.strokeStyle=g;x.beginPath();x.moveTo(P[0].x,P[0].y);x.lineTo(P[1].x,P[1].y);x.stroke();x.globalAlpha=1;if(r>.6){x.setLineDash([6,10]);x.globalAlpha=(r-.6)*2;x.strokeStyle="#ff5e6b";x.lineWidth=1;x.beginPath();x.moveTo(P[0].x,P[0].y);x.lineTo(P[1].x,P[1].y);x.stroke();x.setLineDash([]);x.globalAlpha=1}orbs.forEach(o=>{const s=OR*(1+Math.sin(o.p)*.15),gg=x.createRadialGradient(o.x,o.y,0,o.x,o.y,s*2);gg.addColorStop(0,"rgba(255,216,77,.55)");gg.addColorStop(1,"transparent");x.fillStyle=gg;x.beginPath();x.arc(o.x,o.y,s*2,0,6.28);x.fill();x.fillStyle="#ffd84d";x.beginPath();x.arc(o.x,o.y,s,0,6.28);x.fill()});parts.forEach(p=>{x.fillStyle=p.col;x.globalAlpha=p.l;x.beginPath();x.arc(p.x,p.y,3*p.l,0,6.28);x.fill();x.globalAlpha=1});P.forEach(p=>{x.fillStyle=p.gl;x.beginPath();x.arc(p.x,p.y,R*2.2,0,6.28);x.fill();x.fillStyle=p.col;x.beginPath();x.arc(p.x,p.y,R,0,6.28);x.fill();x.fillStyle="rgba(255,255,255,.35)";x.beginPath();x.arc(p.x-5,p.y-5,R*.35,0,6.28);x.fill()});document.getElementById("s1").textContent=P[0].s;document.getElementById("s2").textContent=P[1].s;requestAnimationFrame(loop)}function start(){mode="play";document.getElementById("menu").style.display="none";document.getElementById("end").classList.remove("show");reset();loop()}function end(){mode="end";const a=P[0].s,b=P[1].s,w=document.getElementById("winner");if(a>b){w.textContent="GANA JUGADOR 1";w.style.color="#00e5ff"}else if(b>a){w.textContent="GANA JUGADOR 2";w.style.color="#ff3bb8"}else{w.textContent="EMPATE";w.style.color="#ffffff"}document.getElementById("final").textContent=a+" - "+b;document.getElementById("end").classList.add("show")}document.getElementById("start").onclick=start;document.getElementById("again").onclick=start;x.fillStyle="rgba(255,255,255,.7)";x.font="18px system-ui";x.fillText("Pulsa Empezar",30,40);
  </script>
</body>
</html>`;
}
