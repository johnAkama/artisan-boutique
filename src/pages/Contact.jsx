import { useState } from 'react';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';

const WHATSAPP_NUMBER = '15551234567';
const CONTACT_EMAIL = 'hello@ewenam.com';

const socials = [
    { label: 'Instagram', href: '#', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
    { label: 'Pinterest',  href: '#', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.564 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg> },
    { label: 'Twitter/X',  href: '#', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
];

function Contact() {
    const { lang } = useLang();
    const t = tx[lang];
    const { isMobile, isTablet } = useBreakpoint();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    function handleChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }
    function handleSubmit(e) {
        e.preventDefault();
        if (form.name && form.email && form.message) { setSent(true); setForm({ name: '', email: '', subject: '', message: '' }); }
    }
    function handleWhatsApp() {
        const msg = encodeURIComponent(`Hi Ewenam! ${form.message || 'I\'d like to get in touch.'}`);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    }

    const inputStyle = {
        width: '100%', padding: '13px 16px', borderRadius: '12px', boxSizing: 'border-box',
        border: '1px solid var(--border)', background: 'var(--bg)',
        color: 'var(--text-h)', fontSize: '15px', outline: 'none',
        transition: 'border-color 0.15s ease', fontFamily: 'var(--sans)',
    };

    return (
        <div style={{ minHeight: '80vh' }}>

            {/* Header */}
            <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: isMobile ? '56px 20px 40px' : '80px 48px 56px', textAlign: 'center' }}>
                <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>{t.contact_eyebrow}</p>
                <h1 style={{ fontWeight: 300, letterSpacing: '-2px', margin: '0 0 16px', fontSize: isMobile ? 'clamp(32px, 8vw, 52px)' : 'clamp(40px, 6vw, 72px)' }}>{t.contact_title}</h1>
                <p style={{ color: 'var(--text)', fontSize: isMobile ? '15px' : '17px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>{t.contact_sub}</p>
            </div>

            {/* Body */}
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '48px 20px 72px' : '72px 48px 96px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr', gap: isMobile ? '48px' : '72px' }}>

                    {/* FORM */}
                    <div>
                        {sent ? (
                            <div style={{ padding: '40px', borderRadius: '20px', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', textAlign: 'center' }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
                                <h3 style={{ margin: '0 0 8px', color: 'var(--accent)' }}>{t.contact_sent}</h3>
                                <p style={{ color: 'var(--text)', fontSize: '14px' }}>We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-h)', letterSpacing: '0.5px', marginBottom: '8px' }}>{t.contact_name}</label>
                                        <input name="name" value={form.name} onChange={handleChange} required placeholder={t.contact_name} style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--accent-border)'}
                                            onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-h)', letterSpacing: '0.5px', marginBottom: '8px' }}>{t.contact_email}</label>
                                        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder={t.contact_email} style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--accent-border)'}
                                            onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-h)', letterSpacing: '0.5px', marginBottom: '8px' }}>{t.contact_subject}</label>
                                    <input name="subject" value={form.subject} onChange={handleChange} placeholder={t.contact_subject} style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = 'var(--accent-border)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-h)', letterSpacing: '0.5px', marginBottom: '8px' }}>{t.contact_message}</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} required placeholder={t.contact_message} rows={6} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                                        onFocus={e => e.target.style.borderColor = 'var(--accent-border)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <button type="submit" style={{
                                        flex: 1, padding: '14px 28px', borderRadius: '999px', border: 'none',
                                        background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '15px',
                                        cursor: 'pointer', transition: 'background 0.15s ease',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
                                    >{t.contact_send}</button>
                                    <button type="button" onClick={handleWhatsApp} style={{
                                        flex: 1, padding: '14px 28px', borderRadius: '999px',
                                        border: '1px solid var(--border)', background: 'transparent',
                                        color: 'var(--text-h)', fontWeight: 600, fontSize: '15px',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        transition: 'all 0.15s ease',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.color = '#25D366'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-h)'; }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                        {t.contact_whatsapp}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* INFO PANEL */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div>
                            <h3 style={{ margin: '0 0 24px', fontWeight: 600 }}>{t.contact_info_title}</h3>
                            {[
                                { label: t.contact_email_label, val: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                                { label: t.contact_phone_label, val: `+1 (555) 123-4567`, href: `https://wa.me/${WHATSAPP_NUMBER}` },
                                { label: t.contact_hours_label, val: t.contact_hours_val, href: null },
                            ].map(({ label, val, href }) => (
                                <div key={label} style={{ marginBottom: '20px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</p>
                                    {href ? (
                                        <a href={href} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >{val}</a>
                                    ) : (
                                        <p style={{ color: 'var(--text-h)', fontSize: '15px', fontWeight: 500 }}>{val}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Social */}
                        <div>
                            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>{t.contact_follow}</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {socials.map(s => (
                                    <a key={s.label} href={s.href} aria-label={s.label} style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--text)', textDecoration: 'none', transition: 'all 0.2s ease',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-bg)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'transparent'; }}
                                    >{s.icon}</a>
                                ))}
                            </div>
                        </div>

                        {/* WhatsApp card */}
                        <div style={{ borderRadius: '16px', background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                </div>
                                <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-h)', margin: 0 }}>WhatsApp</p>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6, margin: '0 0 16px' }}>Prefer to chat? Message us directly on WhatsApp for fast replies.</p>
                            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" style={{
                                display: 'block', textAlign: 'center', padding: '11px', borderRadius: '999px',
                                background: '#25D366', color: '#fff', fontWeight: 600, fontSize: '14px',
                                textDecoration: 'none', transition: 'opacity 0.15s ease',
                            }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >{t.contact_whatsapp}</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Contact;
