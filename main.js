var typed = new Typed(".text", {
    strings: ["Frontend Developer", "Backend Developer", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// floatingDots.js

let scrollTimeout;

document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector('.floating-dots');
  
  function createDots() {
    for (let i = 0; i < 100; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.style.left = Math.random() * 100 + 'vw';
      dot.style.top = Math.random() * 100 + 'vh';
      dot.style.animationDelay = Math.random() * 5 + 's';
      dot.style.animationDuration = Math.random() * 5 + 5 + 's';
      container.appendChild(dot);
    }
  }

  function clearDots() {
    container.innerHTML = '';
  }

  function handleScroll() {
    clearDots();
    createDots();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(clearDots, 500); // Adjust time as needed
  }

  window.addEventListener('scroll', handleScroll);
});



document.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const featuredWorks = document.querySelectorAll('.featured-works');

  featuredWorks.forEach(function(section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < 0) {
          section.classList.add('is-scrolled');
      } else {
          section.classList.remove('is-scrolled');
      }
  });
});



// Function to update the progress bar on scroll
function updateProgressBar() {
  const progressBar = document.querySelector('.progress-bar');
  const contentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPosition = window.scrollY;
  const progress = (scrollPosition / contentHeight) * 100;
  progressBar.style.width = progress + '%';
}

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


document.addEventListener('DOMContentLoaded', () => {
  const featuredWorks = document.querySelector('.featured-works');
  const cards = document.querySelectorAll('.content-wrapper');
  let lastScrollTop = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
      if (!ticking) {
          window.requestAnimationFrame(() => {
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const featuredWorksRect = featuredWorks.getBoundingClientRect();

              if (featuredWorksRect.top <= window.innerHeight && featuredWorksRect.bottom >= 0) {
                  const scrollProgress = (window.innerHeight - featuredWorksRect.top) / (window.innerHeight + featuredWorksRect.height);
                  
                  cards.forEach((card, index) => {
                      const speed = 0.5 + (index * 0.1);
                      const yOffset = (scrollProgress - 0.5) * 200 * speed;
                      card.style.transform = `translateY(${yOffset}px)`;
                  });
              }

              lastScrollTop = scrollTop;
              ticking = false;
          });

          ticking = true;
      }
  });
});

//validation and submission

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Validate fields (can add more validation as needed)
  const email = this.email.value;
  const phone = this.phone.value;
  const subject = this.subject.value;
  const message = this.message.value;

  // Check if all fields are filled
  if (!email || !phone || !subject || !message) {
      alert("Please fill in all fields.");
      return;
  }

  // Validate phone number to be less than or equal to 14 digits
  const phoneDigits = phone.replace(/\D/g, ''); // Remove non-digit characters
  if (phoneDigits.length > 14) {
      alert("Phone number must be 14 digits or less.");
      return;
  }

  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.disabled = true; // Disable submit button to prevent multiple submissions

  // Submit the form data to Formspree using Fetch API
  fetch(this.action, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(new FormData(this)).toString()
  })
  .then(response => {
      console.log('Response status:', response.status); // Log response status
      if (response.ok) {
          // Success message display
          document.getElementById('successMessage').textContent = "Thank you! Your message has been sent.";
          document.getElementById('successMessage').style.display = "block";
          this.reset(); // Reset form fields
      } else {
          // Error message display
          document.getElementById('successMessage').textContent = "Oops! There was a problem sending your message.";
          document.getElementById('successMessage').style.display = "block";
      }
      submitButton.disabled = false; // Re-enable submit button after response
  })
  .catch(error => {
      // Catch and display error
      document.getElementById('successMessage').textContent = "Oops! There was a problem sending your message.";
      document.getElementById('successMessage').style.display = "block";
      console.error('Error:', error);
      submitButton.disabled = false; // Re-enable submit button after error
  });
});


//arrow function

let mybutton = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

//reveal on scroll event
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    revealElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
});









//navbar responsiveness

// document.addEventListener('DOMContentLoaded', function() {
//   const hamburger = document.querySelector('.hamburger-menu');
//   const navbar = document.querySelector('.navbar');

//   hamburger.addEventListener('click', function() {
//       navbar.classList.toggle('active');
//   });
// });

//to  toggle the navbar on different screens

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navbar = document.querySelector('.navbar');

  hamburger.addEventListener('click', function() {
      navbar.classList.toggle('active'); // Toggle 'active' class on click
  });
});


