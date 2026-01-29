// ===========================================
// VIDEO & GALLERY FUNCTIONALITY
// ===========================================

function setupMediaSection() {
    // Video Player Controls
    const video = document.getElementById('awarenessVideo');
    const playBtn = document.getElementById('playVideo');
    const fullscreenBtn = document.getElementById('fullscreenVideo');
    const shareBtn = document.getElementById('shareVideo');
    const downloadBtn = document.getElementById('downloadVideo');
    const videoViews = document.getElementById('videoViews');
    
    // Play/Pause Video
    if (playBtn && video) {
        playBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playBtn.style.background = 'var(--danger)';
                
                // Increment view count
                incrementVideoViews();
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                playBtn.style.background = 'var(--primary)';
            }
        });
        
        // Update play button when video ends
        video.addEventListener('ended', function() {
            playBtn.innerHTML = '<i class="fas fa-redo"></i>';
            playBtn.style.background = 'var(--success)';
            
            setTimeout(() => {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                playBtn.style.background = 'var(--primary)';
            }, 2000);
        });
        
        // Hide overlay when video starts playing
        video.addEventListener('play', function() {
            document.querySelector('.video-overlay').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.video-overlay').style.display = 'none';
            }, 300);
        });
        
        // Show overlay when video pauses
        video.addEventListener('pause', function() {
            document.querySelector('.video-overlay').style.display = 'flex';
            setTimeout(() => {
                document.querySelector('.video-overlay').style.opacity = '1';
            }, 10);
        });
    }
    
    // Fullscreen
    if (fullscreenBtn && video) {
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
    }
    
    // Share Video
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'فيديو توعوي: أهمية التنسيق في المساعدات',
                    text: 'شاهد هذا الفيديو التوعوي عن أهمية تنسيق المساعدات في غزة',
                    url: window.location.href + '#media'
                });
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(window.location.href + '#media').then(() => {
                    showNotification('تم نسخ رابط الفيديو', 'success');
                });
            }
        });
    }
    
    // Download Video (Simulated)
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            showNotification('جاري تحضير الفيديو للتحميل...', 'info');
            setTimeout(() => {
                showNotification('عذراً، هذه الميزة غير متاحة حالياً', 'warning');
            }, 1500);
        });
    }
    
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.gallery-filter .btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Download Gallery (Simulated)
    const downloadGalleryBtn = document.getElementById('downloadGallery');
    if (downloadGalleryBtn) {
        downloadGalleryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('جاري تحضير ألبوم الصور...', 'info');
            
            // Simulate download process
            setTimeout(() => {
                // Create a zip file simulation
                const link = document.createElement('a');
                link.href = '#';
                link.download = 'ألبوم_صور_المساعدات.zip';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                showNotification('تم بدء تحميل ألبوم الصور', 'success');
            }, 2000);
        });
    }
    
    // Lightbox initialization
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'صورة %1 من %2',
        'positionFromTop': 100,
        'showImageNumberLabel': true,
        'fitImagesInViewport': true
    });
}

// Increment video views (simulated)
function incrementVideoViews() {
    const viewsElement = document.getElementById('videoViews');
    if (viewsElement) {
        let currentViews = parseInt(viewsElement.textContent.replace(/,/g, '')) || 2450;
        currentViews++;
        viewsElement.textContent = currentViews.toLocaleString();
        
        // Save to localStorage
        localStorage.setItem('videoViews', currentViews);
    }
}

// Load saved views from localStorage
function loadVideoViews() {
    const viewsElement = document.getElementById('videoViews');
    if (viewsElement) {
        const savedViews = localStorage.getItem('videoViews');
        if (savedViews) {
            viewsElement.textContent = parseInt(savedViews).toLocaleString();
        }
    }
}

// ===========================================
// EXISTING CODE FROM PREVIOUS VERSIONS
// ===========================================

