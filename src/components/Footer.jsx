import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';

const socials = [
    { label: 'Instagram', href: '#', icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>) },
    { label: 'Pinterest', href: '#', icon: (<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.564 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg>) },
    { label: 'Twitter / X', href: '#', icon: (<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>) },
    { label: 'Facebook', href: '#', icon: (<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>) },
];

function SocialBtn({ social }) {
    const [hovered, setHovered] = useState(false);
    return (
        <a href={social.href} aria-label={social.label}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: `1px solid ${hovered ? 'var(--accent-border)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: hovered ? 'var(--accent)' : 'var(--text)',
                background: hovered ? 'var(--accent-bg)' : 'transparent',
                transition: 'all 0.2s ease', textDecoration: 'none',
            }}
        >{social.icon}</a>
    );
}

function FooterLink({ to, label }) {
    const [hovered, setHovered] = useState(false);
    return (
        <Link to={to}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: hovered ? 'var(--accent)' : 'var(--text)',
                textDecoration: 'none', fontSize: '14px', marginBottom: '12px',
                transition: 'color 0.15s ease',
            }}
        >
            <span style={{
                width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0,
                background: hovered ? 'var(--accent)' : 'var(--cream-dark)',
                transition: 'background 0.15s ease',
            }} />
            {label}
        </Link>
    );
}

function Footer() {
    const { lang } = useLang();
    const t = tx[lang];
    const { isMobile, isTablet } = useBreakpoint();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    function handleSubscribe(e) {
        e.preventDefault();
        if (email.trim()) { setSubscribed(true); setEmail(''); }
    }

    const nav = [
        { heading: t.footer_shop, links: [['/', t.footer_home], ['/products', t.footer_all_products], ['/products', t.footer_new_arrivals], ['/products', t.footer_best_sellers]] },
        { heading: t.footer_company, links: [['/about', t.footer_about], ['/about', t.footer_artisans], ['/about', t.footer_sustainability], ['/about', t.footer_press]] },
        { heading: t.footer_support, links: [['/contact', t.footer_contact], ['/contact', t.footer_shipping], ['/contact', t.footer_faq], ['/contact', t.footer_track]] },
    ];

    const pad = isMobile ? '32px 20px' : isTablet ? '40px 32px' : '56px 48px';

    return (
        <footer style={{ marginTop: 'auto', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>

            {/* ── NEWSLETTER ── */}
            <div style={{
                background: 'var(--bg-2)', borderBottom: '1px solid var(--border)',
                padding: pad, display: 'flex', flexWrap: 'wrap',
                alignItems: 'center', justifyContent: 'space-between', gap: '28px',
            }}>
                <div style={{ maxWidth: '420px', flex: '1 1 280px' }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>
                        {t.footer_newsletter_eyebrow}
                    </p>
                    <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 3vw, 32px)', margin: '0 0 10px', lineHeight: 1.2 }}>
                        {t.footer_newsletter_title}
                    </h2>
                    <p style={{ color: 'var(--text)', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
                        {t.footer_newsletter_sub}
                    </p>
                </div>
                {subscribed ? (
                    <div style={{ padding: '16px 28px', borderRadius: '12px', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '15px' }}>
                        {t.footer_subscribed}
                    </div>
                ) : (
                    <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: '1 1 280px' }}>
                        <input type="email" placeholder={t.footer_email_placeholder} value={email}
                            onChange={e => setEmail(e.target.value)} required
                            style={{
                                padding: '12px 18px', borderRadius: '999px',
                                border: '1px solid var(--border)', background: 'var(--bg)',
                                color: 'var(--text-h)', fontSize: '14px', outline: 'none',
                                flex: '1 1 180px', minWidth: '0',
                            }}
                        />
                        <button type="submit" style={{
                            padding: '12px 24px', borderRadius: '999px', border: 'none',
                            background: 'var(--accent)', color: '#fff', fontWeight: 600,
                            fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
                        >{t.footer_subscribe}</button>
                    </form>
                )}
            </div>

            {/* ── MAIN GRID ── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '2fr repeat(3, 1fr)',
                gap: isMobile ? '32px' : '48px',
                padding: isMobile ? '40px 20px' : isTablet ? '48px 32px' : '64px 48px',
                textAlign: 'left',
            }}>
                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#fff', fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '16px' }}>E</span>
                        </div>
                        <p style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '20px', color: 'var(--text-h)', margin: 0 }}>Ewenam</p>
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text)', margin: '0 0 24px', maxWidth: '260px' }}>
                        {t.footer_tagline}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {socials.map(s => <SocialBtn key={s.label} social={s} />)}
                    </div>
                </div>

                {/* Nav cols — on tablet collapse to 2-col grid inside */}
                {isMobile ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        {nav.map(col => (
                            <div key={col.heading}>
                                <p style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-h)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 16px' }}>{col.heading}</p>
                                {col.links.map(([to, label]) => <FooterLink key={label} to={to} label={label} />)}
                            </div>
                        ))}
                    </div>
                ) : (
                    nav.map(col => (
                        <div key={col.heading}>
                            <p style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-h)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 20px' }}>{col.heading}</p>
                            {col.links.map(([to, label]) => <FooterLink key={label} to={to} label={label} />)}
                        </div>
                    ))
                )}
            </div>

            {/* ── BOTTOM BAR ── */}
            <div style={{
                borderTop: '1px solid var(--border)',
                padding: isMobile ? '16px 20px' : '20px 48px',
                display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                justifyContent: 'space-between', gap: '12px',
                fontSize: '13px', color: 'var(--text)', background: 'var(--bg-2)',
            }}>
                <span>© {new Date().getFullYear()} Ewenam. {t.footer_rights}</span>
                <div style={{ display: 'flex', gap: isMobile ? '12px' : '24px', flexWrap: 'wrap' }}>
                    {[[t.footer_privacy], [t.footer_terms], [t.footer_cookies]].map(([label]) => (
                        <a key={label} href="#" style={{ color: 'var(--text)', textDecoration: 'none', transition: 'color 0.15s', fontSize: isMobile ? '12px' : '13px' }}
                            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                            onMouseLeave={e => e.target.style.color = 'var(--text)'}
                        >{label}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
