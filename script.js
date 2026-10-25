(function(){
  var PREVIEW = true; // false on the real site: intro plays once per session
  var intro=document.getElementById('intro'), svg=document.getElementById('stage');
<<<<<<< HEAD
  var enterBtn=document.getElementById('enter-btn');
  var timers=[], autoTimer=null, reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
=======
  var timers=[], reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
>>>>>>> ed148cd7d2fa63406dfeec74f61a3bc448a390ce
  var O='#FF9900', S=20, D=6, X0=230, Y0=-14;
  var LA=['.XXX.','X...X','X...X','XXXXX','X...X','X...X','X...X'],
      LW=['X...X','X...X','X...X','X.X.X','X.X.X','XX.XX','X...X'],
      LS=['.XXXX','X....','X....','.XXX.','....X','....X','XXXX.'],
      AR=['..X..','..X..','X.X.X','.XXX.','..X..'];
  var B=LA.map(function(a,i){return a+'.'+LW[i]+'.'+LS[i]});
<<<<<<< HEAD

  var audioCtx = null;
  function playPop(freq){
    try{
      if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if(audioCtx.state==='suspended') audioCtx.resume();
      var osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
      osc.type='sine';
      var f=freq||520;
      osc.frequency.setValueAtTime(f, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(f*1.3, audioCtx.currentTime+0.06);
      gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime+0.07);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime+0.08);
    }catch(e){}
  }

  function cube(x,y,d,l){
    return '<g class="cube" data-cx="'+(x+S/2)+'" data-cy="'+(y+S/2)+'" style="--d:'+d+'s"><g class="cube-wrap" transform="translate('+x+' '+y+')" stroke="#0A1017" stroke-width="1" stroke-linejoin="round">'+
=======
  function cube(x,y,d,l){
    return '<g class="cube" style="--d:'+d+'s"><g transform="translate('+x+' '+y+')" stroke="#0A1017" stroke-width="1" stroke-linejoin="round">'+
>>>>>>> ed148cd7d2fa63406dfeec74f61a3bc448a390ce
      '<polygon points="'+S+',0 '+(S+D)+','+(-D)+' '+(S+D)+','+(S-D)+' '+S+','+S+'" fill="#1E2B3D"/>'+
      '<polygon points="0,0 '+D+','+(-D)+' '+(S+D)+','+(-D)+' '+S+',0" fill="#46597A"/>'+
      '<rect width="'+S+'" height="'+S+'" fill="#2B3B52"/>'+
      '<rect x="'+(S/2-2.5)+'" y="'+(S/2-2.5)+'" width="5" height="5" rx="1" fill="#0A1017" stroke="none"/>'+
      '<rect class="led" style="--l:'+l+'s" x="'+(S/2-2.5)+'" y="'+(S/2-2.5)+'" width="5" height="5" rx="1" fill="'+O+'" stroke="none"/></g></g>';
  }
  function cubeO(x,y,d){
<<<<<<< HEAD
    return '<g class="cube drip" data-cx="'+(x+S/2)+'" data-cy="'+(y+S/2)+'" style="--d:'+d+'s;opacity:0"><g class="cube-wrap" transform="translate('+x+' '+y+')" stroke="#0A1017" stroke-width="1" stroke-linejoin="round">'+
=======
    return '<g class="cube drip" style="--d:'+d+'s;opacity:0"><g transform="translate('+x+' '+y+')" stroke="#0A1017" stroke-width="1" stroke-linejoin="round">'+
>>>>>>> ed148cd7d2fa63406dfeec74f61a3bc448a390ce
      '<polygon points="'+S+',0 '+(S+D)+','+(-D)+' '+(S+D)+','+(S-D)+' '+S+','+S+'" fill="#C77700"/>'+
      '<polygon points="0,0 '+D+','+(-D)+' '+(S+D)+','+(-D)+' '+S+',0" fill="#FFB84D"/>'+
      '<rect width="'+S+'" height="'+S+'" fill="'+O+'"/></g></g>';
  }
<<<<<<< HEAD

  function bounceCube(el, playSound, freq){
    el.classList.remove('bounce');
    void el.offsetWidth;
    el.classList.add('bounce');
    var led=el.querySelector('.led');
    if(led){
      led.classList.remove('pulse');
      void led.offsetWidth;
      led.classList.add('pulse');
    }
    if(playSound) playPop(freq);
  }

  function triggerRipple(originCube){
    var ox=parseFloat(originCube.dataset.cx||0);
    var oy=parseFloat(originCube.dataset.cy||0);
    bounceCube(originCube, true, 640);

    var cubes=svg.querySelectorAll('.cube');
    cubes.forEach(function(c){
      if(c===originCube) return;
      var cx=parseFloat(c.dataset.cx||0);
      var cy=parseFloat(c.dataset.cy||0);
      var dist=Math.hypot(cx-ox, cy-oy);
      if(dist < 180){
        var delay=dist * 1.8;
        setTimeout(function(){
          bounceCube(c, false);
        }, delay);
      }
    });
  }

  function clearAutoTimer(){
    if(autoTimer){
      clearTimeout(autoTimer);
      autoTimer=null;
    }
  }

  function bindInteractions(){
    var cubes=svg.querySelectorAll('.cube');
    cubes.forEach(function(c){
      c.addEventListener('pointerenter', function(){
        clearAutoTimer();
        var led=c.querySelector('.led');
        if(led){
          led.classList.remove('pulse');
          void led.offsetWidth;
          led.classList.add('pulse');
        }
        var cx=parseFloat(c.dataset.cx||300);
        playPop(340 + ((cx * 3) % 400));
      });

      c.addEventListener('click', function(e){
        e.stopPropagation();
        clearAutoTimer();
        triggerRipple(c);
      });
    });
  }

=======
>>>>>>> ed148cd7d2fa63406dfeec74f61a3bc448a390ce
  function scene(){
    var ay=Y0+8*S, s='<path d="M230 '+(ay+5*S+1)+'H570" stroke="#2E3F57" stroke-width="1.5"/>';
    B.forEach(function(row,r){for(var c=0;c<17;c++){if(row[c]!=='X')continue;
      s+=cube(X0+c*S,Y0+r*S,(0.3+(6-r)*0.1+c*0.015).toFixed(2),(1.75+r*0.04+c*0.03).toFixed(2));}});
    AR.forEach(function(row,r){for(var c=0;c<5;c++){if(row[c]!=='X')continue;
      s+=cubeO(350+c*S,ay+r*S,(1.5+r*0.11).toFixed(2));}});
    s+='<g class="name"><text x="400" y="312" text-anchor="middle" font-size="44" font-weight="500" fill="#fff" letter-spacing="-.5">Student <tspan fill="'+O+'" font-style="italic">Builder</tspan> Group</text>'+
       '<path d="M372 334H428" stroke="'+O+'" stroke-width="2"/></g>';
    svg.innerHTML=s;
<<<<<<< HEAD
    bindInteractions();
  }

  function clear(){
    clearAutoTimer();
    timers.forEach(clearTimeout);
    timers=[];
  }

=======
  }
  function clear(){timers.forEach(clearTimeout);timers=[]}
>>>>>>> ed148cd7d2fa63406dfeec74f61a3bc448a390ce
  function finish(fast){
    clear();document.body.classList.remove('lock');
    intro.classList.add('done');document.body.classList.add('ready');
    timers.push(setTimeout(function(){intro.hidden=true;intro.classList.remove('run','done')},fast?50:900));
  }
<<<<<<< HEAD

=======
>>>>>>> ed148cd7d2fa63406dfeec74f61a3bc448a390ce
  function play(){
    clear();document.body.classList.remove('ready');scrollTo(0,0);
    if(reduced){intro.hidden=true;document.body.classList.remove('lock');document.body.classList.add('ready');return}
    scene();intro.hidden=false;intro.classList.remove('run','done');
    document.body.classList.add('lock');void intro.offsetWidth;intro.classList.add('run');
<<<<<<< HEAD
    autoTimer=setTimeout(function(){finish(false)}, 4800);
    timers.push(autoTimer);
  }

  document.getElementById('skip').addEventListener('click',function(e){e.stopPropagation();finish(true)});
  if(enterBtn) enterBtn.addEventListener('click',function(e){e.stopPropagation();finish(false)});
  intro.addEventListener('click',function(e){
    // Clicking backdrop or empty SVG space enters the site
    if(e.target===intro || e.target===svg || e.target.classList.contains('wall')){
      finish(false);
    }
  });
=======
    timers.push(setTimeout(function(){finish(false)},3200));
  }
  document.getElementById('skip').addEventListener('click',function(){finish(true)});
>>>>>>> ed148cd7d2fa63406dfeec74f61a3bc448a390ce
  document.getElementById('replay').addEventListener('click',play);
  var seen=false;
  try{ seen=!PREVIEW && sessionStorage.getItem('sbg-intro')==='1'; sessionStorage.setItem('sbg-intro','1'); }catch(e){}
  if(seen){intro.hidden=true;document.body.classList.remove('lock');document.body.classList.add('ready')} else play();

  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});
})();
