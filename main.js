document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu, backdrop, scroll animations, smooth anchors, form handling
    
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('nav ul.nav-links a');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    // ensure backdrop element
    let backdrop = document.querySelector('.menu-backdrop');
    if (!backdrop) {
    	backdrop = document.createElement('div');
    	backdrop.className = 'menu-backdrop';
    	document.body.appendChild(backdrop);
    }
    
    // ensure close button inside menu
    function ensureCloseBtn(){
    	if (!mobileMenu) return;
    	if (!mobileMenu.querySelector('.mobile-close-btn')){
    		const btn = document.createElement('button');
    		btn.type = 'button';
    		btn.className = 'mobile-close-btn';
    		btn.innerHTML = '×';
    		btn.setAttribute('aria-label','Close menu');
    		mobileMenu.insertBefore(btn, mobileMenu.firstChild);
    		btn.addEventListener('click', closeMenu);
    	}
    }
    ensureCloseBtn();
    
    function openMenu(){
    	if (!mobileMenu) return;
    	mobileMenu.classList.add('active');
    	backdrop.classList.add('active');
    	hamburger?.classList.add('active');
    	document.documentElement.style.overflow = 'hidden';
    	document.body.style.overflow = 'hidden';
    }
    
    function closeMenu(){
    	if (!mobileMenu) return;
    	mobileMenu.classList.remove('active');
    	backdrop.classList.remove('active');
    	hamburger?.classList.remove('active');
    	document.documentElement.style.overflow = '';
    	document.body.style.overflow = '';
    }
    
    // hamburger toggle
    hamburger?.addEventListener('click', (e)=>{
    	e.stopPropagation();
    	mobileMenu?.classList.contains('active') ? closeMenu() : openMenu();
    });
    
    // close when clicking backdrop or outside
    backdrop?.addEventListener('click', closeMenu);
    document.addEventListener('click', (e)=>{
    	if (!mobileMenu?.contains(e.target) && !hamburger?.contains(e.target) && mobileMenu?.classList.contains('active')){
    		closeMenu();
    	}
    });
    
    // close with Esc
    document.addEventListener('keydown', (e)=>{
    	if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) closeMenu();
    });
    
    // mobile links: smooth scroll then close
    mobileLinks.forEach(a=>{
    	a.addEventListener('click', (ev)=>{
    		ev.preventDefault();
    		const href = a.getAttribute('href');
    		closeMenu();
    		if (href && href.startsWith('#')){
    			setTimeout(()=> {
    				const el = document.querySelector(href);
    				if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    			}, 320);
    		}
    	});
    });
    
    // desktop nav links smooth scroll
    navLinks.forEach(a=>{
    	a.addEventListener('click', (ev)=>{
    		const href = a.getAttribute('href');
    		if (href && href.startsWith('#') && document.querySelector(href)){
    			ev.preventDefault();
    			document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
    		}
    	});
    });
    
    // IntersectionObserver for fade-on-scroll
    const io = new IntersectionObserver((entries, obs)=>{
    	entries.forEach(entry=>{
    		if (entry.isIntersecting){
    			entry.target.classList.add('visible');
    			obs.unobserve(entry.target);
    		}
    	});
    }, {threshold:0.15, rootMargin:'0px 0px -80px 0px'});
    
    document.querySelectorAll('.fade-on-scroll, .highlight-card, .about-image-wrapper, .section-header').forEach(el=>{
    	io.observe(el);
    });
    
    // navbar scroll effect (add scrolled class)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', ()=>{
    	if (window.pageYOffset > 40) navbar?.classList.add('scrolled'); else navbar?.classList.remove('scrolled');
    });
    
    // contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm){
    	contactForm.addEventListener('submit', (e)=>{
    		e.preventDefault();
    		const name = (document.getElementById('name')?.value || '').trim();
    		const email = (document.getElementById('email')?.value || '').trim();
    		if (!name || !email){ alert('Please fill required fields.'); return; }
    		// placeholder success behavior
    		alert(`Thanks ${name}! We'll reach out at ${email}.`);
    		contactForm.reset();
    	});
    }
    
    // ensure mobile-menu element exists (if not, create a simple container)
    if (!mobileMenu){
    	const mm = document.createElement('div');
    	mm.id = 'mobile-menu';
    	mm.className = '';
    	const links = document.createElement('div');
    	links.className = 'mobile-nav-links';
    	['#home','#about','#highlights','#location','#contact'].forEach(h=>{
    		const a = document.createElement('a'); a.href = h; a.textContent = document.querySelector(`a[href="${h}"]`)?.textContent || h.replace('#','');
    		links.appendChild(a);
    	});
    	mm.appendChild(links);
    	document.body.appendChild(mm);
    	ensureCloseBtn();
    }
    
    // ===== PAGE LOAD =====
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Shapoorji Navante - Website Loaded Successfully');
    });
});
