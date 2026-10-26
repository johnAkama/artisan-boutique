import { useState } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';

const allCategories = [...new Set(products.map((p) => p.category))];

function Products() {
    const { lang } = useLang();
    const t = tx[lang];
    const { isMobile } = useBreakpoint();
    const [active, setActive] = useState(null);

    const categories = [t.products_filter_all, ...allCategories];
    const filtered = active === null
        ? products
        : products.filter((p) => p.category === active);

    return (
        <div style={{ padding: isMobile ? '32px 20px' : '48px 32px', textAlign: 'left' }}>
            {/* Header */}
            <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
                {t.products_eyebrow}
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
                <h1 style={{ margin: 0 }}>{t.products_title}</h1>
                <span style={{ fontSize: '14px', color: 'var(--text)' }}>
                    {filtered.length} {t.products_count}
                </span>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
                {categories.map((cat) => {
                    const isAll = cat === t.products_filter_all;
                    const isActive = isAll ? active === null : active === cat;
                    return (
                        <button key={cat} onClick={() => setActive(isAll ? null : cat)} style={{
                            padding: '7px 18px', borderRadius: '999px',
                            border: `1px solid ${isActive ? 'var(--accent-border)' : 'var(--border)'}`,
                            background: isActive ? 'var(--accent-bg)' : 'transparent',
                            color: isActive ? 'var(--accent)' : 'var(--text)',
                            fontWeight: isActive ? 600 : 400,
                            fontSize: '14px', cursor: 'pointer', transition: 'all 0.15s ease',
                        }}>
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
                {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
}

export default Products;
