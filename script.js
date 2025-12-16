document.addEventListener('DOMContentLoaded', () => {
    const listenBtn = document.getElementById('listenBtn');
    const radioPlayer = document.getElementById('radioPlayer');
    const streamUrl = 'YOUR_RADIO_STREAM_URL_HERE'; // **IMPORTANT: Replace this with your actual audio stream URL (e.g., .mp3, .aac, .ogg stream)**
    let isPlaying = false;

    // Set the stream source
    radioPlayer.src = streamUrl;

    listenBtn.addEventListener('click', () => {
        if (isPlaying) {
            // Stop the stream
            radioPlayer.pause();
            listenBtn.textContent = 'Listen Live';
            listenBtn.classList.remove('active');
            isPlaying = false;
        } else {
            // Start the stream
            radioPlayer.load(); // Reloads the stream source for a fresh connection
            radioPlayer.play()
                .then(() => {
                    listenBtn.textContent = 'Stop Streaming';
                    listenBtn.classList.add('active');
                    isPlaying = true;
                })
                .catch(error => {
                    console.error("Error playing audio stream:", error);
                    alert("Could not start the stream. Check the stream URL or browser settings.");
                });
        }
    });

    // Optional: Update button text if stream ends unexpectedly
    radioPlayer.addEventListener('ended', () => {
        listenBtn.textContent = 'Listen Live';
        listenBtn.classList.remove('active');
        isPlaying = false;
    });

    // Optional: Visually indicate when the button is actively streaming (in CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        .listen-btn.active {
            background-color: #d32f2f; /* Red for 'Stop' */
        }
        .listen-btn.active:hover {
            background-color: #c62828;
        }
    `;
    document.head.appendChild(style);
});
