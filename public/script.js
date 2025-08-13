// BULLETPROOF Storm Maps Configuration
const stormMaps = {
    'vero': {
        title: 'Hail Damage Map of Vero Lake Estates & West Corridor',
        subtitle: 'Comprehensive storm damage assessment for Vero Lake Estate area',
        image: '/images/storm-maps/vero-lake-estates-storm-map.jpg',
        data: 'Storm Activity Report - Saturday, May 24, 2025:\n\n• Rain Intensity: 0.05-1.00 inches/hour detected\n• Affected Areas: Vero Lake Estates, Sebastian, Micco\n• Storm Duration: 12:00 AM - 9:00 PM\n• Property Impact: 2,847+ homes in coverage area\n• Hail Size: Quarter to Golf Ball sized (0.5-1.75")\n• Wind Speeds: 65-75+ mph sustained\n• Damage Classification: Moderate to Severe\n• Insurance Claim Priority: HIGH - Immediate assessment recommended\n• Coverage Zone: Complete I-95 corridor from Sebastian to Vero Beach\n\nProfessional storm damage inspection available - Call now!'
    },
    'melbourne': {
        title: 'Melbourne & Satellite Beach Hail Storm Activity',
        subtitle: 'Severe hail damage assessment for Melbourne metropolitan area',
        image: '/images/storm-maps/melbourne-hail-map.jpg',
        data: 'Storm Activity Report - Tuesday, May 14, 2024:\n\n• Hail Size: 1.5 inches (Golf Ball sized) confirmed\n• Affected Properties: 7,264 homes in impact zone\n• Areas Hit: Melbourne, West Melbourne, Palm Shores, Satellite Beach\n• Storm Duration: Severe weather event\n• Wind Speeds: 70+ mph sustained winds\n• Damage Classification: SEVERE - Major property damage\n• Insurance Priority: CRITICAL - Immediate claims processing\n• Highway Impact: I-95 corridor affected\n\n⚠️ URGENT: Properties in this area qualify for emergency roof inspection\nCall now for FREE storm damage assessment!'
    },
    'palmbay': {
        title: 'Palm Bay Storm Damage Assessment',
        subtitle: 'Multi-hazard storm impact analysis for Palm Bay region',
        image: '/images/storm-maps/palm-bay-storm-map.jpg',
        data: 'Storm Activity Report - Saturday, May 24, 2025:\n\n• Hail Size: 0.5-1.50 inches (Quarter to Golf Ball sized)\n• Hail Impact: 87,000+ homes in damage zone\n• Wind Damage: 50-60 mph sustained winds\n• Wind Impact: 8,000+ homes affected by wind damage\n• Areas Hit: Palm Bay, Bayside Lakes, Holiday Park, Weber Woods\n• Total Properties: 95,000+ homes in combined impact zones\n• Damage Types: Roof damage, siding impact, window damage\n• Insurance Status: EXPEDITED claims processing available\n• Highway Access: I-95 and Highway 507 corridors affected\n\n🏠 DUAL THREAT ZONE: Both hail and wind damage confirmed\nFREE comprehensive damage assessment available!'
    },
    'coverage': {
        title: 'Complete Storm Coverage Analysis - Service Areas',
        subtitle: 'Professional storm damage assessment for all affected regions',
        image: '/images/storm-maps/coverage-area-map.jpg',
        data: 'COMPREHENSIVE SERVICE COVERAGE:\n\n🎯 PRIMARY SERVICE AREAS:\n• Vero Lake Estates - Complete I-95 corridor\n• Fellsmere - Highway 512 corridor  \n• Sebastian - St. Sebastian River area\n• West Vero Corridor - Highway 60 & 619\n\n📊 COVERAGE STATISTICS:\n• Total Service Area: 200+ square miles\n• Properties Served: 15,000+ homes in coverage zone\n• Response Time: Same-day emergency service\n• Success Rate: 98% insurance claim approval\n• Experience: 500+ roofs inspected this season\n\n💼 INSURANCE QUALIFICATION:\n"You may qualify for a new Roof through your insurance.\nWe have already helped a number of Home Owners Get APPROVED"\n\n📞 IMMEDIATE ACTION REQUIRED:\nIf you live in THESE AREAS, set up your NO COST inspection TODAY!'
    }
};

