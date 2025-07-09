// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // 로딩 화면 처리
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);

    // 다크모드 토글 기능
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('span');

    // 로컬 스토리지에서 테마 설정 불러오기
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // 시스템 다크모드 설정 확인
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            html.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
    }

    // 테마 토글 버튼 클릭 이벤트
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // 테마 아이콘 업데이트 함수
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // 스크롤 애니메이션
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 타이핑 애니메이션 (슬로건)
    const slogan = document.querySelector('.slogan');
    const originalText = slogan.textContent;
    slogan.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            slogan.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    // 히어로 섹션이 보일 때 타이핑 시작
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const heroSection = document.querySelector('.hero-section');
    heroObserver.observe(heroSection);

    // 스킬 태그 호버 효과 강화
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-3px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // 학습 목표 진행 상태 애니메이션
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInLeft 0.6s ease forwards';
    });

    // 부드러운 스크롤 네비게이션
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 연락처 아이템 클릭 시 복사 기능
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                const text = link.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showToast('클립보드에 복사되었습니다!');
                });
            }
        });
    });

    // 토스트 메시지 표시 함수
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 0.9rem;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }

    // 프로필 이미지 파티클 효과
    const profileImage = document.querySelector('.profile-image');
    let particles = [];

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2 + 1;
        const life = Math.random() * 20 + 20;
        
        particle.dataset.vx = Math.cos(angle) * velocity;
        particle.dataset.vy = Math.sin(angle) * velocity;
        particle.dataset.life = life;
        particle.style.left = '75px';
        particle.style.top = '75px';
        
        profileImage.appendChild(particle);
        particles.push(particle);
    }

    // 마우스 호버 시 파티클 생성
    profileImage.addEventListener('mouseenter', () => {
        const particleInterval = setInterval(() => {
            createParticle();
        }, 50);
        
        profileImage.addEventListener('mouseleave', () => {
            clearInterval(particleInterval);
        }, { once: true });
    });

    // 파티클 애니메이션
    function animateParticles() {
        particles = particles.filter(particle => {
            const vx = parseFloat(particle.dataset.vx);
            const vy = parseFloat(particle.dataset.vy);
            let life = parseFloat(particle.dataset.life);
            
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            
            particle.style.left = currentLeft + vx + 'px';
            particle.style.top = currentTop + vy + 'px';
            particle.style.opacity = life / 40;
            
            life--;
            particle.dataset.life = life;
            
            if (life <= 0) {
                particle.remove();
                return false;
            }
            
            return true;
        });
        
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // 페이지 스크롤 진행 표시
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // 동적 배경 그라데이션
    let gradientAngle = 135;
    const heroSectionBg = document.querySelector('.hero-section');
    
    setInterval(() => {
        gradientAngle += 0.5;
        if (gradientAngle >= 360) gradientAngle = 0;
        
        if (heroSectionBg) {
            heroSectionBg.style.background = `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 100%)`;
        }
    }, 50);

    // 마우스 추적 효과
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.capability-item, .interest-item');
        const x = e.clientX;
        const y = e.clientY;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            
            const angleX = (y - cardY) / 20;
            const angleY = (cardX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
    });

    // 마우스가 카드에서 벗어나면 원래 상태로
    document.addEventListener('mouseleave', () => {
        const cards = document.querySelectorAll('.capability-item, .interest-item');
        cards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // 현재 시간 기반 인사말
    const greeting = document.createElement('div');
    greeting.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--bg-card);
        padding: 15px 25px;
        border-radius: 30px;
        box-shadow: var(--shadow-md);
        font-size: 0.9rem;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.5s ease;
        z-index: 100;
    `;
    
    const hour = new Date().getHours();
    let greetingText = '';
    
    if (hour >= 5 && hour < 12) {
        greetingText = '🌅 좋은 아침입니다!';
    } else if (hour >= 12 && hour < 17) {
        greetingText = '☀️ 좋은 오후입니다!';
    } else if (hour >= 17 && hour < 21) {
        greetingText = '🌆 좋은 저녁입니다!';
    } else {
        greetingText = '🌙 안녕하세요!';
    }
    
    greeting.textContent = greetingText;
    document.body.appendChild(greeting);
    
    setTimeout(() => {
        greeting.style.opacity = '1';
        greeting.style.transform = 'translateX(0)';
    }, 1500);
    
    setTimeout(() => {
        greeting.style.opacity = '0';
        greeting.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(greeting);
        }, 500);
    }, 5000);

    // 커스텀 커서 효과 (선택적)
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.style.cssText = `
        width: 10px;
        height: 10px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    cursorFollower.style.cssText = `
        width: 30px;
        height: 30px;
        border: 1px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.3;
        transition: transform 0.2s ease;
    `;
    
    // 모바일이 아닌 경우에만 커스텀 커서 적용
    if (window.innerWidth > 768) {
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 5 + 'px';
            cursor.style.top = e.clientY - 5 + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX - 15 + 'px';
                cursorFollower.style.top = e.clientY - 15 + 'px';
            }, 50);
        });
        
        // 링크나 버튼 호버 시 커서 확대
        const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .contact-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
    }

    // 학습 진행 상황 퍼센트 표시
    const learningGoals = document.querySelectorAll('.goal-item');
    const progressPercentages = [80, 65, 70, 50, 45]; // 각 학습 목표의 진행률
    
    learningGoals.forEach((goal, index) => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: var(--gradient-primary);
            width: 0%;
            transition: width 1.5s ease;
            border-radius: 0 0 10px 10px;
        `;
        
        goal.style.position = 'relative';
        goal.appendChild(progressBar);
        
        // 목표가 화면에 보일 때 애니메이션
        const goalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressBar.style.width = progressPercentages[index] + '%';
                    }, index * 100);
                    goalObserver.unobserve(entry.target);
                }
            });
        });
        
        goalObserver.observe(goal);
    });

    // 이스터 에그: Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        showToast('🎉 이스터 에그를 발견하셨습니다!');
        document.body.style.animation = 'rainbow 5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }

    // 무지개 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    // 페이지 나가기 전 확인 (작업 중인 내용이 있을 경우)
    let hasUnsavedChanges = false;
    
    // 예: 연락처 폼이나 기타 입력 필드가 있을 경우
    const inputFields = document.querySelectorAll('input, textarea');
    inputFields.forEach(field => {
        field.addEventListener('input', () => {
            hasUnsavedChanges = true;
        });
    });
    
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

    // 성능 최적화: 스크롤 이벤트 쓰로틀링
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            // 스크롤 관련 작업 수행
        });
    });

    console.log('✨ 포트폴리오가 성공적으로 로드되었습니다!');
});
