import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/hero.png';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';

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

function useFadeIn() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

function TimelineItem({ item, index, isMobile }) {
    const { ref, visible } = useFadeIn();
    const isLeft = isMobile ? true : index % 2 === 0;
    return (
        <div ref={ref} style={{
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : (isLeft ? 'flex-start' : 'flex-end'),
            padding: isMobile ? '0 20px 0 44px' : '0 48px',
            marginBottom: '40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            transitionDelay: `${index * 0.08}s`,
        }}>
            <div style={{
                width: isMobile ? '100%' : '42%',
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: '16px', padding: isMobile ? '20px' : '28px',
                position: 'relative', boxShadow: 'var(--shadow)',
            }}>
                <span style={{
                    display: 'inline-block', background: 'var(--accent)', color: '#fff',
                    fontSize: '12px', fontWeight: 700, letterSpacing: '1px',
                    padding: '4px 12px', borderRadius: '999px', marginBottom: '12px',
                }}>{item.year}</span>
                <h2 style={{ margin: '0 0 8px', fontSize: '17px' }}>{item.title}</h2>
                <p style={{ color: 'var(--text)', lineHeight: '1.7', fontSize: '14px', margin: 0 }}>{item.desc}</p>
                <div style={{
                    position: 'absolute', top: '28px',
                    [isLeft ? 'right' : 'left']: isMobile ? 'auto' : '-36px',
                    left: isMobile ? '-28px' : undefined,
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: 'var(--accent)', border: '3px solid var(--bg)',
                    boxShadow: '0 0 0 2px var(--accent)',
                }} />
            </div>
        </div>
    );
}

function ParallaxBanner({ children, img, speed, isMobile }) {
    const { ref, offset } = useParallax(speed);
    return (
        <div ref={ref} style={{ position: 'relative', height: isMobile ? 'auto' : '420px', overflow: 'hidden', minHeight: '280px' }}>
            <div style={{
                position: 'absolute', inset: '-60px 0',
                backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                transform: `translateY(${offset}px)`, willChange: 'transform',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.7))' }} />
            <div style={{
                position: 'relative', zIndex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: isMobile ? '56px 24px' : '0 32px',
                height: isMobile ? 'auto' : '100%', textAlign: 'center',
            }}>{children}</div>
        </div>
    );
}

