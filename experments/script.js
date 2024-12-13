// Function to handle page switch with shaking, shrinking, and reverse-appear effects
function switchPage(page) {
  const loginPage = document.getElementById('login-page');
  const signupPage = document.getElementById('signup-page');

  // Play sound effect
  playSound();

  // Reset animations to avoid repeated triggers
  resetAnimations(loginPage);
  resetAnimations(signupPage);

  if (page === 'signup') {
    // Add shaking and shrinking effect to login form, then show sign-up form
    loginPage.classList.add('shaking');
    setTimeout(() => {
      loginPage.classList.remove('active', 'shaking');
      signupPage.classList.add('active', 'reverse-appear');
    }, 1500); // Delay for the shaking and shrinking animation to complete
  } else {
    // Add shaking and shrinking effect to sign-up form, then show login form
    signupPage.classList.add('shaking');
    setTimeout(() => {
      signupPage.classList.remove('active', 'shaking');
      loginPage.classList.add('active', 'reverse-appear');
    }, 1500); // Delay for the shaking and shrinking animation to complete
  }
}

// Reset any previous animations
function resetAnimations(page) {
  page.classList.remove('shaking', 'reverse-appear');
  void page.offsetWidth; // Trigger reflow to restart the animation
}

// Function to play sound effect
function playSound() {
  const audio = new Audio('slash.mp3');  // Use the correct file path here
  audio.play();
}

// Automatically go back to login after clicking "Sign Up" button
document.querySelector('#signup-page button').addEventListener('click', function() {
  // Play sound effect on button click
  playSound();
  
  setTimeout(() => {
    switchPage('login');
  }, 500); // Adjust delay as needed
});

// Automatically go to sign-up after clicking "Sign Up" button
document.querySelector('#login-page button').addEventListener('click', function() {
  // Play sound effect on button click
  playSound();
  
  setTimeout(() => {
    switchPage('signup');
  }, 500); // Adjust delay as needed
});