// Data-driven Rendering: Array of Aids with more details
const aids = [
    { 
        id: 1,
        type: 'غذاء', 
        name: 'سلال غذائية شهرية',
        area: 'غزة الشمالية', 
        date: '2024-01-25',
        time: '10:00 صباحاً',
        details: 'توزيع سلال غذائية تحتوي على: أرز، سكر، زيت، معكرونة، حليب، تونة، وبعض المواد الأساسية الأخرى',
        status: 'متاح',
        urgent: true,
        organizer: 'جمعية البر الخيرية',
        contact: '0591112233',
        capacity: 150,
        registered: 120
    },
    { 
        id: 2,
        type: 'دواء', 
        name: 'عيادة طبية متنقلة',
        area: 'خان يونس', 
        date: '2024-01-26',
        time: '9:00 صباحاً - 2:00 ظهراً',
        details: 'عيادة طبية متنقلة توفر: فحوصات طبية، أدوية أساسية، استشارات صحية مجانية',
        status: 'متاح',
        urgent: true,
        organizer: 'الهلال الأحمر الفلسطيني',
        contact: '0592223344',
        capacity: 200,
        registered: 180
    },
    { 
        id: 3,
        type: 'مياه', 
        name: 'توزيع مياه نقية',
        area: 'رفح', 
        date: '2024-01-27',
        time: '8:00 صباحاً',
        details: 'توزيع عبوات مياه نظيفة 5 لتر لكل أسرة، مع وجود نقاط مياه مركزية',
        status: 'متاح',
        urgent: false,
        organizer: 'بلدية رفح',
        contact: '0593334455',
        capacity: 500,
        registered: 300
    },
    { 
        id: 4,
        type: 'إيواء', 
        name: 'توزيع خيام وبطاطين',
        area: 'غزة الوسطى', 
        date: '2024-01-28',
        time: '11:00 صباحاً',
        details: 'توزيع خيام وأغطية وبطاطين للعائلات التي فقدت مساكنها',
        status: 'قريباً',
        urgent: true,
        organizer: 'الأونروا',
        contact: '0594445566',
        capacity: 100,
        registered: 80
    },
    { 
        id: 5,
        type: 'تعليم', 
        name: 'مستلزمات مدرسية',
        area: 'غزة المدينة', 
        date: '2024-01-29',
        time: '10:00 صباحاً - 1:00 ظهراً',
        details: 'توزيع حقائب مدرسية وأدوات قرطاسية للطلاب',
        status: 'متاح',
        urgent: false,
        organizer: 'وزارة التربية والتعليم',
        contact: '0595556677',
        capacity: 300,
        registered: 250
    },
    { 
        id: 6,
        type: 'غذاء', 
        name: 'وجبات جاهزة ساخنة',
        area: 'غزة الشمالية', 
        date: '2024-01-30',
        time: '1:00 ظهراً',
        details: 'توزيع وجبات غذائية ساخنة جاهزة للأكل',
        status: 'قريباً',
        urgent: true,
        organizer: 'مؤسسة الأمل للإغاثة',
        contact: '0596667788',
        capacity: 400,
        registered: 0
    }
];

// Global variables for registration
let currentAidForRegistration = null;
let registrations = JSON.parse(localStorage.getItem('aidRegistrations') || '[]');

