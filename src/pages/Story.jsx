import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';

function useFadeIn(delay = 0) {
    const ref = useRef(null);
    const [v, setV] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, style: { opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` } };
}

function Chapter({ label, title, body, index, isMobile, img }) {
    const fade = useFadeIn(0.1);
    const isEven = index % 2 === 0;
    return (
        <div ref={fade.ref} style={{
            ...fade.style,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '32px' : '80px',
            alignItems: 'center',
            padding: isMobile ? '56px 20px' : '80px 48px',
            maxWidth: '1200px', margin: '0 auto',
            direction: !isMobile && !isEven ? 'rtl' : 'ltr',
        }}>
            {/* Image */}
            <div style={{ direction: 'ltr', borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: 'var(--shadow-lg)' }}>
                <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {/* Text */}
            <div style={{ direction: 'ltr' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 16px' }}>{label}</p>
                <h2 style={{ fontWeight: 300, letterSpacing: '-1px', margin: '0 0 20px', fontSize: 'clamp(28px, 4vw, 48px)' }}>{title}</h2>
                <p style={{ color: 'var(--text)', lineHeight: 1.85, fontSize: isMobile ? '15px' : '16px' }}>{body}</p>
            </div>
        </div>
    );
}

function Story() {
    const { lang } = useLang();
    const t = tx[lang];
    const { isMobile, isTablet } = useBreakpoint();
    const heroRef = useRef(null);
    const [heroOffset, setHeroOffset] = useState(0);

    useEffect(() => {
        const fn = () => { if (heroRef.current) setHeroOffset(window.scrollY * 0.35); };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const chapters = [
        { label: t.story_chapter1_label, title: t.story_chapter1_title, body: t.story_chapter1_body, img: heroImg },
        { label: t.story_chapter2_label, title: t.story_chapter2_title, body: t.story_chapter2_body, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
        { label: t.story_chapter3_label, title: t.story_chapter3_title, body: t.story_chapter3_body, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80' },
        { label: t.story_chapter4_label, title: t.story_chapter4_title, body: t.story_chapter4_body, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80' },
    ];

    return (
        <div style={{ overflow: 'hidden' }}>

            {/* HERO */}
            <div style={{ position: 'relative', height: isMobile ? `calc(100svh - var(--nav-h))` : '80vh', overflow: 'hidden', minHeight: '500px' }}>
                <div ref={heroRef} style={{
                    position: 'absolute', inset: '-80px 0',
                    backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    transform: `translateY(${heroOffset}px)`, willChange: 'transform',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,6,3,0.7) 0%, rgba(10,6,3,0.5) 60%, rgba(10,6,3,0.85) 100%)' }} />
                <div style={{
                    position: 'relative', zIndex: 1, height: '100%',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    textAlign: 'center', padding: isMobile ? '0 24px' : '0 48px',
                }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 20px' }}>{t.story_eyebrow}</p>
                    <h1 style={{
                        color: '#fff', fontWeight: 300,
                        fontSize: isMobile ? 'clamp(40px, 10vw, 64px)' : 'clamp(56px, 8vw, 96px)',
                        letterSpacing: isMobile ? '-2px' : '-3px', margin: '0 0 20px', maxWidth: '800px',
                    }}>{t.story_hero_title}</h1>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.75, maxWidth: '480px' }}>{t.story_hero_sub}</p>
                </div>
            </div>

            {/* CHAPTERS — alternating */}
            <div style={{ background: 'var(--bg)' }}>
                {chapters.map((ch, i) => (
                    <div key={i} style={{ borderBottom: i < chapters.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <Chapter {...ch} index={i} isMobile={isMobile} />
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: isMobile ? '72px 24px' : '104px 48px', textAlign: 'center' }}>
                <h2 style={{ fontWeight: 300, letterSpacing: '-1.5px', margin: '0 0 16px', fontSize: isMobile ? 'clamp(28px, 7vw, 48px)' : 'clamp(36px, 5vw, 64px)' }}>{t.story_cta_title}</h2>
                <p style={{ color: 'var(--text)', fontSize: isMobile ? '15px' : '16px', maxWidth: '400px', margin: '0 auto 36px', lineHeight: 1.75 }}>{t.story_cta_sub}</p>
                <Link to="/shop" style={{
                    display: 'inline-block', padding: isMobile ? '14px 32px' : '16px 48px', borderRadius: '999px',
                    background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '15px',
                    textDecoration: 'none', boxShadow: '0 6px 28px rgba(139,94,60,0.35)', transition: 'all 0.2s ease',
                }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >{t.story_cta_btn}</Link>
            </div>

        </div>
    );
}

export default Story;
