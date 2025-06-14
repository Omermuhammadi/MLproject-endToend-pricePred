document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const form = document.getElementById('prediction-form');
    const formGrid = form.querySelector('.form-grid');
    const resultSection = document.getElementById('result-section');
    const spinnerContainer = resultSection.querySelector('.spinner-container');
    const resultContent = document.getElementById('result-content');
    const priceRangeEl = document.getElementById('price-range');
    const priceLabelEl = document.getElementById('price-label');
    const recommendationCardsContainer = document.getElementById('recommendation-cards');

    // --- API & Data ---
    const API_URL = '/predict'; // Use relative path

    const features = [
        { name: 'battery_power', label: 'Battery Power (mAh)', value: 1500 },
        { name: 'px_height', label: 'Pixel Height', value: 1280 },
        { name: 'px_width', label: 'Pixel Width', value: 720 },
        { name: 'ram', label: 'RAM (MB)', value: 2048 },
        { name: 'blue', label: 'Bluetooth (0/1)', value: 1 },
        { name: 'clock_speed', label: 'Clock Speed (GHz)', value: 2.2 },
        { name: 'dual_sim', label: 'Dual SIM (0/1)', value: 1 },
        { name: 'fc', label: 'Front Camera (MP)', value: 5 },
        { name: 'four_g', label: '4G (0/1)', value: 1 },
        { name: 'int_memory', label: 'Internal Memory (GB)', value: 32 },
        { name: 'm_dep', label: 'Mobile Depth (cm)', value: 0.8 },
        { name: 'mobile_wt', label: 'Mobile Weight (g)', value: 150 },
        { name: 'n_cores', label: 'Number of Cores', value: 4 },
        { name: 'pc', label: 'Primary Camera (MP)', value: 12 },
        { name: 'sc_h', label: 'Screen Height (cm)', value: 15 },
        { name: 'sc_w', label: 'Screen Width (cm)', value: 7 },
        { name: 'talk_time', label: 'Talk Time (hours)', value: 10 },
        { name: 'three_g', label: '3G (0/1)', value: 1 },
        { name: 'touch_screen', label: 'Touch Screen (0/1)', value: 1 },
        { name: 'wifi', label: 'WiFi (0/1)', value: 1 },
    ];

    const phoneRecommendations = {
        "Budget": [
            { name: "Xiaomi Redmi 12C", image: "images/r12c.jpeg", features: ["6.71\" HD+ Display", "Helio G85", "50MP Camera"] },
            { name: "Realme C53", image: "images/c53.jpeg", features: ["108MP Camera", "90Hz Display", "5000mAh Battery"] },
        ],
        "Mid-Range": [
            { name: "Samsung Galaxy A34", image: "images/a34.jpeg", features: ["Super AMOLED 120Hz", "Dimensity 1080", "IP67 Rating"] },
            { name: "Realme C54", image: "images/c53.jpeg", features: ["Google Tensor G2", "64MP Camera", "Wireless Charging"] },
        ],
        "High-End": [
            { name: "iphone 13", image: "images/ip13.jpeg", features: ["Glyph Interface", "Snapdragon 8+ Gen 1", "Dual 50MP Camera"] },
            { name: "OnePlus 11R", image: "images/o11r.jpeg", features: ["Snapdragon 8+ Gen 1", "120Hz Super Fluid Display", "100W SUPERVOOC"] },
        ],
        "Flagship": [
            { name: "Apple iPhone 15 Pro", image: "images/ip15.jpeg", features: ["A17 Pro Chip", "Pro Camera System", "Titanium Design"] },
            { name: "Samsung Galaxy S24 Ultra", image: "images/s24.jpeg", features: ["Galaxy AI", "200MP Camera", "Built-in S Pen"] },
        ]
    };

    // --- Functions ---

    // Generate form fields dynamically
    const generateFormFields = () => {
        features.forEach(feature => {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = `
                <label for="${feature.name}">${feature.label}</label>
                <input type="number" id="${feature.name}" name="${feature.name}" value="${feature.value}" required step="any">
            `;
            formGrid.appendChild(inputGroup);
        });
    };

    const generateRecommendationCards = (label) => {
        recommendationCardsContainer.innerHTML = ''; // Clear previous cards
        const recommendations = phoneRecommendations[label] || [];

        if (recommendations.length === 0) {
            recommendationCardsContainer.innerHTML = '<p>No specific recommendations available for this category.</p>';
            return;
        }

        recommendations.forEach(phone => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${phone.image}" alt="${phone.name}">
                </div>
                <div class="card-content">
                    <h4>${phone.name}</h4>
                    <ul>
                        ${phone.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            `;
            recommendationCardsContainer.appendChild(card);
        });
    };

    const displayResult = (result) => {
        priceRangeEl.textContent = result.price_range;
        priceLabelEl.textContent = result.label;
        generateRecommendationCards(result.label);
    };

    const displayError = (message) => {
        priceRangeEl.textContent = 'Error';
        priceLabelEl.textContent = message;
        recommendationCardsContainer.innerHTML = '';
    };

    // --- Event Listener ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        resultSection.classList.remove('hidden');
        resultContent.classList.add('hidden');
        spinnerContainer.style.display = 'block';

        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = parseFloat(value);
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Prediction failed');
            }

            const result = await response.json();
            displayResult(result);

        } catch (error) {
            displayError(error.message);
        } finally {
            setTimeout(() => { // Add a small delay for effect
                spinnerContainer.style.display = 'none';
                resultContent.classList.remove('hidden');
            }, 500);
        }
    });

    // --- Initializer ---
    generateFormFields();
});
