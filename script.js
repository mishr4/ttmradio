// Radio Player Functionality
const listenBtn = document.getElementById('listenBtn');
const radioPlayer = document.getElementById('radioPlayer');
let isPlaying = false;

// You can replace this with your actual radio stream URL
const radioStreamUrl = 'https://stream.example.com/radio'; // Replace with actual stream URL

if (listenBtn && radioPlayer) {
    listenBtn.addEventListener('click', function() {
        if (!isPlaying) {
            // Start playing
            radioPlayer.src = radioStreamUrl;
            radioPlayer.play().then(() => {
                isPlaying = true;
                listenBtn.textContent = 'Pause TTM Radio';
                listenBtn.classList.add('playing');
            }).catch(error => {
                console.error('Error playing radio:', error);
                alert('Unable to play radio stream. Please check your connection or contact support.');
            });
        } else {
            // Stop playing
            radioPlayer.pause();
            radioPlayer.src = '';
            isPlaying = false;
            listenBtn.textContent = 'Listen Live';
            listenBtn.classList.remove('playing');
        }
    });

    // Handle audio errors
    radioPlayer.addEventListener('error', function() {
        console.error('Radio player error');
        isPlaying = false;
        listenBtn.textContent = 'Listen Live';
        listenBtn.classList.remove('playing');
    });

    // Handle when audio ends
    radioPlayer.addEventListener('ended', function() {
        isPlaying = false;
        listenBtn.textContent = 'Listen Live';
        listenBtn.classList.remove('playing');
    });
}

// Check if user is logged in (for staff features)
function checkLoginStatus() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        // User is logged in - you can add staff-specific features here
        const username = sessionStorage.getItem('username');
        console.log('User logged in:', username);
        
        // Example: Change staff login link to show username
        const staffLink = document.querySelector('.staff-link');
        if (staffLink) {
            staffLink.textContent = `Staff: ${username}`;
            staffLink.href = '#';
            staffLink.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Do you want to log out?')) {
                    sessionStorage.removeItem('loggedIn');
                    sessionStorage.removeItem('username');
                    window.location.reload();
                }
            });
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

