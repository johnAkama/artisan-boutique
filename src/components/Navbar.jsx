import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';

const SunIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
);
const MoonIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
);

function Navbar() {
    const { pathname } = useLocation();
    const { lang, toggleLang, theme, toggleTheme } = useLang();
    const t = tx[lang];
    const { isMobile, isTablet } = useBreakpoint();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [pathname]);

    const links = [
        { to: '/',         label: t.nav_home },
        { to: '/shop',     label: t.nav_shop },
        { to: '/about',    label: t.nav_about },
        { to: '/story',    label: t.nav_story },
        { to: '/contact',  label: t.nav_contact },
    ];

    const navBg = scrolled
        ? 'var(--bg)'
        : 'var(--bg)';

    return (
        <>
            <nav style={{
                position: 'sticky', top: 0, zIndex: 300,
                height: 'var(--nav-h)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: isMobile ? '0 20px' : '0 48px',
                background: navBg,
                borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'var(--border)'}`,
                boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
                transition: 'box-shadow 0.3s ease',
            }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '34px', height: '34px', borderRadius: '8px',
                        background: 'var(--accent)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                        <span style={{ color: '#fff', fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '18px', lineHeight: 1 }}>E</span>
                    </div>
                    <span style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '22px', color: 'var(--text-h)', letterSpacing: '-0.5px' }}>
                        Ewenam
                    </span>
                </Link>

                {/* Desktop nav */}
                {!isTablet && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        {links.map(({ to, label }) => {
                            const active = pathname === to;
                            return (
                                <Link key={to} to={to} style={{
                                    padding: '6px 16px', borderRadius: '999px', textDecoration: 'none',
                                    fontSize: '14px', fontWeight: active ? 600 : 400,
                                    color: active ? 'var(--accent)' : 'var(--text)',
                                    background: active ? 'var(--accent-bg)' : 'transparent',
                                    transition: 'all 0.15s ease',
                                }}
                                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-h)'; }}
                                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text)'; }}
                                >{label}</Link>
                            );
                        })}
                    </div>
                )}

                {/* Right controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Theme toggle */}
                    <button onClick={toggleTheme} aria-label="Toggle theme" style={{
                        width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                        border: '1px solid var(--border)', background: 'var(--bg-2)',
                        color: 'var(--text-h)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s ease',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.color = 'var(--accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-h)'; }}
                    >
                        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>

                    {/* Lang toggle */}
                    <button onClick={toggleLang} style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        padding: '6px 12px', borderRadius: '999px', cursor: 'pointer',
                        border: '1px solid var(--border)', background: 'var(--bg-2)',
                        color: 'var(--text-h)', fontSize: '12px', fontWeight: 600,
                        transition: 'all 0.15s ease',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.color = 'var(--accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-h)'; }}
                    >
                        <span style={{ fontSize: '14px' }}>{lang === 'en' ? '🇫🇷' : '🇬🇧'}</span>
                        {lang === 'en' ? 'FR' : 'EN'}
                    </button>

                    {/* CTA — desktop only */}
                    {!isTablet && (
                        <Link to="/shop" style={{
                            padding: '8px 22px', borderRadius: '999px', textDecoration: 'none',
                            fontSize: '14px', fontWeight: 600, color: '#fff',
                            background: 'var(--accent)', transition: 'background 0.15s ease',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
                        >{t.nav_cta}</Link>
                    )}

                    {/* Hamburger */}
                    {isTablet && (
                        <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu" style={{
                            width: '40px', height: '40px', borderRadius: '10px',
                            border: '1px solid var(--border)', background: 'var(--bg-2)',
                            cursor: 'pointer', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: '5px',
                        }}>
                            {[0, 1, 2].map(i => (
                                <span key={i} style={{
                                    display: 'block', height: '2px', background: 'var(--text-h)', borderRadius: '2px',
                                    width: menuOpen ? '18px' : (i === 1 ? '12px' : '18px'),
                                    transition: 'all 0.2s ease',
                                    transform: menuOpen
                                        ? i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)'
                                        : 'none',
                                }} />
                            ))}
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile drawer */}
            {isTablet && (
                <div style={{
                    position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 299,
                    background: 'var(--bg)', borderBottom: '1px solid var(--border)',
                    boxShadow: 'var(--shadow)',
                    maxHeight: menuOpen ? '420px' : '0px',
                    overflow: 'hidden', transition: 'max-height 0.35s ease',
                }}>
                    <div style={{ padding: '16px 24px 28px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {links.map(({ to, label }) => {
                            const active = pathname === to;
                            return (
                                <Link key={to} to={to} style={{
                                    padding: '12px 16px', borderRadius: '12px', textDecoration: 'none',
                                    fontSize: '16px', fontWeight: active ? 600 : 400,
                                    color: active ? 'var(--accent)' : 'var(--text-h)',
                                    background: active ? 'var(--accent-bg)' : 'transparent',
                                }}>{label}</Link>
                            );
                        })}
                        <div style={{ borderTop: '1px solid var(--border)', marginTop: '8px', paddingTop: '16px' }}>
                            <Link to="/shop" style={{
                                display: 'block', textAlign: 'center', padding: '13px',
                                borderRadius: '999px', background: 'var(--accent)', color: '#fff',
                                fontWeight: 600, fontSize: '15px', textDecoration: 'none',
                            }}>{t.nav_cta}</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