// BULLETPROOF Storm Map Display
function showStormMap(type) {
    const map = stormMaps[type];
    if (!map) {
        console.error('Storm map type not found:', type);
        return;
    }
    
    // Update modal content
    const modal = document.getElementById('stormMapModal');
    const title = document.getElementById('stormMapTitle');
    const subtitle = document.getElementById('stormMapSubtitle');
    const image = document.getElementById('stormMapImage');
    const data = document.getElementById('stormMapData');
    
    if (title) title.textContent = map.title;
    if (subtitle) subtitle.textContent = map.subtitle;
    if (image) {
        image.src = map.image;
        image.alt = map.title;
    }
    if (data) {
        data.innerHTML = '<pre class="text-gray-700 font-semibold whitespace-pre-line">' + map.data + '</pre>';
    }
    
    // Show modal
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

// Close Storm Map Modal
function closeStormMapModal() {
    const modal = document.getElementById('stormMapModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// OLD FUNCTION - REPLACED ABOVE
function showStormMapOLD(type) {
    const map = stormMaps[type];
    if (!map) {
        console.error('Storm map type not found:', type);
        return;
    }

    // Remove any existing modal
    const existingModal = document.querySelector('.storm-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal with enhanced styling
    const modal = document.createElement('div');
    modal.className = 'storm-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 16px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    `;

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 18px;
        cursor: pointer;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    closeBtn.onclick = closeStormMap;

    // Create content
    const content = `
        <div style="padding: 40px;">
            <h2 style="font-size: 28px; font-weight: bold; margin-bottom: 10px; color: #1f2937;">${map.title}</h2>
            <p style="font-size: 16px; color: #6b7280; margin-bottom: 30px;">${map.subtitle}</p>
            <img src="${map.image}" alt="${map.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 30px;">
            <div style="background: #f9fafb; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                <pre style="font-family: inherit; white-space: pre-line; color: #374151; font-weight: 500; margin: 0;">${map.data}</pre>
            </div>
        </div>
    `;

    modalContent.innerHTML = content;
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeStormMap();
        }
    });
}

// Close storm map function
function closeStormMap() {
    const modal = document.querySelector('.storm-modal');
    if (modal) {
        modal.remove();
    }
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Roof Gallery Functionality
function initRoofGallery() {
    const gallery = document.getElementById('roofGallery');
    if (!gallery) return;

    const photos = [
        { src: '/images/roofing-lead-1.jpeg', alt: 'Professional Roof Inspection' },
        { src: '/images/roofing-lead-1.jpeg', alt: 'Storm Damage Assessment' },
        { src: '/images/roofing-lead-3.jpeg', alt: 'Beautiful Stone Coated Steel Roof' },
        { src: '/images/roofing-lead-1.jpeg', alt: 'Roof Repair Work' },
        { src: '/images/roofing-lead-1.jpeg', alt: 'New Roof Installation' },
        { src: '/images/roofing-lead-1.jpeg', alt: 'Quality Roofing Materials' }
    ];

    photos.forEach((photo, index) => {
        const button = document.createElement('button');
        button.className = 'gallery-item';
        button.onclick = () => openLightbox(photo);
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = 'lazy';
        
        button.appendChild(img);
        gallery.appendChild(button);
    });
}

// Lightbox functionality
function openLightbox(photo) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightboxModal';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    const content = `
        <div style="position: relative; max-width: 90vw; max-height: 90vh;">
            <button onclick="closeLightboxModal()" style="
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            ">×</button>
            <img src="${photo.src}" alt="${photo.alt}" style="
                width: 100%;
                height: auto;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 8px;
            ">
        </div>
    `;

    lightbox.innerHTML = content;
    document.body.appendChild(lightbox);
}

function closeLightboxModal() {
    const lightbox = document.getElementById('lightboxModal');
    if (lightbox) {
        lightbox.remove();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize roof gallery
    initRoofGallery();
    const form = document.getElementById('leadForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }

    // ZIP code formatting
    const zipInput = document.getElementById('zip');
    if (zipInput) {
        zipInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5);
            }
            e.target.value = value;
        });
    }

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            }
            
            // Hide any existing messages
            if (successMessage) successMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                zip: formData.get('zip'),
                address: formData.get('address'),
                city: formData.get('city'),
                property_type: formData.get('property_type'),
                roof_age: formData.get('roof_age'),
                insurance_company: formData.get('insurance_company'),
                preferred_contact: formData.get('preferred_contact'),
                urgency_level: formData.get('urgency_level'),
                notes: formData.get('notes')
            };

            try {
                const response = await fetch('/api/leads', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // Show success message
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        successMessage.scrollIntoView({ behavior: 'smooth' });
                    }
                    form.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.scrollIntoView({ behavior: 'smooth' });
                }
            } finally {
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-calendar-check mr-2"></i>Schedule My Free Assessment';
                }
            }
        });
    }

    // Close messages when clicking X
    document.querySelectorAll('.close-message').forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });

    // Storm Map Modal Event Listeners
    const closeStormMapBtn = document.getElementById('closeStormMap');
    const stormMapModal = document.getElementById('stormMapModal');
    
    if (closeStormMapBtn) {
        closeStormMapBtn.addEventListener('click', closeStormMapModal);
    }
    
    if (stormMapModal) {
        stormMapModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeStormMapModal();
            }
        });
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            document.getElementById('mobileMenuContent').classList.remove('-translate-x-full');
        });
    }
    
    if (closeMobileMenu && mobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            document.getElementById('mobileMenuContent').classList.add('-translate-x-full');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        });
    }
});




