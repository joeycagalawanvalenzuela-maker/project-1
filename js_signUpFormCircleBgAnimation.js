
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('allForms');

    const colors = [
        'rgba(14, 174, 171, 1)',
        'rgba(117, 195, 194, 1)',
        'rgba(165, 215, 218, 1)'
    ];

    let circles = [];
    const maxAttempts = 500;
    const overlapFactor = 0.9;
    const overflowFactor = 0.1;

    let resizeTimer;

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function isOverlapping(newCircle) {
        for (const existingCircle of circles) {
            const dx = newCircle.x - existingCircle.x;
            const dy = newCircle.y - existingCircle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ((newCircle.size / 2) + (existingCircle.size / 2)) * overlapFactor) {
                return true;
            }
        }
        return false;
    }

    function createCircle() {
        let newCircle;
        let attempts = 0;
        let isPlaced = false;

        const minX = -container.clientWidth * overflowFactor;
        const maxX = container.clientWidth * (1 + overflowFactor);
        const minY = -container.clientHeight * overflowFactor;
        const maxY = container.clientHeight * (1 + overflowFactor);

        while (!isPlaced && attempts < maxAttempts) {
            const size = getRandomNumber(30, 110);
            const x = getRandomNumber(minX, maxX);
            const y = getRandomNumber(minY, maxY);

            newCircle = {
                x: x,
                y: y,
                size: size,
                element: null
            };

            if (!isOverlapping(newCircle)) {
                isPlaced = true;
            }
            attempts++;
        }

        if (isPlaced) {
            const color = colors[Math.floor(getRandomNumber(0, colors.length))];
            const circleElement = document.createElement('div');
            circleElement.className = 'circle';
            circleElement.style.width = `${newCircle.size}px`;
            circleElement.style.height = `${newCircle.size}px`;
            circleElement.style.backgroundColor = color;
            circleElement.style.left = `${newCircle.x - newCircle.size / 2}px`;
            circleElement.style.top = `${newCircle.y - newCircle.size / 2}px`;

            container.prepend(circleElement);
            newCircle.element = circleElement;
            circles.push(newCircle);

            setTimeout(() => {
                circleElement.classList.add('is-visible');
            }, 10);
        }
    }

    function clearCircles() {
        const existingCircles = container.querySelectorAll('.circle');
        existingCircles.forEach(circle => {
            circle.classList.remove('is-visible');
            circle.addEventListener('transitionend', () => {
                circle.remove();
            });
        });
        circles = [];
    }

    function populateCircles() {
        clearCircles();
        let placedCount = 0;
        while (placedCount < 500) {
            const initialCirclesCount = circles.length;
            createCircle();
            if (circles.length === initialCirclesCount) {
                break;
            }
            placedCount++;
        }
    }

    function handleTransitionEnd() {
        container.classList.remove('is-active');
        container.removeEventListener('transitionend', handleTransitionEnd);
    }

    const resizeObserver = new ResizeObserver(entries => {
        clearTimeout(resizeTimer);

        container.classList.add('is-active');

        resizeTimer = setTimeout(() => {
            for (let entry of entries) {
                populateCircles();
            }

            const lastCircle = circles[circles.length - 1];
            if (lastCircle && lastCircle.element) {
                lastCircle.element.addEventListener('transitionend', handleTransitionEnd);
            } else {
                container.classList.remove('is-active');
            }

        }, 250);
    });

    resizeObserver.observe(container);
    populateCircles();
});