// On Document Ready
$(document).ready(function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initial render
    renderAids(aids);
    updateFilterCount();
    loadVideoViews();
    
    // Setup all functionality
    setupEventListeners();
    setupScrollEffects();
    setupFormValidation();
    setupBackToTop();
    setupViewToggle();
    setupRegistrationModal();
    setupRegistrationStats();
    setupTeamImages();
    setupMediaSection();

    // Event Listeners
    function setupEventListeners() {
        $('#typeFilter, #areaFilter, #dateFilter').on('change', applyFilters);
        $('#searchFilter').on('keyup', applyFilters);
        $('#resetFilter').on('click', resetFilters);
        $(document).on('click', '.view-details', showAidDetails);
        $(document).on('click', '.register-btn', registerForAid);
        $('#aidForm').on('submit', handleFormSubmit);
        $('#searchFilter + .btn').on('click', applyFilters);
    }

    // Scroll Effects
    function setupScrollEffects() {
        $(window).on('scroll', function() {
            const scroll = $(window).scrollTop();
            
            // Header shadow
            if (scroll > 100) {
                $('.main-header').addClass('scrolled');
            } else {
                $('.main-header').removeClass('scrolled');
            }
            
            // Back to top button
            if (scroll > 300) {
                $('.back-to-top').addClass('visible');
            } else {
                $('.back-to-top').removeClass('visible');
            }
        });
    }

    // Form Validation
    function setupFormValidation() {
        // Phone number validation
        $('#phone').on('input', function() {
            const phone = $(this).val().replace(/\D/g, '');
            if (phone.length === 10) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid').addClass('is-invalid');
            }
        });

        // Real-time validation
        $('input[required], textarea[required]').on('blur', function() {
            if ($(this).val().trim() === '') {
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid').addClass('is-valid');
            }
        });
    }

    // Back to Top
    function setupBackToTop() {
        $('.back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });
    }

    // Toggle View
    function setupViewToggle() {
        $('.toggle-view').on('click', function() {
            const $table = $('.table-card .table-responsive');
            const $cards = $('#aidCards');
            
            if ($table.is(':visible')) {
                $table.hide();
                $cards.show();
                $(this).html('<i class="fas fa-exchange-alt"></i> عرض جدولي');
            } else {
                $table.show();
                $cards.hide();
                $(this).html('<i class="fas fa-exchange-alt"></i> عرض بطاقات');
            }
        });
    }

    // Function to render aids
    function renderAids(filteredAids) {
        $('#aidCards').empty();
        $('#aidTableBody').empty();
        
        if (filteredAids.length === 0) {
            $('#aidCards').html(`
                <div class="col-12 text-center py-5">
                    <div class="no-results">
                        <i class="fas fa-search fa-3x text-muted mb-3"></i>
                        <h4 class="text-muted">لا توجد نتائج تطابق معايير البحث</h4>
                        <p class="text-muted">حاول تغيير معايير الفلتر أو البحث</p>
                        <button id="resetFilter" class="btn btn-primary mt-3">
                            <i class="fas fa-redo"></i> إعادة تعيين الفلتر
                        </button>
                    </div>
                </div>
            `);
            return;
        }

        filteredAids.forEach(aid => {
            // Determine status badge color and class
            let statusColor = 'success';
            let statusClass = 'status-available';
            if (aid.status === 'قريباً') {
                statusColor = 'warning';
                statusClass = 'status-soon';
            }
            if (aid.urgent) {
                statusClass = 'status-urgent';
            }
            
            // Determine icon based on type
            let typeIcon = 'fas fa-box';
            let typeColor = 'text-primary';
            if (aid.type === 'دواء') {
                typeIcon = 'fas fa-medkit';
                typeColor = 'text-danger';
            }
            if (aid.type === 'مياه') {
                typeIcon = 'fas fa-tint';
                typeColor = 'text-info';
            }
            if (aid.type === 'إيواء') {
                typeIcon = 'fas fa-home';
                typeColor = 'text-warning';
            }
            if (aid.type === 'تعليم') {
                typeIcon = 'fas fa-graduation-cap';
                typeColor = 'text-success';
            }

            // Cards
            $('#aidCards').append(`
                <div class="col-lg-4 col-md-6 mb-4" data-id="${aid.id}">
                    <div class="card h-100 shadow-hover">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <i class="${typeIcon} ${typeColor} me-2"></i>
                                <span class="fw-bold">${aid.type}</span>
                            </div>
                            <div>
                                <span class="${statusClass} status-badge">${aid.status}</span>
                                ${aid.urgent ? '<span class="badge bg-danger ms-1">عاجل</span>' : ''}
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${aid.name}</h5>
                            <div class="card-text mb-3">
                                <p class="mb-2"><i class="fas fa-map-marker-alt text-muted me-2"></i>${aid.area}</p>
                                <p class="mb-2"><i class="fas fa-calendar-alt text-muted me-2"></i>${aid.date}</p>
                                <p class="mb-3"><i class="fas fa-clock text-muted me-2"></i>${aid.time}</p>
                                <p class="small text-muted">${aid.details.substring(0, 120)}...</p>
                            </div>
                            <div class="progress mb-3" style="height: 8px;">
                                <div class="progress-bar bg-success" 
                                     style="width: ${(aid.registered / aid.capacity) * 100}%"
                                     role="progressbar">
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">${aid.registered}/${aid.capacity} مسجلين</small>
                                <small class="text-muted"><i class="fas fa-users me-1"></i>${aid.organizer}</small>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent">
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-sm btn-view view-details" data-id="${aid.id}">
                                    <i class="fas fa-eye"></i> التفاصيل
                                </button>
                                <button class="btn btn-sm btn-register register-btn" data-id="${aid.id}">
                                    <i class="fas fa-user-plus"></i> التسجيل
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            // Table Rows
            $('#aidTableBody').append(`
                <tr data-id="${aid.id}">
                    <td>${aid.id}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <i class="${typeIcon} ${typeColor} me-2"></i>
                            <span>${aid.type}</span>
                        </div>
                    </td>
                    <td>${aid.name}</td>
                    <td>${aid.area}</td>
                    <td>${aid.date}</td>
                    <td>${aid.time}</td>
                    <td>
                        <span class="${statusClass} status-badge">${aid.status}</span>
                        ${aid.urgent ? '<span class="badge bg-danger ms-1">عاجل</span>' : ''}
                    </td>
                    <td>
                        <div class="d-flex gap-2">
                            <button class="btn btn-sm btn-view view-details" data-id="${aid.id}" title="عرض التفاصيل">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-register register-btn" data-id="${aid.id}" title="التسجيل">
                                <i class="fas fa-user-plus"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    // Function to apply filters
    function applyFilters() {
        const selectedType = $('#typeFilter').val();
        const selectedArea = $('#areaFilter').val();
        const selectedDate = $('#dateFilter').val();
        const searchValue = $('#searchFilter').val().toLowerCase();

        const filteredAids = aids.filter(aid => {
            let matches = true;
            
            // Filter by type
            if (selectedType !== 'all' && aid.type !== selectedType) {
                matches = false;
            }
            
            // Filter by area
            if (selectedArea !== 'all' && aid.area !== selectedArea) {
                matches = false;
            }
            
            // Filter by date
            if (selectedDate !== 'all') {
                const today = new Date();
                const aidDate = new Date(aid.date);
                
                if (selectedDate === 'today') {
                    if (aidDate.toDateString() !== today.toDateString()) {
                        matches = false;
                    }
                } else if (selectedDate === 'week') {
                    const weekFromNow = new Date();
                    weekFromNow.setDate(today.getDate() + 7);
                    if (aidDate < today || aidDate > weekFromNow) {
                        matches = false;
                    }
                } else if (selectedDate === 'month') {
                    const monthFromNow = new Date();
                    monthFromNow.setMonth(today.getMonth() + 1);
                    if (aidDate < today || aidDate > monthFromNow) {
                        matches = false;
                    }
                } else if (selectedDate === 'soon') {
                    if (aid.status !== 'قريباً') {
                        matches = false;
                    }
                }
            }
            
            // Search filter
            if (searchValue) {
                const searchFields = [
                    aid.type,
                    aid.name,
                    aid.area,
                    aid.details,
                    aid.organizer
                ];
                if (!searchFields.some(field => field.toLowerCase().includes(searchValue))) {
                    matches = false;
                }
            }
            
            return matches;
        });

        renderAids(filteredAids);
        updateFilterCount(filteredAids.length);
    }

    // Function to reset filters
    function resetFilters() {
        $('#typeFilter').val('all');
        $('#areaFilter').val('all');
        $('#dateFilter').val('all');
        $('#searchFilter').val('');
        renderAids(aids);
        updateFilterCount();
        
        // Animation effect
        const $resetBtn = $('#resetFilter');
        const originalHtml = $resetBtn.html();
        $resetBtn.html('<i class="fas fa-check"></i> تمت الإعادة');
        $resetBtn.removeClass('btn-outline-secondary').addClass('btn-success');
        
        setTimeout(() => {
            $resetBtn.html(originalHtml);
            $resetBtn.removeClass('btn-success').addClass('btn-outline-secondary');
        }, 2000);
    }

    // Function to update filter count
    function updateFilterCount(count) {
        const total = aids.length;
        const showing = count || total;
        $('#filterCount strong').first().text(showing);
        $('#filterCount strong').last().text(total);
    }

    // Event: Click for Modal Details
    function showAidDetails() {
        const aidId = $(this).data('id');
        const aid = aids.find(a => a.id === aidId);
        
        if (aid) {
            const modalContent = `
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="text-primary mb-3">${aid.name}</h5>
                        <div class="mb-3">
                            <p><strong>نوع المساعدة:</strong> ${aid.type}</p>
                            <p><strong>المنطقة:</strong> ${aid.area}</p>
                            <p><strong>التاريخ:</strong> ${aid.date}</p>
                            <p><strong>الوقت:</strong> ${aid.time}</p>
                            <p><strong>الحالة:</strong> <span class="status-badge ${aid.status === 'متاح' ? 'status-available' : 'status-soon'}">${aid.status}</span></p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <p><strong>المنظم:</strong> ${aid.organizer}</p>
                            <p><strong>رقم الاتصال:</strong> ${aid.contact}</p>
                            <p><strong>السعة الكلية:</strong> ${aid.capacity} أسرة</p>
                            <p><strong>المسجلين حالياً:</strong> ${aid.registered} أسرة</p>
                        </div>
                        <div class="progress mb-3" style="height: 20px;">
                            <div class="progress-bar bg-success" 
                                 style="width: ${(aid.registered / aid.capacity) * 100}%"
                                 role="progressbar">
                                ${Math.round((aid.registered / aid.capacity) * 100)}% تم التسجيل
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h6 class="text-secondary mb-2">تفاصيل المساعدة:</h6>
                        <div class="alert alert-light">
                            <p class="mb-0">${aid.details}</p>
                        </div>
                    </div>
                </div>
                ${aid.urgent ? `
                <div class="alert alert-danger mt-3">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    <strong>ملاحظة:</strong> هذه المساعدة عاجلة وتحتاج لاستجابة سريعة
                </div>` : ''}
            `;
            
            $('#modalBody').html(modalContent);
            $('#aidModal').modal('show');
            
            // Set up button in modal footer
            $('#requestThisAid').off('click').on('click', function() {
                $('#aidModal').modal('hide');
                $('#aidType').val(aid.type);
                $('html, body').animate({
                    scrollTop: $('#contact').offset().top - 100
                }, 800);
            });
        }
    }

    // Registration Modal Setup
    function setupRegistrationModal() {
        $('#registrationForm').on('submit', handleRegistrationSubmit);
        
        // Phone number validation
        $('#regPhone').on('input', function() {
            const phone = $(this).val().replace(/\D/g, '');
            if (phone.length === 10) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid').addClass('is-invalid');
            }
        });
        
        // ID validation (Palestinian ID format)
        $('#regId').on('input', function() {
            const id = $(this).val().replace(/\D/g, '');
            if (id.length === 9) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid').addClass('is-invalid');
            }
        });
    }

    // Event: Register for aid
    function registerForAid(e) {
        e.preventDefault();
        const aidId = $(this).data('id');
        const aid = aids.find(a => a.id === aidId);
        
        if (aid) {
            if (aid.registered < aid.capacity) {
                currentAidForRegistration = aid;
                
                // Set aid name in modal
                $('#aidNameForRegistration').text(aid.name);
                
                // Show registration modal
                $('#registrationModal').modal('show');
            } else {
                showNotification('عذراً، لقد تم اكتمال السعة لهذه المساعدة', 'danger');
            }
        }
    }

    // Function to handle registration form submission
    function handleRegistrationSubmit(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        $(this).find('[required]').each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        // Validate phone
        const phone = $('#regPhone').val().replace(/\D/g, '');
        if (phone.length !== 10) {
            $('#regPhone').addClass('is-invalid');
            isValid = false;
        }
        
        // Validate ID
        const id = $('#regId').val().replace(/\D/g, '');
        if (id.length !== 9) {
            $('#regId').addClass('is-invalid');
            isValid = false;
        }
        
        if (!isValid) {
            showNotification('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'danger');
            return;
        }
        
        // Get form data
        const registrationData = {
            id: Date.now(), // Unique ID for registration
            aidId: currentAidForRegistration.id,
            aidName: currentAidForRegistration.name,
            aidType: currentAidForRegistration.type,
            aidArea: currentAidForRegistration.area,
            aidDate: currentAidForRegistration.date,
            regDate: new Date().toISOString(),
            user: {
                name: $('#regName').val(),
                phone: $('#regPhone').val(),
                idNumber: $('#regId').val(),
                age: $('#regAge').val() || null,
                address: $('#regAddress').val(),
                familySize: $('#regFamilySize').val(),
                housingType: $('#regHousingType').val() || '',
                specialCases: $('#regSpecialCases').val() || '',
                notes: $('#regNotes').val() || ''
            },
            status: 'مسجل'
        };
        
        // Show loading
        const $submitBtn = $(this).find('button[type="submit"]');
        const originalText = $submitBtn.html();
        $submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> جاري التسجيل...');
        
        // Simulate API call
        setTimeout(() => {
            // Add to registrations array
            registrations.push(registrationData);
            
            // Save to localStorage
            localStorage.setItem('aidRegistrations', JSON.stringify(registrations));
            
            // Update aid registration count
            const aid = aids.find(a => a.id === currentAidForRegistration.id);
            if (aid && aid.registered < aid.capacity) {
                aid.registered++;
                applyFilters(); // Refresh display
                
                // Show success
                $('#registrationModal').modal('hide');
                showNotification('تم تسجيلك في المساعدة بنجاح!', 'success');
                
                // Show registration details
                showRegistrationConfirmation(registrationData);
            } else {
                showNotification('عذراً، لقد تم اكتمال السعة لهذه المساعدة', 'danger');
            }
            
            // Reset form
            $(this)[0].reset();
            $submitBtn.prop('disabled', false).html(originalText);
        }, 1500);
    }

    // Function to show registration confirmation
    function showRegistrationConfirmation(registration) {
        const confirmationHtml = `
            <div class="alert alert-success">
                <h5><i class="fas fa-check-circle"></i> تم التسجيل بنجاح!</h5>
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>رقم التسجيل:</strong> #${registration.id.toString().slice(-6)}</p>
                        <p><strong>اسم المساعدة:</strong> ${registration.aidName}</p>
                        <p><strong>نوع المساعدة:</strong> ${registration.aidType}</p>
                        <p><strong>المنطقة:</strong> ${registration.aidArea}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>اسم المستخدم:</strong> ${registration.user.name}</p>
                        <p><strong>رقم الهاتف:</strong> ${registration.user.phone}</p>
                        <p><strong>تاريخ التسجيل:</strong> ${new Date(registration.regDate).toLocaleDateString('ar-EG')}</p>
                        <p><strong>الحالة:</strong> <span class="badge bg-success">${registration.status}</span></p>
                    </div>
                </div>
                <div class="mt-3">
                    <p class="mb-1"><strong>ملاحظات:</strong></p>
                    <ul class="mb-0">
                        <li>سيتم التواصل معك قبل موعد التوزيع بيومين</li>
                        <li>يرجى إحضار رقم الهوية عند استلام المساعدة</li>
                        <li>يمكنك تعديل بياناتك من خلال رقم التسجيل</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Insert at the top of portfolio section
        $('#portfolio .container').prepend(confirmationHtml);
        
        // Scroll to confirmation
        $('html, body').animate({
            scrollTop: $('#portfolio').offset().top - 100
        }, 800);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            $('.alert-success').fadeOut(500, function() {
                $(this).remove();
            });
        }, 10000);
    }

    // Form Submit Event with Validation
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        $(this).find('[required]').each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        // Validate phone number
        const phone = $('#phone').val();
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            $('#phone').addClass('is-invalid');
            isValid = false;
        }
        
        if (!isValid) {
            showNotification('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'danger');
            return;
        }
        
        // Simulate form submission
        const formData = {
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            address: $('#address').val(),
            aidType: $('#aidType').val(),
            familySize: $('#familySize').val(),
            details: $('#details').val(),
            urgent: $('#urgent').is(':checked')
        };
        
        // Show loading state
        const $submitBtn = $(this).find('.submit-btn');
        const $btnText = $submitBtn.find('.btn-text');
        const $spinner = $submitBtn.find('.spinner-border');
        const originalBtnText = $btnText.text();
        
        $btnText.text('جاري الإرسال...');
        $spinner.removeClass('d-none');
        $submitBtn.prop('disabled', true);
        
        // Simulate API call
        setTimeout(() => {
            // Success
            $('#formStatus').html(`
                <div class="alert alert-success alert-dismissible fade show">
                    <i class="fas fa-check-circle"></i>
                    <strong>تم استلام طلبك بنجاح!</strong><br>
                    <span class="d-block mt-2">رقم الطلب: <strong>#${Math.floor(Math.random() * 10000)}</strong></span>
                    <span class="d-block">سيتم التواصل معك خلال 24 ساعة</span>
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `).slideDown(500);
            
            // Animation: Form reset with effect
            $(this)[0].reset();
            $btnText.text(originalBtnText);
            $spinner.addClass('d-none');
            $submitBtn.prop('disabled', false);
            
            // Add to localStorage (simulating database)
            const requests = JSON.parse(localStorage.getItem('aidRequests') || '[]');
            requests.push({
                ...formData,
                date: new Date().toISOString(),
                status: 'قيد المراجعة'
            });
            localStorage.setItem('aidRequests', JSON.stringify(requests));
            
            // Scroll to status message
            $('html, body').animate({
                scrollTop: $('#formStatus').offset().top - 100
            }, 500);
            
        }, 2000);
    }

    // Team Images Hover Effects
    function setupTeamImages() {
        // Lazy loading for team images
        $('.team-image img').each(function() {
            const img = $(this);
            const src = img.attr('src');
            
            // Preload images for better performance
            const image = new Image();
            image.src = src;
            image.onload = function() {
                img.addClass('loaded');
            };
            
            image.onerror = function() {
                // If image fails to load, use fallback
                img.attr('src', img.attr('onerror').match(/this\.src='(.*?)'/)[1]);
            };
        });
        
        // Add click effect for social links
        $('.social-links a').on('click', function(e) {
            e.preventDefault();
            const link = $(this);
            const icon = link.find('i').clone();
            
            // Add click effect
            link.html('<i class="fas fa-check"></i>');
            link.css({
                'background': 'var(--success)',
                'color': 'white'
            });
            
            // Revert after 1.5 seconds
            setTimeout(() => {
                link.html(icon);
                link.css({
                    'background': 'rgba(255, 255, 255, 0.9)',
                    'color': 'var(--primary)'
                });
            }, 1500);
            
            // Open link in new tab
            const url = link.attr('href');
            if (url && url !== '#') {
                setTimeout(() => {
                    window.open(url, '_blank');
                }, 500);
            }
        });
        
        // Team card hover effects
        $('.team-card').hover(
            function() {
                // On hover in
                $(this).find('.team-image img').css('transform', 'scale(1.1)');
                $(this).find('.team-overlay').css('opacity', '1');
                $(this).css({
                    'transform': 'translateY(-10px)',
                    'box-shadow': '0 20px 40px rgba(0,0,0,0.15)'
                });
            },
            function() {
                // On hover out
                $(this).find('.team-image img').css('transform', 'scale(1)');
                $(this).find('.team-overlay').css('opacity', '0');
                $(this).css({
                    'transform': 'translateY(0)',
                    'box-shadow': '0 10px 20px rgba(0,0,0,0.1)'
                });
            }
        );
    }

    // Setup Registration Stats
    function setupRegistrationStats() {
        // Check if stats already exist
        if ($('#registrationStats').length > 0) return;
        
        const statsHtml = `
            <div class="row mt-4" id="registrationStats">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header bg-info text-white">
                            <h5 class="mb-0"><i class="fas fa-chart-bar"></i> إحصائيات التسجيل</h5>
                        </div>
                        <div class="card-body">
                            <div class="row text-center">
                                <div class="col-md-3 col-6 mb-3">
                                    <div class="stat-box p-3">
                                        <h3 class="text-primary">${registrations.length}</h3>
                                        <p class="text-muted mb-0">إجمالي التسجيلات</p>
                                    </div>
                                </div>
                                <div class="col-md-3 col-6 mb-3">
                                    <div class="stat-box p-3">
                                        <h3 class="text-success">${aids.reduce((sum, aid) => sum + aid.registered, 0)}</h3>
                                        <p class="text-muted mb-0">مسجلين فعالين</p>
                                    </div>
                                </div>
                                <div class="col-md-3 col-6 mb-3">
                                    <div class="stat-box p-3">
                                        <h3 class="text-warning">${aids.reduce((sum, aid) => sum + aid.capacity, 0)}</h3>
                                        <p class="text-muted mb-0">السعة الكلية</p>
                                    </div>
                                </div>
                                <div class="col-md-3 col-6 mb-3">
                                    <div class="stat-box p-3">
                                        <h3 class="text-danger">${registrations.filter(r => r.user.specialCases).length}</h3>
                                        <p class="text-muted mb-0">حالات خاصة</p>
                                    </div>
                                </div>
                            </div>
                            ${registrations.length > 0 ? `
                            <div class="mt-3">
                                <button class="btn btn-sm btn-outline-primary" id="viewRegistrations">
                                    <i class="fas fa-list"></i> عرض جميع التسجيلات
                                </button>
                                <button class="btn btn-sm btn-outline-success" id="exportRegistrations">
                                    <i class="fas fa-download"></i> تصدير البيانات
                                </button>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add to portfolio section after filter
        $('.filter-card').after(statsHtml);
        
        // Add event listeners
        $('#viewRegistrations').on('click', showAllRegistrations);
        $('#exportRegistrations').on('click', exportRegistrations);
    }

    // Helper function to show notifications
    function showNotification(message, type) {
        const notification = $(`
            <div class="alert alert-${type} alert-dismissible fade show position-fixed"
                 style="top: 20px; right: 20px; z-index: 1050; min-width: 300px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.alert('close');
        }, 5000);
    }

    // Hover effects for cards
    $(document).on('mouseenter', '.card', function() {
        $(this).addClass('shadow-lg');
    }).on('mouseleave', '.card', function() {
        $(this).removeClass('shadow-lg');
    });
});

// ===========================================
// EXTERNAL FUNCTIONS
// ===========================================

// Function to show all registrations
function showAllRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('aidRegistrations') || '[]');
    if (registrations.length === 0) {
        showNotification('لا توجد تسجيلات حالياً', 'info');
        return;
    }
    
    let registrationsHtml = `
        <div class="table-responsive mt-3">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>اسم المستخدم</th>
                        <th>الهاتف</th>
                        <th>المساعدة</th>
                        <th>التاريخ</th>
                        <th>الحالة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    registrations.forEach((reg, index) => {
        registrationsHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>${reg.user.name}</td>
                <td>${reg.user.phone}</td>
                <td>${reg.aidName}</td>
                <td>${new Date(reg.regDate).toLocaleDateString('ar-EG')}</td>
                <td><span class="badge bg-success">${reg.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-info view-registration" data-id="${reg.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning edit-registration" data-id="${reg.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    registrationsHtml += `
                </tbody>
            </table>
        </div>
    `;
    
    // Show in modal
    $('#modalBody').html(registrationsHtml);
    $('#aidModal .modal-title').text('جميع التسجيلات');
    $('#aidModal').modal('show');
    
    // Add event listeners for buttons
    $('.view-registration').on('click', function() {
        const regId = $(this).data('id');
        viewRegistrationDetails(regId);
    });
    
    $('.edit-registration').on('click', function() {
        const regId = $(this).data('id');
        editRegistration(regId);
    });
}

// Function to export registrations
function exportRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('aidRegistrations') || '[]');
    if (registrations.length === 0) {
        showNotification('لا توجد بيانات للتصدير', 'info');
        return;
    }
    
    // Convert to CSV
    const headers = ['اسم المستخدم', 'الهاتف', 'الهوية', 'المساعدة', 'النوع', 'المنطقة', 'التاريخ', 'الحالة'];
    const csvData = [
        headers.join(','),
        ...registrations.map(reg => [
            `"${reg.user.name}"`,
            `"${reg.user.phone}"`,
            `"${reg.user.idNumber}"`,
            `"${reg.aidName}"`,
            `"${reg.aidType}"`,
            `"${reg.aidArea}"`,
            `"${new Date(reg.regDate).toLocaleDateString('ar-EG')}"`,
            `"${reg.status}"`
        ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `تسجيلات_المساعدات_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('تم تصدير البيانات بنجاح', 'success');
}

