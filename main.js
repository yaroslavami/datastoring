document.addEventListener('DOMContentLoaded', function() {
    const clickButton = document.getElementById('clickButton');
    const clearStorageButton = document.getElementById('clearStorageButton');
    const checkAgeButton = document.getElementById('checkAgeButton');
    const ageDisplay = document.getElementById('ageDisplay');

    if (clickButton) {
        let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
        clickButton.textContent = `This button has been clicked: ${clickCount} times`;

        clickButton.addEventListener('click', function() {
            clickCount++;
            localStorage.setItem('clickCount', clickCount);
            clickButton.textContent = `This button has been clicked: ${clickCount} times`;
        });
    }

    if (clearStorageButton) {
        clearStorageButton.addEventListener('click', function() {
            localStorage.clear();
            sessionStorage.clear();
            clickCount = 0;
            if (clickButton) {
                clickButton.textContent = `This button has been clicked: ${clickCount} times`;
            }
        });
    }

    function promptBirthday() {
        const birthDate = prompt('Please enter your birth date (YYYY-MM-DD):');
        if (birthDate) {
            setCookie('birthDate', birthDate, 365);
            return birthDate;
        }
        return null;
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    function calculateAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
    }

    function showAge() {
        let birthDate = getCookie('birthDate');
        if (!birthDate) {
            birthDate = promptBirthday();
        }
        if (birthDate && ageDisplay) {
            const age = calculateAge(birthDate);
            ageDisplay.textContent = `You are ${age} years old.`;
        }
    }

    if (checkAgeButton) {
        checkAgeButton.addEventListener('click', showAge);
    }

    showAge();
});