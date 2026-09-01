document.addEventListener('DOMContentLoaded', ()=>{
  // Filters
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.card');
  filters.forEach(f=>f.addEventListener('click', ()=>{
    filters.forEach(x=>x.classList.remove('active'));
    f.classList.add('active');
    const filter = f.dataset.filter;
    cards.forEach(c=>{
      if(filter==='all' || c.dataset.category===filter) c.style.display='block'; else c.style.display='none';
    })
  }));

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImage = document.getElementById('lb-image');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  const lbTools = document.getElementById('lb-tools');
  document.querySelectorAll('.btn.view').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      lbImage.src = btn.dataset.image;
      lbImage.style.display = 'block';
      lbImage.style.width = '100%';
      lbImage.style.height = 'auto';
      lbImage.style.objectFit = 'contain';
      lbTitle.textContent = btn.dataset.title;
      lbDesc.textContent = btn.dataset.desc;
      lbTools.textContent = btn.dataset.tools;
      lb.setAttribute('aria-hidden','false');
    })
  });
  document.querySelectorAll('.lightbox .close').forEach(b=>b.addEventListener('click', ()=>{lb.setAttribute('aria-hidden','true')}));
  lb.addEventListener('click', (e)=>{ if(e.target===lb) lb.setAttribute('aria-hidden','true') });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') lb.setAttribute('aria-hidden','true');
  });

  // Contact form (placeholder)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Thanks — your message has been received (demo).');
    form.reset();
  });
});
