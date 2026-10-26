import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import t from '../context/translations';

function Navbar() {
    const { pathname } = useLocation();
    const { lang, toggle } = useLang();
    const tx = t[lang];
    const [scrolled, setScrolled] = useState(false);

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
        <nav
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 48px',
                height: '68px',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
                transition: 'box-shadow 0.3s ease',
            }}
        >
            {/* Logo */}
            <Link
                to="/"
                style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <span
                        style={{
                            color: '#fff',
                            fontFamily: 'var(--serif)',
                            fontWeight: 700,
                            fontSize: '16px',
                            lineHeight: 1,
                        }}
                    >
                        E
                    </span>
                </div>
                <span
                    style={{
                        fontFamily: 'var(--serif)',
                        fontWeight: 700,
                        fontSize: '20px',
                        color: 'var(--text-h)',
                        letterSpacing: '-0.3px',
                    }}
                >
                    Ewenam
                </span>
            </Link>

            {/* Links + actions */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {links.map(({ to, label }) => {
                    const active = pathname === to;
                    return (
                        <Link
                            key={to}
                            to={to}
                            style={{
                                padding: '7px 18px',
                                borderRadius: '999px',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: active ? 600 : 400,
                                color: active ? 'var(--accent)' : 'var(--text)',
                                background: active
                                    ? 'var(--accent-bg)'
                                    : 'transparent',
                                border: `1px solid ${active ? 'var(--accent-border)' : 'transparent'}`,
                                transition: 'all 0.15s ease',
                                fontFamily: 'var(--sans)',
                            }}
                        >
                            {label}
                        </Link>
                    );
                })}

                {/* Shop CTA */}
                <Link
                    to="/products"
                    style={{
                        marginLeft: '8px',
                        padding: '8px 22px',
                        borderRadius: '999px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#fff',
                        background: 'var(--accent)',
                        border: '1px solid var(--accent)',
                        transition: 'background 0.15s ease',
                        fontFamily: 'var(--sans)',
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                            'var(--accent-hover)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = 'var(--accent)')
                    }
                >
                    {tx.nav_cta}
                </Link>

                {/* Language toggle */}
                <button
                    onClick={toggle}
                    title={
                        lang === 'en'
                            ? 'Passer en français'
                            : 'Switch to English'
                    }
                    style={{
                        marginLeft: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-2)',
                        color: 'var(--text-h)',
                        fontSize: '13px',
                        fontWeight: 600,
                        fontFamily: 'var(--sans)',
                        transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                            'var(--accent-border)';
                        e.currentTarget.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text-h)';
                    }}
                >
                    <span style={{ fontSize: '15px' }}>
                        {lang === 'en' ? '🇫🇷' : '🇬🇧'}
                    </span>
                    {lang === 'en' ? 'FR' : 'EN'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
