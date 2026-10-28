import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import products from '../data/products';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';
import ProductCard from '../components/ProductCard';

function useFadeIn(delay = 0) {
    const ref = useRef(null);
    const [v, setV] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, style: { opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s` } };
}

const testimonials = [
    { name: 'Amara D.', loc: 'London',   quote: 'The kente tote I ordered is absolutely stunning. You can feel the love in every stitch.', rating: 5 },
    { name: 'Luca M.',  loc: 'Milan',    quote: 'Ewenam is my go-to for meaningful gifts. The quality is unmatched and the packaging is beautiful.', rating: 5 },
    { name: 'Sofia R.', loc: 'New York', quote: 'I love knowing exactly who made my jewellery. The artisan story card that came with it made me emotional.', rating: 5 },
];

function TestiCard({ name, loc, quote, rating, delay, isMobile }) {
    const fade = useFadeIn(delay);
    return (
        <div ref={fade.ref} style={{
            ...fade.style, background: 'var(--bg-2)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: isMobile ? '28px' : '36px',
        }}>
            <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {Array.from({ length: rating }).map((_, j) => <span key={j} style={{ color: 'var(--gold)', fontSize: '14px' }}>★</span>)}
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-h)', margin: '0 0 24px', fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>"{quote}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                    background: 'var(--accent)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '16px',
                }}>{name[0]}</div>
                <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-h)' }}>{name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{loc}</div>
                </div>
            </div>
        </div>
    );
}

const categories = [
    { key: 'Bags',        img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80' },
    { key: 'Jewellery',   img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80' },
    { key: 'Footwear',    img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80' },
    { key: 'Accessories', img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80' },
];

function CatCard({ cat, label, isMobile }) {
    const [hov, setHov] = useState(false);
    return (
        <Link to="/shop" style={{ textDecoration: 'none', display: 'block', borderRadius: '16px', overflow: 'hidden', position: 'relative', aspectRatio: isMobile ? '4/3' : '3/4', background: 'var(--bg-2)', flexShrink: 0 }}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
            <img src={cat.img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.45s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(26,15,7,0.55)' : 'rgba(26,15,7,0.3)', transition: 'background 0.3s ease' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                <p style={{ color: '#fff', fontFamily: 'var(--serif)', fontSize: isMobile ? '20px' : '24px', fontWeight: 600, margin: 0, letterSpacing: '-0.3px' }}>{label}</p>
                <p style={{ color: 'var(--gold-light)', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '4px 0 0', opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(6px)', transition: 'all 0.3s ease' }}>Shop →</p>
            </div>
        </Link>
    );
}

function Home() {
    const { lang } = useLang();
    const t = tx[lang];
    const { isMobile, isTablet } = useBreakpoint();
    const heroRef = useRef(null);
    const [heroOffset, setHeroOffset] = useState(0);

    useEffect(() => {
        const fn = () => {
            if (!heroRef.current) return;
            setHeroOffset(window.scrollY * 0.35);
        };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const f0 = useFadeIn(0); const f1 = useFadeIn(0.1); const f2 = useFadeIn(0.2); const f3 = useFadeIn(0.3);
    const catFades = [f0, f1, f2, f3];
    const secPad = isMobile ? '72px 20px' : isTablet ? '88px 32px' : '104px 48px';

    return (
        <div style={{ textAlign: 'left' }}>

            {/* ══ HERO ══ */}
            <section style={{ position: 'relative', height: isMobile ? `calc(100svh - var(--nav-h))` : '95vh', overflow: 'hidden', minHeight: '600px' }}>
                <div ref={heroRef} style={{
                    position: 'absolute', inset: '-80px 0',
                    backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    transform: `translateY(${heroOffset}px)`, willChange: 'transform',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,6,3,0.85) 0%, rgba(10,6,3,0.5) 60%, rgba(10,6,3,0.2) 100%)' }} />

                <div style={{
                    position: 'relative', zIndex: 1, height: '100%',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: isMobile ? 'flex-end' : 'center',
                    padding: isMobile ? '0 24px 120px' : isTablet ? '0 40px' : '0 80px',
                    maxWidth: '820px', boxSizing: 'border-box',
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(184,146,74,0.15)', border: '1px solid rgba(184,146,74,0.4)',
                        borderRadius: '999px', padding: '5px 14px', marginBottom: '24px', width: 'fit-content',
                    }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
                        <span style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' }}>{t.home_badge}</span>
                    </div>
                    <h1 style={{
                        color: '#fff', fontFamily: 'var(--serif)', fontWeight: 300,
                        fontSize: isMobile ? 'clamp(52px, 14vw, 80px)' : 'clamp(72px, 10vw, 128px)',
                        lineHeight: 0.95, letterSpacing: isMobile ? '-2px' : '-4px',
                        margin: '0 0 24px',
                    }}>
                        {t.home_hero_line1}<br />
                        <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{t.home_hero_line2}</em>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.75, maxWidth: '420px', margin: '0 0 36px' }}>
                        {t.home_hero_sub}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link to="/shop" style={{
                            padding: isMobile ? '13px 28px' : '14px 36px', borderRadius: '999px',
                            background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '14px',
                            textDecoration: 'none', letterSpacing: '0.3px',
                            boxShadow: '0 4px 24px rgba(139,94,60,0.5)', transition: 'all 0.2s ease',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
                        >{t.home_hero_cta1}</Link>
                        <Link to="/story" style={{
                            padding: isMobile ? '13px 28px' : '14px 36px', borderRadius: '999px',
                            background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 500, fontSize: '14px',
                            textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(8px)', transition: 'all 0.2s ease',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >{t.home_hero_cta2}</Link>
                    </div>
                </div>

                {/* Stats strip */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'rgba(10,6,3,0.7)', backdropFilter: 'blur(16px)',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', justifyContent: 'center',
                }}>
                    {[['200+', t.stat_artisans], ['14', t.stat_countries], ['5,000+', t.stat_sold], ['4.9★', t.stat_rating]].map(([num, label], i) => (
                        <div key={label} style={{
                            padding: isMobile ? '14px 0' : '20px 48px', textAlign: 'center',
                            flex: isMobile ? '1 1 50%' : 'none',
                            borderRight: isMobile ? (i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none') : (i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none'),
                            borderTop: isMobile && i >= 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                        }}>
                            <div style={{ color: 'var(--gold)', fontFamily: 'var(--serif)', fontSize: isMobile ? '18px' : '24px', fontWeight: 600 }}>{num}</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '3px' }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ CATEGORIES ══ */}
            <section style={{ padding: secPad, maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>{t.cat_eyebrow}</p>
                        <h2 style={{ margin: 0 }}>{t.cat_title}</h2>
                    </div>
                    <Link to="/shop" style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.3px' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >{t.featured_all} →</Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? '12px' : '16px' }}>
                    {categories.map((cat, i) => {
                        const label = [t.cat_1, t.cat_2, t.cat_3, t.cat_4][i];
                        return (
                            <div key={cat.key} ref={catFades[i].ref} style={catFades[i].style}>
                                <CatCard cat={cat} label={label} isMobile={isMobile} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ══ FEATURED PRODUCTS ══ */}
            <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: secPad }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                            <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>{t.featured_eyebrow}</p>
                            <h2 style={{ margin: 0 }}>{t.featured_title}</h2>
                        </div>
                        <Link to="/shop" style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >{t.featured_all} →</Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '20px' }}>
                        {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>
            </section>

            {/* ══ PROMISE BANNER ══ */}
            <section style={{ position: 'relative', overflow: 'hidden', minHeight: '360px' }}>
                <div style={{ position: 'absolute', inset: '-60px 0', backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,6,3,0.75)' }} />
                <div style={{
                    position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                    padding: isMobile ? '72px 24px' : '96px 32px',
                }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 16px' }}>{t.promise_eyebrow}</p>
                    <h2 style={{ color: '#fff', fontSize: isMobile ? 'clamp(28px, 7vw, 48px)' : 'clamp(32px, 5vw, 64px)', margin: '0 0 18px', fontWeight: 300, letterSpacing: '-1.5px', maxWidth: '700px' }}>
                        {t.promise_title}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: isMobile ? '14px' : '16px', maxWidth: '480px', lineHeight: 1.75, margin: '0 0 36px' }}>{t.promise_sub}</p>
                    <Link to="/story" style={{
                        padding: '12px 32px', borderRadius: '999px',
                        background: 'var(--gold)', color: '#0E0B08',
                        fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.2s ease',
                    }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >{t.promise_cta}</Link>
                </div>
            </section>

            {/* ══ TESTIMONIALS ══ */}
            <section style={{ padding: secPad, maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>{t.testi_eyebrow}</p>
                    <h2>{t.testi_title}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
                    {testimonials.map(({ name, loc, quote, rating }, i) => (
                        <TestiCard key={name} name={name} loc={loc} quote={quote} rating={rating} delay={i * 0.1} isMobile={isMobile} />
                    ))}
                </div>
            </section>

            {/* ══ FINAL CTA ══ */}
            <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: secPad, textAlign: 'center' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>{t.cta_eyebrow}</p>
                <h2 style={{ fontSize: isMobile ? 'clamp(28px, 7vw, 48px)' : 'clamp(32px, 5vw, 64px)', maxWidth: '640px', margin: '0 auto 18px', fontWeight: 300, letterSpacing: '-1.5px' }}>{t.cta_title}</h2>
                <p style={{ color: 'var(--text)', fontSize: isMobile ? '15px' : '16px', maxWidth: '420px', margin: '0 auto 36px', lineHeight: 1.75 }}>{t.cta_sub}</p>
                <Link to="/shop" style={{
                    display: 'inline-block', padding: isMobile ? '14px 32px' : '16px 48px', borderRadius: '999px',
                    background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '15px',
                    textDecoration: 'none', boxShadow: '0 6px 28px rgba(139,94,60,0.35)', transition: 'all 0.2s ease',
                }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >{t.cta_btn}</Link>
            </section>

        </div>
    );
}

export default Home;
