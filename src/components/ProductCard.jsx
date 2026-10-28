import { useState } from 'react';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';

const WHATSAPP_NUMBER = '15551234567'; // replace with real number

function ProductCard({ product }) {
    const { lang } = useLang();
    const t = tx[lang];
    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);

    function handleAdd() {
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    function handleBuyNow() {
        const msg = encodeURIComponent(
            `Hi! I'm interested in buying: ${product.name} ($${product.price.toFixed(2)})`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    }

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderRadius: '16px', overflow: 'hidden',
                background: 'var(--bg)', border: '1px solid var(--border)',
                boxShadow: hovered ? 'var(--shadow)' : 'var(--shadow-sm)',
                transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                display: 'flex', flexDirection: 'column',
            }}
        >
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: 'var(--bg-2)' }}>
                <img src={product.image} alt={product.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transform: hovered ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 0.45s ease',
                }} />
                <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    color: 'var(--text-h)', fontSize: '10px', fontWeight: 600,
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: '999px',
                }}>{product.category}</span>
            </div>

            {/* Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontFamily: 'var(--serif)', fontWeight: 600, color: 'var(--text-h)' }}>
                    {product.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6, flexGrow: 1 }}>
                    {product.description}
                </p>
                <div style={{ marginTop: '16px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 300, color: 'var(--text-h)', fontFamily: 'var(--serif)', display: 'block', marginBottom: '14px' }}>
                        ${product.price.toFixed(2)}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {/* Add to Cart */}
                        <button onClick={handleAdd} style={{
                            flex: 1, padding: '9px 0', borderRadius: '999px', cursor: 'pointer',
                            fontSize: '13px', fontWeight: 600,
                            background: added ? 'var(--accent-bg)' : 'transparent',
                            color: added ? 'var(--accent)' : 'var(--text-h)',
                            border: `1px solid ${added ? 'var(--accent-border)' : 'var(--border)'}`,
                            transition: 'all 0.2s ease',
                        }}>
                            {added ? t.products_added : t.products_add}
                        </button>
                        {/* WhatsApp Buy Now */}
                        <button onClick={handleBuyNow} style={{
                            flex: 1, padding: '9px 0', borderRadius: '999px', cursor: 'pointer',
                            fontSize: '13px', fontWeight: 600,
                            background: 'var(--accent)', color: '#fff',
                            border: '1px solid transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            transition: 'background 0.2s ease',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            {t.products_buy}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
