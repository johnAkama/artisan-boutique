import { useState } from 'react';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';

function ProductCard({ product }) {
    const { lang } = useLang();
    const t = tx[lang];
    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);

    function handleAdd() {
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderRadius: '16px', border: '1px solid var(--border)',
                overflow: 'hidden', background: 'var(--bg)',
                boxShadow: hovered ? 'var(--shadow)' : 'none',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                display: 'flex', flexDirection: 'column',
            }}
        >
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} style={{
                    width: '100%', display: 'block',
                    transform: hovered ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                }} />
                <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: 'var(--cream)', border: '1px solid var(--cream-dark)',
                    color: 'var(--text-h)', fontSize: '11px', fontWeight: 600,
                    letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: '999px',
                }}>
                    {product.category}
                </span>
            </div>

            {/* Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                <h2 style={{ margin: 0, fontSize: '17px', fontFamily: 'var(--serif)' }}>{product.name}</h2>
                <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: '1.5', flexGrow: 1 }}>
                    {product.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--serif)' }}>
                        ${product.price.toFixed(2)}
                    </span>
                    <button onClick={handleAdd} style={{
                        padding: '8px 18px', borderRadius: '999px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: 600,
                        background: added ? 'var(--accent-bg)' : 'var(--accent)',
                        color: added ? 'var(--accent)' : '#fff',
                        border: added ? '1px solid var(--accent-border)' : '1px solid transparent',
                        transition: 'all 0.2s ease',
                    }}>
                        {added ? t.products_added : t.products_add}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
