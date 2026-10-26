import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import t from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';

function Navbar() {
    const { pathname } = useLocation();
    const { lang, toggle } = useLang();
    const tx = t[lang];
    const { isMobile, isTablet } = useBreakpoint();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useState(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { to: '/', label: tx.nav_home },
        { to: '/products', label: tx.nav_shop },
        { to: '/about', label: tx.nav_story },
    ];

    return (
        <>
            <nav style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: isMobile ? '0 20px' : '0 48px',
                height: '68px', borderBottom: '1px solid var(--border)',
                background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 200,
                boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
                transition: 'box-shadow 0.3s ease',
            }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'var(--accent)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                        <span style={{ color: '#fff', fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '16px', lineHeight: 1 }}>E</span>
                    </div>
                    <span style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '20px', color: 'var(--text-h)', letterSpacing: '-0.3px' }}>
                        Ewenam
                    </span>
                </Link>

                {/* Desktop links */}
                {!isTablet && (
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {links.map(({ to, label }) => {
                            const active = pathname === to;
                            return (
                                <Link key={to} to={to} style={{
                                    padding: '7px 18px', borderRadius: '999px', textDecoration: 'none',
                                    fontSize: '14px', fontWeight: active ? 600 : 400,
                                    color: active ? 'var(--accent)' : 'var(--text)',
                                    background: active ? 'var(--accent-bg)' : 'transparent',
                                    border: `1px solid ${active ? 'var(--accent-border)' : 'transparent'}`,
                                    transition: 'all 0.15s ease', fontFamily: 'var(--sans)',
                                }}>{label}</Link>
                            );
                        })}
                        <button onClick={toggle} style={{
                            marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '7px 14px', borderRadius: '999px', cursor: 'pointer',
                            border: '1px solid var(--border)', background: 'var(--bg-2)',
                            color: 'var(--text-h)', fontSize: '13px', fontWeight: 600,
                            fontFamily: 'var(--sans)', transition: 'all 0.15s ease',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.color = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-h)'; }}
                        >
                            <span style={{ fontSize: '15px' }}>{lang === 'en' ? '🇫🇷' : '🇬🇧'}</span>
                            {lang === 'en' ? 'FR' : 'EN'}
                        </button>
                        <Link to="/products" style={{
                            marginLeft: '8px', padding: '8px 22px', borderRadius: '999px',
                            textDecoration: 'none', fontSize: '14px', fontWeight: 600,
                            color: '#fff', background: 'var(--accent)', transition: 'background 0.15s ease',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
                        >{tx.nav_cta}</Link>
                    </div>
                )}

                {/* Mobile right side */}
                {isTablet && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={toggle} style={{
                            display: 'flex', alignItems: 'center', gap: '4px',
                            padding: '6px 10px', borderRadius: '999px', cursor: 'pointer',
                            border: '1px solid var(--border)', background: 'var(--bg-2)',
                            color: 'var(--text-h)', fontSize: '12px', fontWeight: 600,
                        }}>
                            <span>{lang === 'en' ? '🇫🇷' : '🇬🇧'}</span>
                            {lang === 'en' ? 'FR' : 'EN'}
                        </button>
                        <button onClick={() => setMenuOpen(o => !o)} style={{
                            width: '40px', height: '40px', borderRadius: '10px',
                            border: '1px solid var(--border)', background: 'var(--bg-2)',
                            cursor: 'pointer', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: '5px',
                        }}>
                            {[0, 1, 2].map(i => (
                                <span key={i} style={{
                                    display: 'block', width: menuOpen ? '18px' : (i === 1 ? '12px' : '18px'),
                                    height: '2px', background: 'var(--text-h)', borderRadius: '2px',
                                    transition: 'all 0.2s ease',
                                    transform: menuOpen
                                        ? i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)'
                                        : 'none',
                                }} />
                            ))}
                        </button>
                    </div>
                )}
            </nav>

            {/* Mobile drawer */}
            {isTablet && (
                <div style={{
                    position: 'fixed', top: '68px', left: 0, right: 0, zIndex: 199,
                    background: 'var(--bg)', borderBottom: '1px solid var(--border)',
                    boxShadow: 'var(--shadow)',
                    maxHeight: menuOpen ? '400px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                }}>
                    <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {links.map(({ to, label }) => {
                            const active = pathname === to;
                            return (
                                <Link key={to} to={to} onClick={() => setMenuOpen(false)} style={{
                                    padding: '12px 16px', borderRadius: '12px', textDecoration: 'none',
                                    fontSize: '16px', fontWeight: active ? 600 : 400,
                                    color: active ? 'var(--accent)' : 'var(--text-h)',
                                    background: active ? 'var(--accent-bg)' : 'transparent',
                                    transition: 'all 0.15s ease',
                                }}>{label}</Link>
                            );
                        })}
                        <div style={{ borderTop: '1px solid var(--border)', marginTop: '8px', paddingTop: '16px' }}>
                            <Link to="/products" onClick={() => setMenuOpen(false)} style={{
                                display: 'block', textAlign: 'center', padding: '12px',
                                borderRadius: '999px', background: 'var(--accent)', color: '#fff',
                                fontWeight: 600, fontSize: '15px', textDecoration: 'none',
                            }}>{tx.nav_cta}</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
