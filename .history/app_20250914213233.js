document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true
    });

    // Resume download functionality
    document.getElementById('download-resume').addEventListener('click', function () {
        window.open('Resume.pdf', '_blank');
    });

    // Role changer animation
    const roles = ["Frontend Developer", "Data Enthusiast", "Designer", "Data Analyst"];
    let roleIndex = 0;
    const roleElement = document.getElementById('role-changer');

    function changeRole() {
        roleElement.style.opacity = 0;
        setTimeout(() => {
            roleElement.textContent = roles[roleIndex];
            roleElement.style.opacity = 1;
            roleIndex = (roleIndex + 1) % roles.length;
        }, 500);
    }

    setInterval(changeRole, 3000);

    // Video Elements
    const videoElements = [
        { id: 'projectVideo1', hoverElement: document.querySelector('.hover-sign') },
        { id: 'projectVideo2', hoverElement: null },
        { id: 'projectVideo3', hoverElement: null },
        { id: 'projectVideo4', hoverElement: null }
    ].map(item => {
        const video = document.getElementById(item.id);
        if (!video) {
            console.error(`Video element with ID ${item.id} not found`);
            return null;
        }
        return { video, hoverElement: item.hoverElement };
    }).filter(item => item !== null);

    // Sidebar Elements
    const sideBar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.menu-icon');
    const closeButton = document.querySelector('.close-icon');

    if (!sideBar || !menuButton || !closeButton) {
        console.error('One or more sidebar elements not found');
    }

    // Video Interaction Functions
    function setupVideoInteractions() {
        videoElements.forEach(({ video, hoverElement }) => {
            if (!video) return;

            // Play/pause on hover
            video.addEventListener('mouseenter', () => {
                video.play().catch(e => console.error('Video play failed:', e));
                if (hoverElement) hoverElement.classList.add('active');
            });

            video.addEventListener('mouseleave', () => {
                video.pause();
                if (hoverElement) hoverElement.classList.remove('active');
            });

            // Keyboard accessibility
            video.addEventListener('focus', () => {
                video.play().catch(e => console.error('Video play failed:', e));
                if (hoverElement) hoverElement.classList.add('active');
            });

            video.addEventListener('blur', () => {
                video.pause();
                if (hoverElement) hoverElement.classList.remove('active');
            });

            // Touch device support
            video.addEventListener('touchstart', () => {
                if (video.paused) {
                    video.play().catch(e => console.error('Video play failed:', e));
                } else {
                    video.pause();
                }
            }, { passive: true });
        });
    }

    // Sidebar Functions
    function setupSidebar() {
        if (!sideBar || !menuButton || !closeButton) return;

        // Toggle sidebar
        const toggleSidebar = (open) => {
            if (open) {
                sideBar.classList.remove('close-sidebar');
                sideBar.classList.add('open-sidebar');
                document.body.style.overflow = 'hidden';
            } else {
                sideBar.classList.remove('open-sidebar');
                sideBar.classList.add('close-sidebar');
                document.body.style.overflow = '';
            }
        };

        menuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleSidebar(true);
        });
        closeButton.addEventListener('click', () => toggleSidebar(false));

        sideBar.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        document.addEventListener('click', (e) => {
            if (sideBar.classList.contains('open-sidebar') &&
                !sideBar.contains(e.target) &&
                e.target !== menuButton) {
                toggleSidebar(false);
            }
        });


        // Close sidebar with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sideBar.classList.contains('open-sidebar')) {
                toggleSidebar(false);
            }
        });
    }

    // Smooth scrolling for navigation
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize all functionality
    function init() {
        setupVideoInteractions();
        setupSidebar();
        setupSmoothScrolling();

        // Set tabindex for keyboard accessibility
        videoElements.forEach(({ video }) => {
            if (video) video.setAttribute('tabindex', '0');
        });
    }

    init();
});
