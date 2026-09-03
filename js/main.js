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
    const project = btn.closest('.card, .design-item');
    const projectImage = project.querySelector('img');
    const openProject = ()=>{
      lbImage.src = btn.dataset.image || projectImage.src;
      lbImage.style.display = 'block';
      lbImage.style.width = '100%';
      lbImage.style.height = 'auto';
      lbImage.style.objectFit = 'contain';
      lbTitle.textContent = btn.dataset.title;
      lbDesc.textContent = btn.dataset.desc;
      lbTools.textContent = btn.dataset.tools;
      lb.setAttribute('aria-hidden','false');
    };
    projectImage.classList.add('project-image-trigger');
    projectImage.setAttribute('tabindex', '0');
    projectImage.setAttribute('role', 'button');
    projectImage.setAttribute('aria-label', `View ${btn.dataset.title}`);
    projectImage.addEventListener('click', openProject);
    projectImage.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject();
      }
    });
    btn.remove();
  });
  document.querySelectorAll('.lightbox .close').forEach(b=>b.addEventListener('click', ()=>{lb.setAttribute('aria-hidden','true')}));
  lb.addEventListener('click', (e)=>{ if(e.target===lb) lb.setAttribute('aria-hidden','true') });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') lb.setAttribute('aria-hidden','true');
  });

  // Contact form
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Form submission failed');

      form.innerHTML = '<p class="form-status success" role="status">Thanks — your message has been sent.</p>';
    } catch (error) {
      const status = form.querySelector('.form-status') || document.createElement('p');
      status.className = 'form-status error';
      status.setAttribute('role', 'alert');
      status.textContent = 'Sorry, your message could not be sent. Please try again.';
      if (!status.parentElement) form.prepend(status);
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
});
