import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import products from '../data/products';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';

/* ── Fade-in on scroll ── */
function useFadeIn(delay = 0) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.12 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` } };
}

/* ── Parallax ── */
function useParallax(speed = 0.35) {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const fn = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            setOffset((rect.top + rect.height / 2 - window.innerHeight / 2) * speed);
        };
        window.addEventListener('scroll', fn, { passive: true });
        fn();
        return () => window.removeEventListener('scroll', fn);
    }, [speed]);
    return { ref, offset };
}

const featureIcons = ['🧵', '🌍', '🌿', '📦'];

const testimonials = [
    { name: 'Amara D.', location: 'London', quote: 'The ceramic vase I ordered is absolutely stunning. You can feel the love in every detail.', rating: 5 },
    { name: 'Luca M.', location: 'Milan', quote: 'Ewenam is my go-to for meaningful gifts. The quality is unmatched and the packaging is beautiful.', rating: 5 },
    { name: 'Sofia R.', location: 'New York', quote: 'I love knowing exactly who made my jewellery. The artisan story card that came with it made me emotional.', rating: 5 },
];

function StarRating({ count }) {
    return (
        <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} style={{ color: 'var(--gold)', fontSize: '15px' }}>★</span>
            ))}
        </div>
    );
}

function FeaturedCard({ product, delay, viewLabel }) {
    const fade = useFadeIn(delay);
    const [hovered, setHovered] = useState(false);
    return (
        <div ref={fade.ref} style={{ ...fade.style }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{
                borderRadius: '20px', overflow: 'hidden',
                border: '1px solid var(--border)', background: 'var(--bg)',
                boxShadow: hovered ? 'var(--shadow)' : 'var(--shadow-sm)',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}>
                <div style={{ position: 'relative', overflow: 'hidden', height: '240px', background: 'var(--bg-2)' }}>
                    <img src={product.image} alt={product.name} style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transform: hovered ? 'scale(1.06)' : 'scale(1)',
                        transition: 'transform 0.4s ease',
                    }} />
                    <span style={{
                        position: 'absolute', top: '14px', left: '14px',
                        background: 'var(--cream)', color: 'var(--text-h)',
                        fontSize: '11px', fontWeight: 600, letterSpacing: '1px',
                        textTransform: 'uppercase', padding: '4px 12px', borderRadius: '999px',
                        border: '1px solid var(--cream-dark)',
                    }}>{product.category}</span>
                </div>
                <div style={{ padding: '20px 22px 22px' }}>
                    <h3 style={{ fontSize: '17px', margin: '0 0 6px', fontFamily: 'var(--serif)' }}>{product.name}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6, margin: '0 0 16px' }}>{product.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--serif)' }}>
                            ${product.price.toFixed(2)}
                        </span>
                        <Link to="/products" style={{
                            padding: '7px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
                            background: 'var(--accent-bg)', color: 'var(--accent)',
                            border: '1px solid var(--accent-border)', textDecoration: 'none',
                            transition: 'all 0.15s ease',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-bg)'; e.currentTarget.style.color = 'var(--accent)'; }}
                        >
                            {viewLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Home() {
    const { lang } = useLang();
    const t = tx[lang];
    const { ref: heroRef, offset } = useParallax(0.4);
    const f1 = useFadeIn(0); const f2 = useFadeIn(0.1); const f3 = useFadeIn(0.2); const f4 = useFadeIn(0.3);
    const fadeFeatures = [f1, f2, f3, f4];

    const features = [
        { icon: featureIcons[0], title: t.feat_title1, desc: t.feat_desc1 },
        { icon: featureIcons[1], title: t.feat_title2, desc: t.feat_desc2 },
        { icon: featureIcons[2], title: t.feat_title3, desc: t.feat_desc3 },
        { icon: featureIcons[3], title: t.feat_title4, desc: t.feat_desc4 },
    ];

    return (
        <div style={{ textAlign: 'left' }}>

            {/* ══ HERO ══ */}
            <section style={{ position: 'relative', height: '94vh', overflow: 'hidden', minHeight: '560px' }}>
                <div ref={heroRef} style={{
                    position: 'absolute', inset: '-80px 0',
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    transform: `translateY(${offset}px)`, willChange: 'transform',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(110deg, rgba(44,26,14,0.78) 0%, rgba(44,26,14,0.35) 55%, rgba(44,26,14,0.15) 100%)',
                }} />
                <div style={{
                    position: 'relative', zIndex: 1, height: '100%',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: '0 72px', maxWidth: '860px',
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(196,154,108,0.2)', border: '1px solid rgba(196,154,108,0.5)',
                        borderRadius: '999px', padding: '6px 16px', marginBottom: '28px', width: 'fit-content',
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
                        <span style={{ color: 'var(--gold)', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
                            {t.home_badge}
                        </span>
                    </div>
                    <h1 style={{
                        color: '#fff', fontFamily: 'var(--serif)',
                        fontSize: 'clamp(44px, 7.5vw, 96px)',
                        lineHeight: 1.0, letterSpacing: '-2px', margin: '0 0 28px',
                    }}>
                        {t.home_hero_line1}<br />
                        <span style={{ color: 'var(--gold)' }}>{t.home_hero_line2}</span>
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.72)', fontSize: '18px',
                        lineHeight: 1.75, maxWidth: '440px', margin: '0 0 44px',
                    }}>
                        {t.home_hero_sub}
                    </p>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        <Link to="/products" style={{
                            padding: '14px 34px', borderRadius: '999px',
                            background: 'var(--accent)', color: '#fff',
                            fontWeight: 600, fontSize: '15px', textDecoration: 'none',
                            boxShadow: '0 4px 24px rgba(139,94,60,0.5)',
                            transition: 'all 0.2s ease',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
                        >
                            {t.home_hero_cta1}
                        </Link>
                        <Link to="/about" style={{
                            padding: '14px 34px', borderRadius: '999px',
                            background: 'rgba(255,255,255,0.1)', color: '#fff',
                            fontWeight: 500, fontSize: '15px', textDecoration: 'none',
                            border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(8px)',
                            transition: 'all 0.2s ease',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            {t.home_hero_cta2}
                        </Link>
                    </div>
                </div>

                {/* Stats strip */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'rgba(44,26,14,0.65)', backdropFilter: 'blur(12px)',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', justifyContent: 'center', gap: '0',
                }}>
                    {[['200+', t.stat_artisans], ['14', t.stat_countries], ['5,000+', t.stat_sold], ['4.9★', t.stat_rating]].map(([num, label], i) => (
                        <div key={label} style={{
                            padding: '20px 48px', textAlign: 'center',
                            borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                        }}>
                            <div style={{ color: 'var(--gold)', fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 700 }}>{num}</div>
                            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ FEATURES ══ */}
            <section style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: '72px 48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', maxWidth: '1100px', margin: '0 auto' }}>
                    {features.map(({ icon, title, desc }, i) => (
                        <div key={title} ref={fadeFeatures[i].ref} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', ...fadeFeatures[i].style }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                                background: 'var(--cream)', border: '1px solid var(--cream-dark)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                            }}>{icon}</div>
                            <div>
                                <h3 style={{ fontSize: '16px', margin: '0 0 6px', fontFamily: 'var(--serif)' }}>{title}</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ FEATURED PRODUCTS ══ */}
            <section style={{ padding: '96px 48px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
                        {t.featured_eyebrow}
                    </p>
                    <h2 style={{ marginBottom: '14px' }}>{t.featured_title}</h2>
                    <p style={{ color: 'var(--text)', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
                        {t.featured_sub}
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
                    {products.slice(0, 3).map((p, i) => <FeaturedCard key={p.id} product={p} delay={i * 0.1} viewLabel={t.featured_view} />)}
                </div>
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <Link to="/products" style={{
                        display: 'inline-block', padding: '14px 40px', borderRadius: '999px',
                        border: '2px solid var(--accent)', color: 'var(--accent)',
                        fontWeight: 600, fontSize: '15px', textDecoration: 'none',
                        transition: 'all 0.2s ease',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
                    >
                        {t.featured_all}
                    </Link>
                </div>
            </section>

            {/* ══ PARALLAX BANNER ══ */}
            <section style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', inset: '-60px 0',
                    backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center 30%',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,26,14,0.72)' }} />
                <div style={{
                    position: 'relative', zIndex: 1, height: '100%',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', textAlign: 'center', padding: '0 32px',
                }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase', margin: '0 0 16px' }}>
                        {t.promise_eyebrow}
                    </p>
                    <h2 style={{ color: '#fff', fontSize: 'clamp(26px, 4vw, 48px)', margin: '0 0 18px', letterSpacing: '-1px' }}>
                        {t.promise_title}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '16px', maxWidth: '500px', lineHeight: 1.75, margin: '0 0 32px' }}>
                        {t.promise_sub}
                    </p>
                    <Link to="/about" style={{
                        padding: '12px 30px', borderRadius: '999px',
                        background: 'var(--gold)', color: 'var(--text-h)',
                        fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                        transition: 'opacity 0.2s ease',
                    }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        {t.promise_cta}
                    </Link>
                </div>
            </section>

            {/* ══ TESTIMONIALS ══ */}
            <section style={{ background: 'var(--bg-2)', padding: '96px 48px', borderTop: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
                        {t.testi_eyebrow}
                    </p>
                    <h2>{t.testi_title}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
                    {testimonials.map(({ name, location, quote, rating }, i) => {
                        const fade = useFadeIn(i * 0.12);
                        return (
                            <div key={name} ref={fade.ref} style={{
                                ...fade.style,
                                background: 'var(--bg)', border: '1px solid var(--border)',
                                borderRadius: '20px', padding: '32px',
                                boxShadow: 'var(--shadow-sm)',
                            }}>
                                <StarRating count={rating} />
                                <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--text-h)', margin: '0 0 24px', fontStyle: 'italic' }}>
                                    "{quote}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        background: 'var(--cream)', border: '2px solid var(--cream-dark)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontFamily: 'var(--serif)', fontWeight: 700, color: 'var(--accent)', fontSize: '16px',
                                    }}>
                                        {name[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-h)' }}>{name}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text)' }}>{location}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ══ FINAL CTA ══ */}
            <section style={{
                padding: '96px 48px', textAlign: 'center',
                background: 'var(--bg)',
                borderTop: '1px solid var(--border)',
            }}>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                    {t.cta_eyebrow}
                </p>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: '18px', maxWidth: '600px', margin: '0 auto 18px' }}>
                    {t.cta_title}
                </h2>
                <p style={{ color: 'var(--text)', fontSize: '16px', maxWidth: '440px', margin: '0 auto 40px', lineHeight: 1.75 }}>
                    {t.cta_sub}
                </p>
                <Link to="/products" style={{
                    display: 'inline-block', padding: '16px 44px', borderRadius: '999px',
                    background: 'var(--accent)', color: '#fff',
                    fontWeight: 700, fontSize: '16px', textDecoration: 'none',
                    boxShadow: '0 6px 28px rgba(139,94,60,0.35)',
                    transition: 'all 0.2s ease',
                }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                    {t.cta_btn}
                </Link>
            </section>

        </div>
    );
}

export default Home;
