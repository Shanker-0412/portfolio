// Create starry background
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
    for (let i = 0; i < 20000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const startColor = new THREE.Color('#0A0A0A');
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active section highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").slice(1) === current) {
            link.classList.add("active");
        }
    });
});

// Certificate modal functionality
var modal = document.getElementById("certificate-modal");
var modalImg = document.getElementById("modal-certificate-image");
var viewButtons = document.getElementsByClassName("view-certificate");
var span = document.getElementsByClassName("close")[0];

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
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

// Social link animations
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.2)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1)';
    });
});
