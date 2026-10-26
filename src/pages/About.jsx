import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/hero.png';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';

// Parallax hook
function useParallax(speed = 0.4) {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        function onScroll() {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            setOffset((rect.top + rect.height / 2 - window.innerHeight / 2) * speed);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [speed]);
    return { ref, offset };
}

// Fade-in-on-scroll hook
function useFadeIn() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.15 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

function TimelineItem({ item, index }) {
    const { ref, visible } = useFadeIn();
    const isLeft = index % 2 === 0;
    return (
        <div ref={ref} style={{
            display: 'flex',
            justifyContent: isLeft ? 'flex-start' : 'flex-end',
            padding: '0 48px', marginBottom: '48px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            transitionDelay: `${index * 0.1}s`,
        }}>
            <div style={{
                width: '42%', background: 'var(--bg)',
                border: '1px solid var(--border)', borderRadius: '16px',
                padding: '28px', position: 'relative', boxShadow: 'var(--shadow)',
            }}>
                <span style={{
                    display: 'inline-block', background: 'var(--accent)', color: '#fff',
                    fontSize: '12px', fontWeight: 700, letterSpacing: '1px',
                    padding: '4px 12px', borderRadius: '999px', marginBottom: '12px',
                }}>{item.year}</span>
                <h2 style={{ margin: '0 0 8px', fontSize: '18px' }}>{item.title}</h2>
                <p style={{ color: 'var(--text)', lineHeight: '1.7', fontSize: '15px', margin: 0 }}>{item.desc}</p>
                <div style={{
                    position: 'absolute', top: '32px',
                    [isLeft ? 'right' : 'left']: '-36px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: 'var(--accent)', border: '3px solid var(--bg)',
                    boxShadow: '0 0 0 2px var(--accent)',
                }} />
            </div>
        </div>
    );
}

function ParallaxBanner({ children, img, speed }) {
    const { ref, offset } = useParallax(speed);
    return (
        <div ref={ref} style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute', inset: '-60px 0',
                backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                transform: `translateY(${offset}px)`, willChange: 'transform',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.7))' }} />
            <div style={{
                position: 'relative', zIndex: 1, height: '100%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '0 32px', textAlign: 'center',
            }}>{children}</div>
        </div>
    );
}

function ValueCard({ icon, title, desc, index }) {
    const { ref, visible } = useFadeIn();
    const [hovered, setHovered] = useState(false);
    return (
        <div ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative', borderRadius: '20px', padding: '40px 28px',
                cursor: 'default', overflow: 'hidden',
                background: hovered ? 'var(--accent)' : 'var(--bg)',
                border: `2px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
                boxShadow: hovered ? '0 20px 48px rgba(139,94,60,0.28)' : 'var(--shadow-sm)',
                transform: visible ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(28px)',
                opacity: visible ? 1 : 0,
                transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
            }}
        >
            <div style={{
                position: 'absolute', top: '-24px', right: '-24px',
                width: '100px', height: '100px', borderRadius: '50%',
                background: hovered ? 'rgba(255,255,255,0.08)' : 'var(--bg-2)',
                transition: 'background 0.3s ease',
            }} />
            <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                background: hovered ? 'rgba(255,255,255,0.15)' : 'var(--cream)',
                border: `1px solid ${hovered ? 'rgba(255,255,255,0.2)' : 'var(--cream-dark)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '24px',
                transform: hovered ? 'scale(1.15) rotate(-4deg)' : 'scale(1) rotate(0deg)',
                transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease',
            }}>{icon}</div>
            <h2 style={{
                margin: '0 0 10px', fontSize: '20px', fontFamily: 'var(--serif)', fontWeight: 700,
                color: hovered ? '#fff' : 'var(--text-h)', transition: 'color 0.3s ease',
            }}>{title}</h2>
            <p style={{
                fontSize: '14px', lineHeight: 1.7, margin: 0,
                color: hovered ? 'rgba(255,255,255,0.8)' : 'var(--text)', transition: 'color 0.3s ease',
            }}>{desc}</p>
            <div style={{
                position: 'absolute', bottom: 0, left: 0, height: '3px',
                width: hovered ? '100%' : '0%', background: 'var(--gold)',
                borderRadius: '0 0 20px 20px', transition: 'width 0.35s ease',
            }} />
        </div>
    );
}

