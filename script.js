

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
const prescript = new Audio('prescript.mp3');
const randomString = (n, r='') => {
    if (n === 0) return r;
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters[randomIndex];
    return randomString(n - 1, r + randomChar);
};

const unscramble = (element) => {
    const originalText = [...element.dataset.scramble];
    const tot = originalText.length;
    let iteration = 0;
    let ch = 0; 
    let solved = '';
    element._itv = setInterval(() => {
        if (iteration > 10) {
            iteration = 0;
            solved += originalText[ch];
            ch++;
        }
        element.textContent = solved + randomString(tot - ch);
        if (ch >= tot) {
            clearInterval(element._itv);
        }        iteration++;
    },5);
};

playSound = (audio) => {
    audio.currentTime = 0;
    audio.play();
}

const scramble = (element) => {
    element.textContent = randomString(element.dataset.scramble.length);
    setTimeout(() => unscramble(element), 250);
    
};

const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            scramble(entry.target);
            scrambleObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('[data-scramble]').forEach((element) => {
    element.textContent = randomString(element.dataset.scramble.length);
    scrambleObserver.observe(element);
});

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
            animationObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('[data-animation]').forEach((element) => {
    animationObserver.observe(element);
});



