gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray('section');
sections.forEach((section, index) => {
    const elements = section.querySelectorAll('h1, h2, p, .btn, .social-link');
    
    gsap.fromTo(elements, 
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

gsap.to('nav', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
    },
    backgroundColor: 'rgba(10, 31, 59, 0.8)',
    duration: 0.5
});

function createSky(containerId) {
    const container = document.getElementById(containerId);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

    const starsVertices = [];
    for (let i = 0; i < 15000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const startColor = new THREE.Color('#0a1f3b');
    const endColor = new THREE.Color('#000000');
    let skyColor = startColor.clone();

    camera.position.z = 1;

    function animate() {
        requestAnimationFrame(animate);

        stars.rotation.y += 0.0002;

        const scrollProgress = Math.min(1, Math.max(0, window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)));
        skyColor.lerpColors(startColor, endColor, scrollProgress);
        scene.background = skyColor;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });

    renderer.setClearColor(0x000000, 0);
}

createSky('bg');

function createStardust() {
    const stardustContainer = document.getElementById('stardust');
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'stardust-particle';
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${Math.random() * 5 + 5}s linear infinite`;
        stardustContainer.appendChild(star);
    }
}

createStardust();

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
        createShootingStar();
    }, 3000);
}

setInterval(createShootingStar, 6000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

gsap.utils.toArray("#certificates .certificate").forEach(cert => {
    gsap.fromTo(cert, 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: cert,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        }
    );
});

const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        gsap.to(link, { scale: 1.2, duration: 0.3, ease: 'power2.out' });
    });
    link.addEventListener('mouseout', () => {
        gsap.to(link, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
});

gsap.utils.toArray("section").forEach((section, i) => {
    const bg = section.querySelector(".container");
    
    gsap.fromTo(bg, {
        backgroundPosition: () => i ? `50% ${-window.innerHeight / 2}px` : "50% 0px"
    }, {
        backgroundPosition: () => `50% ${window.innerHeight / 2}px`,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: () => i ? "top bottom" : "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
        }
    });
});

var modal = document.getElementById("certificate-modal");
var modalImg = document.getElementById("modal-certificate-image");
var viewButtons = document.getElementsByClassName("view-certificate");
var span = document.getElementsByClassName("close")[0];

function openModal() {
    gsap.fromTo(modal, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, display: 'block' }
    );
}

function closeModal() {
    gsap.to(modal, 
        { opacity: 0, duration: 0.3, onComplete: () => modal.style.display = 'none' }
    );
}

for (var i = 0; i < viewButtons.length; i++) {
    viewButtons[i].onclick = function() {
        modalImg.src = this.parentElement.parentElement.querySelector(".certificate-image").src;
        openModal();
    }
}

span.onclick = closeModal;

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
