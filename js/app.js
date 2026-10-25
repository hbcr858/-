(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 if (!reduced && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
 }
 document.querySelectorAll('.trait').forEach(button=>button.addEventListener('click',()=>{
  const opening=!button.classList.contains('active');
  document.querySelectorAll('.trait').forEach(el=>{el.classList.remove('active');el.setAttribute('aria-expanded','false');el.querySelector('.trait-toggle').textContent='+'});
  if(opening){button.classList.add('active');button.setAttribute('aria-expanded','true');button.querySelector('.trait-toggle').textContent='−'}
 }));
 const progress=document.querySelector('.scroll-progress');let scrollQueued=false;
 function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;scrollQueued=false}
 addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll)}},{passive:true});addEventListener('resize',updateScroll);updateScroll();
 if(matchMedia('(hover: hover) and (pointer: fine)').matches){
  const cursor=document.getElementById('cursor');let x=0,y=0,frame=0;
  const draw=()=>{cursor.style.transform=`translate3d(${x-12}px,${y-12}px,0)`;frame=0};
  addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;document.body.classList.add('has-cursor');cursor.style.visibility='visible';if(!frame)frame=requestAnimationFrame(draw)},{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>{cursor.style.visibility='hidden'});
  document.querySelectorAll('a,button,.image-wrap').forEach(el=>{el.addEventListener('pointerenter',()=>{cursor.classList.add('hover');cursor.querySelector('span').textContent=el.matches('.trait')?'DISCOVER':el.matches('.image-wrap')?'LOOK':'EXPLORE'});el.addEventListener('pointerleave',()=>cursor.classList.remove('hover'))});
  addEventListener('pointerdown',()=>cursor.classList.add('pressed'));addEventListener('pointerup',()=>cursor.classList.remove('pressed'));addEventListener('blur',()=>{document.body.classList.remove('has-cursor');cursor.classList.remove('pressed')});
 }
})();
