function switchPage(page) {
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
  
playSound();
  
   resetAnimations(loginPage);
    resetAnimations(signupPage);
  
    if (page === 'signup') {
      loginPage.classList.add('shaking');
      setTimeout(() => {
        loginPage.classList.remove('active', 'shaking');
        signupPage.classList.add('active', 'reverse-appear');
      }, 1500);
    } else {
      signupPage.classList.add('shaking');
      setTimeout(() => {
        signupPage.classList.remove('active', 'shaking');
        loginPage.classList.add('active', 'reverse-appear');
      }, 1500);
    }
  }
  
  function resetAnimations(page) {
    page.classList.remove('shaking', 'reverse-appear');
    void page.offsetWidth;
  }

  function playSound() {
    const audio = new Audio('slash1.mp3');  
    audio.play();
  }
  