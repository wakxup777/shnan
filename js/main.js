/* ============================================
   Red Team Academy - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

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
      '$ Kibertəhlükəsizlik öyrən',
      '$ Red Team mütəxəssisi ol',
      '$ Penetration testing öyrən',
      '$ Exploit development başla',
      '$ Bug bounty hunter ol'
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
      'msfconsole',
      'use exploit/multi/handler',
      'set LHOST 10.10.14.1',
      'run',
      'hashcat -m 1000 hash.txt rockyou.txt',
      'gobuster dir -u http://target -w wordlist.txt'
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

});
