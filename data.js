document.addEventListener('DOMContentLoaded', function() {
  const clickButton = document.getElementById('clickButton');
  const clearStorageButton = document.getElementById('clearStorageButton');

  // Load initial count from localStorage
  let clickCount = localStorage.getItem('clickCount') || 0;
  clickButton.textContent = `This button has been clicked: ${clickCount} times`;

  clickButton.addEventListener('click', function() {
    clickCount++;
    localStorage.setItem('clickCount', clickCount);
    clickButton.textContent = `This button has been clicked: ${clickCount} times`;
  });

  clearStorageButton.addEventListener('click', function() {
    localStorage.clear();
    sessionStorage.clear();
    clickCount = 0;
    clickButton.textContent = `This button has been clicked: ${clickCount} times`;
  });
});
