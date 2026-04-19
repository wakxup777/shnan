/* ============================================
   Red Team Academy - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== LOADING SCREEN ==========
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    const loadLines = [
      '[*] Establishing secure connection...',
      '[*] Encrypting tunnel... AES-256-GCM',
      '[+] Connection established via TOR',
      '[+] Access granted. Welcome, operator.'
    ];
    
    const loadBar = document.getElementById('loadingBarFill');
    const loadPercent = document.getElementById('loadingPercent');
    let progress = 0;
    
    // Show lines sequentially
    function showLoadLine(index) {
      if (index >= loadLines.length) return;
      const el = document.getElementById('loadLine' + (index + 1));
      if (el) {
        el.textContent = loadLines[index];
        el.style.opacity = '0';
        setTimeout(() => { el.style.opacity = '1'; }, 50);
      }
    }
    
    showLoadLine(0);
    setTimeout(() => showLoadLine(1), 600);
    setTimeout(() => showLoadLine(2), 1200);
    setTimeout(() => showLoadLine(3), 1800);
    
    // Progress bar
    const loadInterval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          setTimeout(() => loadingScreen.remove(), 500);
        }, 300);
      }
      if (loadBar) loadBar.style.width = progress + '%';
      if (loadPercent) loadPercent.textContent = Math.floor(progress) + '%';
    }, 100);
  }

  // ========== MATRIX RAIN EFFECT ==========
  const matrixCanvas = document.getElementById('matrixCanvas');
  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    
    function resizeCanvas() {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|~!@#$%^&*';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }
    
    function drawMatrix() {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      
      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Mix of red and green characters for deep web feel
        if (Math.random() > 0.85) {
          ctx.fillStyle = 'rgba(204, 0, 0, 0.8)';  // Red chars
        } else if (Math.random() > 0.95) {
          ctx.fillStyle = 'rgba(0, 255, 204, 0.6)'; // Cyan chars
        } else {
          ctx.fillStyle = 'rgba(0, 255, 65, 0.5)';  // Green chars
        }
        
        ctx.font = fontSize + 'px monospace';
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    setInterval(drawMatrix, 50);
  }

  // ========== RANDOM GLITCH BURST ON HEADINGS ==========
  function randomGlitchBurst() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    glitchElements.forEach(el => {
      // Occasionally add an intense glitch burst
      if (Math.random() > 0.7) {
        el.style.textShadow = `
          ${Math.random() * 10 - 5}px 0 #ff0033,
          ${Math.random() * -10 + 5}px 0 #00ffcc,
          0 0 20px rgba(204, 0, 0, 0.5)
        `;
        el.style.transform = `skew(${Math.random() * 2 - 1}deg)`;
        
        setTimeout(() => {
          el.style.textShadow = '';
          el.style.transform = '';
        }, 150);
      }
    });
  }
  
  setInterval(randomGlitchBurst, 3000);

  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run on page load

  // ========== MOBILE MENU TOGGLE ==========
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ========== TYPING EFFECT (Hero) ==========
  const typedTextEl = document.getElementById('typedText');
  
  if (typedTextEl) {
    const phrases = [
      '> INITIALIZING SECURE CONNECTION...',
      '> ACCESS GRANTED // CLEARANCE: RED',
      '> LOADING ENCRYPTED MODULES...',
      '> WELCOME TO THE DARK SIDE',
      '> [REDACTED] PROTOCOL ACTIVATED',
      '> BREACH DETECTED // STAND BY...'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    
    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
      }
      
      setTimeout(typeEffect, typingSpeed);
    }
    
    typeEffect();
  }

  // ========== TERMINAL TYPING EFFECT ==========
  const terminalTyping = document.getElementById('terminalTyping');
  
  if (terminalTyping) {
    const terminalCommands = [
      'proxychains nmap -sT -Pn darknet.onion',
      'tor --hash-password [REDACTED]',
      'sqlmap -u "target.onion/login" --dbs --tor',
      'msfconsole -x "use exploit/multi/handler"',
      'hashcat -m 13100 krb5tgs.hash rockyou.txt',
      'mimikatz # sekurlsa::logonpasswords',
      'python3 c2_beacon.py --encrypt --exfil'
    ];
    
    let cmdIndex = 0;
    let cmdCharIndex = 0;
    let cmdIsDeleting = false;
    
    function terminalType() {
      const currentCmd = terminalCommands[cmdIndex];
      
      if (cmdIsDeleting) {
        terminalTyping.textContent = currentCmd.substring(0, cmdCharIndex - 1);
        cmdCharIndex--;
      } else {
        terminalTyping.textContent = currentCmd.substring(0, cmdCharIndex + 1);
        cmdCharIndex++;
      }
      
      let speed = cmdIsDeleting ? 30 : 100;
      
      if (!cmdIsDeleting && cmdCharIndex === currentCmd.length) {
        cmdIsDeleting = true;
        speed = 3000;
      } else if (cmdIsDeleting && cmdCharIndex === 0) {
        cmdIsDeleting = false;
        cmdIndex = (cmdIndex + 1) % terminalCommands.length;
        speed = 500;
      }
      
      setTimeout(terminalType, speed);
    }
    
    terminalType();
  }

  // ========== SCROLL ANIMATIONS (Intersection Observer) ==========
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger counter animation if it has a counter
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => animateCounter(counter));
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });

  // ========== COUNTER ANIMATION ==========
  function animateCounter(counter) {
    if (counter.dataset.animated) return;
    counter.dataset.animated = 'true';
    
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);
      
      counter.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  // Also handle hero stat counters
  document.querySelectorAll('[data-count]').forEach(el => {
    const observerSingle = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !el.dataset.animated) {
          el.dataset.animated = 'true';
          const target = parseInt(el.getAttribute('data-count'));
          const duration = 2000;
          const startTime = performance.now();
          
          function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * easeOut);
            
            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target;
            }
          }
          
          requestAnimationFrame(update);
        }
      });
    }, { threshold: 0.5 });
    
    observerSingle.observe(el);
  });

  // ========== COURSE FILTER ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      courseCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          // Re-trigger animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ========== FAQ ACCORDION ==========
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = '0';
          }
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();
      
      // Simple validation
      if (!name || !email || !subject || !message) {
        showNotification('Zəhmət olmasa bütün sahələri doldurun.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Düzgün email ünvanı daxil edin.', 'error');
        return;
      }
      
      // Simulate form submission
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Göndərilir...';
      btn.disabled = true;
      
      setTimeout(() => {
        showNotification('Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.', 'success');
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ========== NOTIFICATION SYSTEM ==========
  function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${type === 'success' ? '✓' : '✗'}</span>
      <p>${message}</p>
    `;
    
    // Styles
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      padding: '18px 25px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: '9999',
      animation: 'slideIn 0.4s ease',
      maxWidth: '400px',
      fontSize: '0.95rem',
      backdropFilter: 'blur(10px)',
      border: '1px solid',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    });
    
    if (type === 'success') {
      notification.style.background = 'rgba(0, 255, 65, 0.1)';
      notification.style.borderColor = 'rgba(0, 255, 65, 0.3)';
      notification.style.color = '#00ff41';
    } else {
      notification.style.background = 'rgba(231, 76, 60, 0.1)';
      notification.style.borderColor = 'rgba(231, 76, 60, 0.3)';
      notification.style.color = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    // Add animation keyframes
    if (!document.getElementById('notifStyle')) {
      const style = document.createElement('style');
      style.id = 'notifStyle';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.4s ease forwards';
      setTimeout(() => notification.remove(), 400);
    }, 5000);
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== CUSTOM CURSOR & MOUSE EFFECTS ==========
  // Only on desktop
  if (window.innerWidth > 768) {
    document.body.classList.add('custom-cursor-active');
    
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailCounter = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Cursor dot follows immediately
      cursorDot.style.left = mouseX - 3 + 'px';
      cursorDot.style.top = mouseY - 3 + 'px';
      
      // Trail particles (every 3rd move)
      trailCounter++;
      if (trailCounter % 3 === 0) {
        createTrailParticle(mouseX, mouseY);
      }
    });
    
    // Smooth cursor follow
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, input, select, textarea, .feature-card, .course-card, .team-card, .course-select-card, .faq-question, .contact-info-card, .value-card');
    
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
      cursor.classList.add('click');
      createRipple(mouseX, mouseY);
    });
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
    
    // Trail particle
    function createTrailParticle(x, y) {
      const particle = document.createElement('div');
      particle.className = 'trail-particle';
      
      // Random color between red, green, cyan
      const colors = ['rgba(204, 0, 0, 0.6)', 'rgba(0, 255, 65, 0.4)', 'rgba(0, 255, 204, 0.3)'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = x - 2 + 'px';
      particle.style.top = y - 2 + 'px';
      particle.style.boxShadow = '0 0 6px ' + particle.style.background;
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }
    
    // Ripple on click
    function createRipple(x, y) {
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      ripple.style.left = x - 10 + 'px';
      ripple.style.top = y - 10 + 'px';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }

    // Magnetic effect on buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ========== USER PERSISTENCE (localStorage) ==========
  const UserManager = {
    STORAGE_KEY: 'redteam_user',
    
    save(userData) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
    },
    
    get() {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    },
    
    remove() {
      localStorage.removeItem(this.STORAGE_KEY);
    },
    
    isLoggedIn() {
      return this.get() !== null;
    },
    
    getInitials(user) {
      if (!user) return '??';
      const f = user.name ? user.name[0] : '';
      const l = user.surname ? user.surname[0] : '';
      return (f + l).toUpperCase();
    }
  };

  // Update navbar based on login state
  function updateNavbar() {
    const user = UserManager.get();
    const navCta = document.querySelector('.nav-cta');
    
    if (!navCta) return;
    
    if (user && user.name) {
      // Replace CTA with user profile
      const dropdown = document.createElement('div');
      dropdown.className = 'user-dropdown';
      dropdown.innerHTML = `
        <div class="user-profile-btn">
          <div class="user-avatar-sm">${UserManager.getInitials(user)}</div>
          <span class="user-name-sm">${user.name}</span>
        </div>
        <div class="user-dropdown-menu">
          <div class="dropdown-header">
            <div class="user-fullname">${user.name} ${user.surname || ''}</div>
            <div class="user-email">${user.email || ''}</div>
          </div>
          <a href="register.html" class="dropdown-item">📚 Kurslarım</a>
          <a href="register.html" class="dropdown-item">⚙️ Profil Ayarları</a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item danger" id="logoutBtn">🚪 Çıxış</a>
        </div>
      `;
      
      navCta.replaceWith(dropdown);
      
      // Toggle dropdown
      const profileBtn = dropdown.querySelector('.user-profile-btn');
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });
      
      // Close on outside click
      document.addEventListener('click', () => {
        dropdown.classList.remove('active');
      });
      
      // Logout
      const logoutBtn = dropdown.querySelector('#logoutBtn');
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        UserManager.remove();
        window.location.reload();
      });
    }
  }
  
  updateNavbar();

  // Make UserManager globally accessible for register.html
  window.UserManager = UserManager;

});
