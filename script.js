// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // ========== EVENT HANDLING ========== //
  
  // 1. Button Click Event
  const clickBtn = document.getElementById('click-btn');
  const clickOutput = document.getElementById('click-output');
  
  clickBtn.addEventListener('click', function() {
      clickOutput.textContent = 'Button was clicked! 🎉';
      clickOutput.style.color = '#2ecc71';
  });
  
  // 2. Hover Effect
  const hoverBox = document.getElementById('hover-box');
  const hoverOutput = document.getElementById('hover-output');
  
  hoverBox.addEventListener('mouseenter', function() {
      hoverOutput.textContent = 'Hover detected! ✨';
  });
  
  hoverBox.addEventListener('mouseleave', function() {
      hoverOutput.textContent = 'Waiting for hover...';
  });
  
  // 3. Keypress Detection
  const keypressInput = document.getElementById('keypress-input');
  const keypressOutput = document.getElementById('keypress-output');
  
  keypressInput.addEventListener('keyup', function(e) {
      keypressOutput.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
  });
  
  // 4. Secret Action (Double click or long press)
  const secretBox = document.getElementById('secret-box');
  const secretOutput = document.getElementById('secret-output');
  let pressTimer;
  
  // Double click
  secretBox.addEventListener('dblclick', function() {
      secretOutput.textContent = 'You discovered the double-click secret! 🎊';
  });
  
  // Long press (touch or mouse)
  secretBox.addEventListener('mousedown', startPressTimer);
  secretBox.addEventListener('mouseup', cancelPressTimer);
  secretBox.addEventListener('mouseleave', cancelPressTimer);
  secretBox.addEventListener('touchstart', startPressTimer);
  secretBox.addEventListener('touchend', cancelPressTimer);
  
  function startPressTimer() {
      pressTimer = setTimeout(function() {
          secretOutput.textContent = 'You discovered the long press secret! 🕵️‍♂️';
      }, 1000); // 1 second press
  }
  
  function cancelPressTimer() {
      clearTimeout(pressTimer);
  }
  
  // ========== INTERACTIVE ELEMENTS ========== //
  
  // 1. Button that changes color
  const colorBtn = document.getElementById('color-btn');
  const colorBox = document.getElementById('color-box');
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
  let colorIndex = 0;
  
  colorBtn.addEventListener('click', function() {
      colorIndex = (colorIndex + 1) % colors.length;
      colorBox.style.backgroundColor = colors[colorIndex];
  });
  
  // 2. Image Gallery/Slideshow
  const galleryImages = document.querySelectorAll('.gallery-container img');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentImageIndex = 0;
  
  function showImage(index) {
      galleryImages.forEach(img => img.classList.remove('active'));
      galleryImages[index].classList.add('active');
  }
  
  prevBtn.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentImageIndex);
  });
  
  nextBtn.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      showImage(currentImageIndex);
  });
  
  // Auto-advance gallery every 3 seconds
  setInterval(function() {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      showImage(currentImageIndex);
  }, 3000);
  
  // 3. Accordion
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  
  accordionBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const content = this.nextElementSibling;
          const isActive = content.classList.contains('active');
          
          // Close all accordion items
          document.querySelectorAll('.accordion-content').forEach(item => {
              item.classList.remove('active');
          });
          
          // Toggle icons
          document.querySelectorAll('.accordion-btn span').forEach(span => {
              span.textContent = '+';
          });
          
          // Open current if it was closed
          if (!isActive) {
              content.classList.add('active');
              this.querySelector('span').textContent = '-';
          }
      });
  });
  
  // ========== FORM VALIDATION ========== //
  const form = document.getElementById('validation-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const formStatus = document.getElementById('form-status');
  
  // Real-time validation
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
  
  function validateName() {
      if (nameInput.value.trim() === '') {
          nameError.textContent = 'Name is required';
          nameError.style.display = 'block';
          return false;
      } else {
          nameError.style.display = 'none';
          return true;
      }
  }
  
  function validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailInput.value.trim() === '') {
          emailError.style.display = 'none';
          return true;
      }
      
      if (!emailRegex.test(emailInput.value)) {
          emailError.textContent = 'Please enter a valid email';
          emailError.style.display = 'block';
          return false;
      } else {
          emailError.style.display = 'none';
          return true;
      }
  }
  
  function validatePassword() {
      if (passwordInput.value.trim() === '') {
          passwordError.style.display = 'none';
          return true;
      }
      
      if (passwordInput.value.length < 8) {
          passwordError.textContent = 'Password must be at least 8 characters';
          passwordError.style.display = 'block';
          return false;
      } else {
          passwordError.style.display = 'none';
          return true;
      }
  }
  
  // Form submission
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      
      if (isNameValid && isEmailValid && isPasswordValid) {
          formStatus.textContent = 'Form submitted successfully! 🎉';
          formStatus.style.backgroundColor = '#d4edda';
          formStatus.style.color = '#155724';
          formStatus.style.display = 'block';
          
          // Reset form after 2 seconds
          setTimeout(() => {
              form.reset();
              formStatus.style.display = 'none';
          }, 2000);
      } else {
          formStatus.textContent = 'Please fix the errors in the form.';
          formStatus.style.backgroundColor = '#f8d7da';
          formStatus.style.color = '#721c24';
          formStatus.style.display = 'block';
      }
  });
});