function About() {
    const { lang } = useLang();
    const t = tx[lang];
    const { ref: heroRef, offset: heroOffset } = useParallax(0.45);

    const values = [
        { icon: '🧵', title: t.val_title1, desc: t.val_desc1 },
        { icon: '🌿', title: t.val_title2, desc: t.val_desc2 },
        { icon: '🤝', title: t.val_title3, desc: t.val_desc3 },
        { icon: '✨', title: t.val_title4, desc: t.val_desc4 },
    ];

    const timeline = [
        { year: t.tl_year1, title: t.tl_title1, desc: t.tl_desc1 },
        { year: t.tl_year2, title: t.tl_title2, desc: t.tl_desc2 },
        { year: t.tl_year3, title: t.tl_title3, desc: t.tl_desc3 },
        { year: t.tl_year4, title: t.tl_title4, desc: t.tl_desc4 },
        { year: t.tl_year5, title: t.tl_title5, desc: t.tl_desc5 },
    ];

    return (
        <div style={{ textAlign: 'left', overflow: 'hidden' }}>

            {/* ── HERO ── */}
            <div style={{ position: 'relative', height: '92vh', overflow: 'hidden' }}>
                <div ref={heroRef} style={{
                    position: 'absolute', inset: '-80px 0',
                    backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    transform: `translateY(${heroOffset}px)`, willChange: 'transform',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)' }} />
                <div style={{
                    position: 'relative', zIndex: 1, height: '100%',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: '0 64px', maxWidth: '900px',
                }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 20px' }}>
                        {t.about_eyebrow}
                    </p>
                    <h1 style={{ color: '#fff', fontSize: 'clamp(42px, 7vw, 88px)', lineHeight: 1.05, letterSpacing: '-2px', margin: '0 0 28px', fontWeight: 700 }}>
                        {t.about_hero_title1}<br />
                        <span style={{ color: 'var(--gold)' }}>{t.about_hero_accent}</span><br />
                        {t.about_hero_title2}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', lineHeight: 1.8, maxWidth: '480px', margin: '0 0 40px' }}>
                        {t.about_hero_sub}
                    </p>
                    <a href="/products" style={{
                        alignSelf: 'flex-start', padding: '14px 32px', borderRadius: '999px',
                        background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '15px',
                        textDecoration: 'none', boxShadow: '0 4px 24px rgba(139,94,60,0.45)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                        onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; e.target.style.boxShadow = '0 6px 32px rgba(139,94,60,0.6)'; }}
                        onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 24px rgba(139,94,60,0.45)'; }}
                    >
                        {t.about_hero_cta}
                    </a>
                </div>
                <div style={{
                    position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
                }}>
                    <span>{t.about_scroll}</span>
                    <div style={{
                        width: '1px', height: '40px',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
                        animation: 'pulse 1.8s ease-in-out infinite',
                    }} />
                    <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }`}</style>
                </div>
            </div>

            {/* ── VALUES ── */}
            <div style={{ padding: '96px 32px', maxWidth: '1100px', margin: '0 auto' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px', textAlign: 'center' }}>
                    {t.about_values_eyebrow}
                </p>
                <h2 style={{ textAlign: 'center', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '64px' }}>
                    {t.about_values_title}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                    {values.map(({ icon, title, desc }, i) => (
                        <ValueCard key={i} icon={icon} title={title} desc={desc} index={i} />
                    ))}
                </div>
            </div>

            {/* ── PARALLAX BANNER ── */}
            <ParallaxBanner img={heroImg} speed={0.3}>
                <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 16px' }}>
                    {t.about_since}
                </p>
                <h2 style={{ color: '#fff', fontSize: 'clamp(28px, 5vw, 52px)', margin: '0 0 16px', letterSpacing: '-1px' }}>
                    {t.about_banner_title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '480px', lineHeight: 1.7, margin: 0 }}>
                    {t.about_banner_sub}
                </p>
            </ParallaxBanner>

            {/* ── TIMELINE ── */}
            <div style={{ padding: '96px 0', position: 'relative' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>
                    {t.about_timeline_eyebrow}
                </p>
                <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '72px' }}>{t.about_timeline_title}</h2>
                <div style={{
                    position: 'absolute', top: '200px', bottom: '96px', left: '50%', width: '2px',
                    background: 'linear-gradient(to bottom, transparent, var(--accent-border) 10%, var(--accent-border) 90%, transparent)',
                    transform: 'translateX(-50%)',
                }} />
                {timeline.map((item, i) => (
                    <TimelineItem key={i} item={item} index={i} />
                ))}
            </div>

            {/* ── TEAM ── */}
            <div style={{ padding: '0 32px 96px', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
                    {t.about_team_eyebrow}
                </p>
                <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>{t.about_team_title}</h2>
                <p style={{ color: 'var(--text)', lineHeight: '1.8', fontSize: '17px' }}>{t.about_team_sub}</p>
            </div>

        </div>
    );
}

export default About;
