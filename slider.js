document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  let currentIndex = 0;

  // Function to update the slider position
  const updateSliderPosition = () => {
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  // Handle Next button click
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length; // Loop back to first slide
    updateSliderPosition();
  });

  // Handle Prev button click
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop back to last slide
    updateSliderPosition();
  });

  // Optional: Auto-play functionality
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSliderPosition();
  }, 5000); // Change slide every 5 seconds
});