// Function to view registration details
function viewRegistrationDetails(regId) {
    const registrations = JSON.parse(localStorage.getItem('aidRegistrations') || '[]');
    const registration = registrations.find(r => r.id === regId);
    if (!registration) return;
    
    const detailsHtml = `
        <div class="registration-details">
            <h5 class="mb-3">تفاصيل التسجيل #${registration.id.toString().slice(-6)}</h5>
            <div class="row">
                <div class="col-md-6">
                    <h6>معلومات المساعدة:</h6>
                    <p><strong>الاسم:</strong> ${registration.aidName}</p>
                    <p><strong>النوع:</strong> ${registration.aidType}</p>
                    <p><strong>المنطقة:</strong> ${registration.aidArea}</p>
                    <p><strong>التاريخ:</strong> ${registration.aidDate}</p>
                </div>
                <div class="col-md-6">
                    <h6>معلومات المستخدم:</h6>
                    <p><strong>الاسم:</strong> ${registration.user.name}</p>
                    <p><strong>الهاتف:</strong> ${registration.user.phone}</p>
                    <p><strong>الهوية:</strong> ${registration.user.idNumber}</p>
                    <p><strong>العنوان:</strong> ${registration.user.address}</p>
                    <p><strong>عدد الأسرة:</strong> ${registration.user.familySize}</p>
                    ${registration.user.age ? `<p><strong>العمر:</strong> ${registration.user.age}</p>` : ''}
                    ${registration.user.housingType ? `<p><strong>نوع السكن:</strong> ${registration.user.housingType}</p>` : ''}
                </div>
            </div>
            ${registration.user.specialCases ? `
            <div class="alert alert-warning mt-3">
                <h6>حالات خاصة:</h6>
                <p>${registration.user.specialCases}</p>
            </div>
            ` : ''}
            ${registration.user.notes ? `
            <div class="alert alert-info mt-3">
                <h6>ملاحظات:</h6>
                <p>${registration.user.notes}</p>
            </div>
            ` : ''}
            <div class="mt-3">
                <p><strong>تاريخ التسجيل:</strong> ${new Date(registration.regDate).toLocaleString('ar-EG')}</p>
                <p><strong>الحالة:</strong> <span class="badge bg-success">${registration.status}</span></p>
            </div>
        </div>
    `;
    
    $('#modalBody').html(detailsHtml);
    $('#aidModal .modal-title').text('تفاصيل التسجيل');
}

// Function to edit registration (simplified version)
function editRegistration(regId) {
    showNotification('ميزة التعديل قيد التطوير حالياً', 'info');
}