function ValueCard({ icon, title, desc, index }) {
    const { ref, visible } = useFadeIn();
    const [hovered, setHovered] = useState(false);
    return (
        <div ref={ref}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative', borderRadius: '20px', padding: '36px 24px',
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
                position: 'absolute', top: '-24px', right: '-24px', width: '100px', height: '100px',
                borderRadius: '50%', background: hovered ? 'rgba(255,255,255,0.08)' : 'var(--bg-2)',
                transition: 'background 0.3s ease',
            }} />
            <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: hovered ? 'rgba(255,255,255,0.15)' : 'var(--cream)',
                border: `1px solid ${hovered ? 'rgba(255,255,255,0.2)' : 'var(--cream-dark)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px', marginBottom: '20px',
                transform: hovered ? 'scale(1.15) rotate(-4deg)' : 'scale(1) rotate(0deg)',
                transition: 'transform 0.3s ease, background 0.3s ease',
            }}>{icon}</div>
            <h2 style={{ margin: '0 0 10px', fontSize: '19px', fontFamily: 'var(--serif)', fontWeight: 700, color: hovered ? '#fff' : 'var(--text-h)', transition: 'color 0.3s ease' }}>{title}</h2>
            <p style={{ fontSize: '14px', lineHeight: 1.7, margin: 0, color: hovered ? 'rgba(255,255,255,0.8)' : 'var(--text)', transition: 'color 0.3s ease' }}>{desc}</p>
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
    const { isMobile, isTablet } = useBreakpoint();
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

    const secPad = isMobile ? '64px 20px' : isTablet ? '80px 32px' : '96px 32px';

    return (
        <div style={{ textAlign: 'left', overflow: 'hidden' }}>

            {/* ── HERO ── */}
            <div style={{ position: 'relative', height: isMobile ? `calc(100svh - 68px)` : '92vh', overflow: 'hidden', minHeight: '560px' }}>
                <div ref={heroRef} style={{
                    position: 'absolute', inset: '-80px 0',
                    backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    transform: `translateY(${heroOffset}px)`, willChange: 'transform',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.65) 100%)' }} />
                <div style={{
                    position: 'relative', zIndex: 1, height: '100%',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: isMobile ? 'flex-end' : 'center',
                    padding: isMobile ? '0 24px 48px' : isTablet ? '0 40px' : '0 64px',
                    width: '100%', boxSizing: 'border-box', maxWidth: '900px',
                }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 16px' }}>
                        {t.about_eyebrow}
                    </p>
                    <h1 style={{
                        color: '#fff',
                        fontSize: isMobile ? 'clamp(34px, 9vw, 52px)' : 'clamp(42px, 7vw, 88px)',
                        lineHeight: 1.08,
                        letterSpacing: isMobile ? '-1px' : '-2px',
                        margin: '0 0 20px', fontWeight: 700,
                    }}>
                        {t.about_hero_title1}<br />
                        <span style={{ color: 'var(--gold)' }}>{t.about_hero_accent}</span><br />
                        {t.about_hero_title2}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: isMobile ? '15px' : '18px', lineHeight: 1.75, maxWidth: '480px', margin: '0 0 32px' }}>
                        {t.about_hero_sub}
                    </p>
                    <a href="/products" style={{
                        alignSelf: 'flex-start', padding: isMobile ? '13px 26px' : '14px 32px',
                        borderRadius: '999px', background: 'var(--accent)', color: '#fff',
                        fontWeight: 600, fontSize: '15px', textDecoration: 'none',
                        boxShadow: '0 4px 24px rgba(139,94,60,0.45)', transition: 'transform 0.2s ease',
                    }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    >{t.about_hero_cta}</a>
                </div>
                {!isMobile && (
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
                )}
            </div>

            {/* ── VALUES ── */}
            <div style={{ padding: secPad, maxWidth: '1100px', margin: '0 auto' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px', textAlign: 'center' }}>
                    {t.about_values_eyebrow}
                </p>
                <h2 style={{ textAlign: 'center', fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 42px)', marginBottom: '48px' }}>
                    {t.about_values_title}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                    {values.map(({ icon, title, desc }, i) => (
                        <ValueCard key={i} icon={icon} title={title} desc={desc} index={i} />
                    ))}
                </div>
            </div>

            {/* ── PARALLAX BANNER ── */}
            <ParallaxBanner img={heroImg} speed={0.3} isMobile={isMobile}>
                <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 16px' }}>
                    {t.about_since}
                </p>
                <h2 style={{ color: '#fff', fontSize: 'clamp(24px, 5vw, 52px)', margin: '0 0 16px', letterSpacing: '-1px' }}>
                    {t.about_banner_title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? '14px' : '17px', maxWidth: '480px', lineHeight: 1.7, margin: 0 }}>
                    {t.about_banner_sub}
                </p>
            </ParallaxBanner>

            {/* ── TIMELINE ── */}
            <div style={{ padding: isMobile ? '64px 0' : '96px 0', position: 'relative' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>
                    {t.about_timeline_eyebrow}
                </p>
                <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px, 3vw, 32px)', marginBottom: '56px' }}>{t.about_timeline_title}</h2>
                <div style={{
                    position: 'absolute', top: '160px', bottom: '64px',
                    left: isMobile ? '28px' : '50%', width: '2px',
                    background: 'linear-gradient(to bottom, transparent, var(--accent-border) 10%, var(--accent-border) 90%, transparent)',
                    transform: isMobile ? 'none' : 'translateX(-50%)',
                }} />
                {timeline.map((item, i) => (
                    <TimelineItem key={i} item={item} index={i} isMobile={isMobile} />
                ))}
            </div>

            {/* ── FOUNDER ── */}
            <div style={{ padding: isMobile ? '64px 20px' : isTablet ? '80px 32px' : '96px 80px', background: 'var(--bg-2)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                    {/* eyebrow */}
                    <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '56px' }}>
                        {t.about_founder_eyebrow}
                    </p>

                    {/* two-column grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '5fr 6fr',
                        gap: isMobile ? '40px' : '72px',
                        alignItems: 'center',
                    }}>

                        {/* IMAGE */}
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                borderRadius: '24px', overflow: 'hidden',
                                aspectRatio: '4 / 5',
                                boxShadow: '0 32px 80px rgba(139,94,60,0.2)',
                            }}>
                                <img
                                    src={heroImg}
                                    alt={t.about_founder_name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                                />
                            </div>
                            {/* name badge */}
                            <div style={{
                                position: 'absolute', bottom: '24px', left: '24px', right: '24px',
                                background: 'rgba(139,94,60,0.92)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '14px', padding: '14px 20px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                            }}>
                                <p style={{ margin: 0, color: '#fff', fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 700 }}>{t.about_founder_name}</p>
                                <p style={{ margin: '3px 0 0', color: 'rgba(255,255,255,0.75)', fontSize: '12px', letterSpacing: '0.5px' }}>{t.about_founder_role}</p>
                            </div>
                            {/* decorative ring */}
                            <div style={{
                                position: 'absolute', top: '-16px', right: '-16px',
                                width: '100px', height: '100px', borderRadius: '50%',
                                border: '2px solid var(--gold)', opacity: 0.4, pointerEvents: 'none',
                            }} />
                        </div>

                        {/* TEXT */}
                        <div>
                            <blockquote style={{
                                margin: '0 0 28px', padding: '0 0 0 20px',
                                borderLeft: '3px solid var(--gold)',
                                fontFamily: 'var(--serif)',
                                fontSize: isMobile ? '18px' : 'clamp(18px, 2vw, 23px)',
                                lineHeight: 1.55, color: 'var(--text-h)', fontStyle: 'italic',
                            }}>{t.about_founder_quote}</blockquote>

                            <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: isMobile ? '15px' : '16px', marginBottom: '16px' }}>{t.about_founder_p1}</p>
                            <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: isMobile ? '15px' : '16px', marginBottom: '16px' }}>{t.about_founder_p2}</p>
                            <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: isMobile ? '15px' : '16px', marginBottom: '36px' }}>{t.about_founder_p3}</p>

                            {/* signature row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                                    background: 'var(--accent)', color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 700,
                                }}>A</div>
                                <div>
                                    <p style={{ margin: 0, fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '15px', color: 'var(--text-h)' }}>{t.about_founder_name}</p>
                                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.5px' }}>{t.about_founder_role}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default About;
