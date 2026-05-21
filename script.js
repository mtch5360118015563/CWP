document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Dropdown Code ---
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // --- Car Dataset & Logic ---
    const carData = [
        {
            image: "C:\\Users\\Anabell\\Downloads\\CAR PROJECT MTCH\\car-DJ-car.jpg",
            title: "LAMBORGHINI DIABLO SE30 JOTA",
            subtitle: "In 1993, Lamborghini celebrated its 30th anniversary by creating the Diablo SE30 (Special Edition 30). They only built 150 units of the SE30 worldwide. It was stripped out, lighter by over 250 lbs (replacing glass windows with synthetic plexiglass, removing A/C and stereos), and featured rear-wheel drive instead of the standard Diablo's all-wheel-drive system.",
            price: "PRICE: 9999999999",
            specs: [
                { metric: "Engine", val: "5.7 Liter, 60° Mid-Mounted Longitudinal V12" },
                { metric: "Valvetrain", val: "DOHC, 4 Valves Per Cylinder" },
                { metric: "Horsepower", val: "595 BHP @ 7,300 RPM (an 85 HP jump over the base SE30)" },
                { metric: "Torque", val: "428 lb-ft @ 4,800 RPM" },
                { metric: "Transmission", val: "6-Speed Manual" },
                { metric: "Curb Weight", val: "1,450 kg (3,196 lbs)" },
                { metric: "0-100 km/h (0-62 mph)", val: "3.7 seconds" },
                { metric: "Top Speed", val: "340 km/h (211 mph)" }
            ]
        },
        {
            image: "C:\\Users\\Anabell\\Downloads\\CAR PROJECT MTCH\\car-FA-car.jpg",
            title: "FERRARI LAFERRARI APERTA",
            subtitle: "Unveiled to celebrate Ferrari's 70th anniversary, the Aperta is the open-top version of the legendary LaFerrari hypercar. Combining a brutal F1-derived V12 engine with an advanced electric motor, it represents the absolute peak of high-performance hybrid engineering and extreme aerodynamic efficiency.",
            price: "PRICE: 14500000000",
            specs: [
                { metric: "Engine", val: "6.3 Liter V12 With Electric KERS Motor" },
                { metric: "Valvetrain", val: "DOHC, 4 Valves Per Cylinder" },
                { metric: "Horsepower", val: "950 Combined BHP (789 HP Engine + 161 HP KERS)" },
                { metric: "Torque", val: "Over 664 lb-ft Combined Output" },
                { metric: "Transmission", val: "7-Speed Dual-Clutch Automated Manual" },
                { metric: "Curb Weight", val: "1,280 kg (2,822 lbs) Dry Estimate" },
                { metric: "0-100 km/h (0-62 mph)", val: "Under 2.8 seconds" },
                { metric: "Top Speed", val: "Over 350 km/h (217 mph)" }
            ]
        }
    ];
    
    let currentIndex = 0;
    const sliderImage = document.querySelector('.slider-image');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const purchaseBtn = document.getElementById('purchaseBtn');
    let isAnimating = false;

    // --- Slider UI Engine Handling ---
    if (sliderImage && prevBtn && nextBtn) {
        sliderImage.style.transition = 'opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1), transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        sliderImage.style.opacity = '1';
        sliderImage.style.transform = 'scale(1) translateX(0)';

        const navigateSlider = (targetIndex, direction) => {
            if (isAnimating) return;
            isAnimating = true;

            sliderImage.style.opacity = '0';
            sliderImage.style.transform = direction === 'next' ? 'scale(0.96) translateX(-30px)' : 'scale(0.96) translateX(30px)';

            setTimeout(() => {
                sliderImage.src = carData[targetIndex].image;
                currentIndex = targetIndex;

                sliderImage.style.transition = 'none';
                sliderImage.style.transform = direction === 'next' ? 'scale(1.04) translateX(30px)' : 'scale(1.04) translateX(-30px)';
                sliderImage.getBoundingClientRect(); 

                sliderImage.style.transition = 'opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1), transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
                sliderImage.style.opacity = '1';
                sliderImage.style.transform = 'scale(1) translateX(0)';

                setTimeout(() => { isAnimating = false; }, 500);
            }, 250);
        };

        prevBtn.addEventListener('click', () => {
            const targetIndex = (currentIndex === 0) ? carData.length - 1 : currentIndex - 1;
            navigateSlider(targetIndex, 'prev');
        });

        nextBtn.addEventListener('click', () => {
            const targetIndex = (currentIndex === carData.length - 1) ? 0 : currentIndex + 1;
            navigateSlider(targetIndex, 'next');
        });

        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', () => {
                localStorage.setItem('selectedCarIndex', currentIndex);
            });
        }
    }

    // --- Dynamic Target Product Page Data Loader Engine ---
    if (window.location.pathname.includes('product.html')) {
        const selectedIndex = localStorage.getItem('selectedCarIndex') || 0;
        const targetCar = carData[selectedIndex];

        if (document.getElementById('productImage')) document.getElementById('productImage').src = targetCar.image;
        if (document.getElementById('productTitle')) document.getElementById('productTitle').innerText = targetCar.title;
        if (document.getElementById('productSubtitle')) document.getElementById('productSubtitle').innerText = targetCar.subtitle;
        if (document.getElementById('productPrice')) document.getElementById('productPrice').innerText = targetCar.price;

        const specsTableBody = document.getElementById('specsTableBody');
        if (specsTableBody) {
            specsTableBody.innerHTML = ''; 
            targetCar.specs.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="spec-metric">${item.metric}</td>
                    <td class="spec-val">${item.val}</td>
                `;
                specsTableBody.appendChild(row);
            });
        }
    }
});