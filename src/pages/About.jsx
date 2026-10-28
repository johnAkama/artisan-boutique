import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/christelle.png';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';

function useFadeIn() {
    const ref = useRef(null);
    const [v, setV] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, visible: v };
}

function ValueCard({ icon, title, desc, index }) {
    const { ref, visible } = useFadeIn();
    const [hov, setHov] = useState(false);
    return (
        <div ref={ref}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                borderRadius: '20px', padding: '32px 24px', cursor: 'default', overflow: 'hidden', position: 'relative',
                background: hov ? 'var(--accent)' : 'var(--bg)',
                border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
                boxShadow: hov ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                opacity: visible ? 1 : 0,
                transform: visible ? (hov ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(24px)',
                transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease`,
            }}>
            <div style={{ fontSize: '28px', marginBottom: '18px', display: 'inline-block', transform: hov ? 'scale(1.15) rotate(-4deg)' : 'scale(1)', transition: 'transform 0.3s ease' }}>{icon}</div>
            <h3 style={{ margin: '0 0 10px', color: hov ? '#fff' : 'var(--text-h)', transition: 'color 0.3s ease' }}>{title}</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.7, margin: 0, color: hov ? 'rgba(255,255,255,0.8)' : 'var(--text)', transition: 'color 0.3s ease' }}>{desc}</p>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', width: hov ? '100%' : '0%', background: 'var(--gold)', transition: 'width 0.35s ease' }} />
        </div>
    );
}

function TimelineItem({ item, index, isMobile }) {
    const { ref, visible } = useFadeIn();
    const isLeft = isMobile ? true : index % 2 === 0;
    return (
        <div ref={ref} style={{
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : (isLeft ? 'flex-start' : 'flex-end'),
            padding: isMobile ? '0 20px 0 44px' : '0 48px',
            marginBottom: '36px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        }}>
            <div style={{
                width: isMobile ? '100%' : '44%',
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: '16px', padding: isMobile ? '20px' : '28px',
                position: 'relative', boxShadow: 'var(--shadow-sm)',
            }}>
                <span style={{
                    display: 'inline-block', background: 'var(--accent)', color: '#fff',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '1px',
                    padding: '4px 12px', borderRadius: '999px', marginBottom: '12px',
                }}>{item.year}</span>
                <h3 style={{ margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text)', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{item.desc}</p>
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

function About() {
    const { lang } = useLang();
    const t = tx[lang];
    const { isMobile, isTablet } = useBreakpoint();
    const heroRef = useRef(null);
    const [heroOffset, setHeroOffset] = useState(0);
    const founderFade = useFadeIn();

    useEffect(() => {
        const fn = () => { if (heroRef.current) setHeroOffset(window.scrollY * 0.4); };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

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
    const secPad = isMobile ? '72px 20px' : isTablet ? '88px 32px' : '104px 48px';

    return (
        <div style={{ overflow: 'hidden' }}>

            {/* HERO */}
            <div style={{ position: 'relative', height: isMobile ? `calc(100svh - var(--nav-h))` : '88vh', overflow: 'hidden', minHeight: '560px' }}>
                <div ref={heroRef} style={{
                    position: 'absolute', inset: '-80px 0',
                    backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    transform: `translateY(${heroOffset}px)`, willChange: 'transform',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(10,6,3,0.88) 0%, rgba(10,6,3,0.55) 55%, rgba(10,6,3,0.4) 100%)' }} />
                <div style={{
                    position: 'relative', zIndex: 1, height: '100%',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: isMobile ? 'flex-end' : 'center',
                    padding: isMobile ? '0 24px 48px' : isTablet ? '0 40px' : '0 80px',
                    maxWidth: '900px', boxSizing: 'border-box',
                }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 20px' }}>{t.about_eyebrow}</p>
                    <h1 style={{
                        color: '#fff', fontWeight: 300,
                        fontSize: isMobile ? 'clamp(44px, 11vw, 72px)' : 'clamp(64px, 9vw, 112px)',
                        letterSpacing: isMobile ? '-2px' : '-3px', margin: '0 0 20px',
                    }}>
                        {t.about_hero_title1}<br />
                        <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{t.about_hero_accent}</em><br />
                        {t.about_hero_title2}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.75, maxWidth: '460px', margin: '0 0 32px' }}>{t.about_hero_sub}</p>
                    <a href="/shop" style={{
                        alignSelf: 'flex-start', padding: isMobile ? '12px 26px' : '13px 32px',
                        borderRadius: '999px', background: 'var(--accent)', color: '#fff',
                        fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                        boxShadow: '0 4px 24px rgba(139,94,60,0.45)', transition: 'all 0.2s ease',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >{t.about_hero_cta}</a>
                </div>
                {!isMobile && (
                    <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        <span>{t.about_scroll}</span>
                        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)', animation: 'pulse 1.8s ease-in-out infinite' }} />
                    </div>
                )}
            </div>

            {/* VALUES */}
            <div style={{ padding: secPad, maxWidth: '1280px', margin: '0 auto' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>{t.about_values_eyebrow}</p>
                <h2 style={{ textAlign: 'center', fontWeight: 300, letterSpacing: '-1px', marginBottom: '48px' }}>{t.about_values_title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '16px' }}>
                    {values.map(({ icon, title, desc }, i) => <ValueCard key={i} icon={icon} title={title} desc={desc} index={i} />)}
                </div>
            </div>

            {/* PARALLAX BANNER */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
                <div style={{ position: 'absolute', inset: '-60px 0', backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,6,3,0.72)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: isMobile ? '72px 24px' : '96px 32px' }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 16px' }}>{t.about_since}</p>
                    <h2 style={{ color: '#fff', fontWeight: 300, letterSpacing: '-1.5px', margin: '0 0 16px' }}>{t.about_banner_title}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: isMobile ? '14px' : '16px', maxWidth: '460px', lineHeight: 1.75, margin: 0 }}>{t.about_banner_sub}</p>
                </div>
            </div>

            {/* TIMELINE */}
            <div style={{ padding: isMobile ? '72px 0' : '104px 0', position: 'relative' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>{t.about_timeline_eyebrow}</p>
                <h2 style={{ textAlign: 'center', fontWeight: 300, letterSpacing: '-1px', marginBottom: '56px' }}>{t.about_timeline_title}</h2>
                <div style={{
                    position: 'absolute', top: '160px', bottom: '64px',
                    left: isMobile ? '28px' : '50%', width: '1px',
                    background: 'linear-gradient(to bottom, transparent, var(--accent-border) 10%, var(--accent-border) 90%, transparent)',
                    transform: isMobile ? 'none' : 'translateX(-50%)',
                }} />
                {timeline.map((item, i) => <TimelineItem key={i} item={item} index={i} isMobile={isMobile} />)}
            </div>

            {/* FOUNDER */}
            <div ref={founderFade.ref} style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: secPad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '56px' }}>{t.about_founder_eyebrow}</p>
                    <div style={{
                        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '5fr 6fr',
                        gap: isMobile ? '40px' : '72px', alignItems: 'center',
                        opacity: founderFade.visible ? 1 : 0,
                        transform: founderFade.visible ? 'translateY(0)' : 'translateY(32px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}>
                        {/* Image */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/5', boxShadow: 'var(--shadow-lg)' }}>
                                <img src={heroImg} alt={t.about_founder_name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                            </div>
                            <div style={{
                                position: 'absolute', bottom: '20px', left: '20px', right: '20px',
                                background: 'rgba(139,94,60,0.92)', backdropFilter: 'blur(8px)',
                                borderRadius: '12px', padding: '14px 18px',
                            }}>
                                <p style={{ margin: 0, color: '#fff', fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600 }}>{t.about_founder_name}</p>
                                <p style={{ margin: '3px 0 0', color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>{t.about_founder_role}</p>
                            </div>
                        </div>
                        {/* Text */}
                        <div>
                            <blockquote style={{
                                margin: '0 0 28px', padding: '0 0 0 20px',
                                borderLeft: '2px solid var(--gold)',
                                fontFamily: 'var(--serif)', fontStyle: 'italic',
                                fontSize: isMobile ? '18px' : 'clamp(18px, 2vw, 22px)',
                                lineHeight: 1.55, color: 'var(--text-h)',
                            }}>{t.about_founder_quote}</blockquote>
                            <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '15px', marginBottom: '14px' }}>{t.about_founder_p1}</p>
                            <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '15px', marginBottom: '14px' }}>{t.about_founder_p2}</p>
                            <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '15px', marginBottom: '32px' }}>{t.about_founder_p3}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600, flexShrink: 0 }}>A</div>
                                <div>
                                    <p style={{ margin: 0, fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '15px', color: 'var(--text-h)' }}>{t.about_founder_name}</p>
                                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--gold)' }}>{t.about_founder_role}</p>
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
