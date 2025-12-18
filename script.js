/* ===========
    script.js
   =========== */

// ready event
document.addEventListener('DOMContentLoaded', () => {
    const introTitle = document.getElementById('intro-title');
    const introSubtitle = document.getElementById('intro-subtitle');
    const introBtn = document.getElementById('intro-btn');

    // intro animation
    if (introTitle && introSubtitle && introBtn) {
        const titleText = introTitle.textContent;
        const subtitleText = introSubtitle.textContent;

        // clear for animation
        introTitle.textContent = '';
        introSubtitle.textContent = '';
        
        // start animation
        typeText(introTitle, titleText, 1000)
            .then(() => typeText(introSubtitle, subtitleText, 100))
            .then(() => {
                introBtn.style.opacity = '1';
                introBtn.style.pointerEvents = 'auto';
            });
    }

    // dynamic year update for footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // visibility change when tab is not focused
    let isPaused = document.hidden;

    // animation control
    document.addEventListener('visibilitychange', () => {
        isPaused = document.hidden;
        if (isPaused) {
            document.body.classList.add('animations-paused');
        } else {
            document.body.classList.remove('animations-paused');
        }
    });

    // type text function
    async function typeText(element, text, delay = 0) {
        return new Promise(resolve => {
            setTimeout(async () => {
                element.textContent = '';
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                element.appendChild(cursor);

                // type text
                for (let i = 0; i < text.length; i++) {
                    while (isPaused) {
                        await new Promise(r => setTimeout(r, 100));
                    }
                    
                    // type each character
                    await new Promise(r => setTimeout(r, 50));
                    element.textContent = text.substring(0, i + 1);
                    element.appendChild(cursor);
                }

                // remove cursor after animation
                cursor.remove();
                resolve();
            }, delay);
        });
    }
});
