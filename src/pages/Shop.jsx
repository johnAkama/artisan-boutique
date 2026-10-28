import { useState, useMemo } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import { useLang } from '../context/LangContext';
import tx from '../context/translations';
import { useBreakpoint } from '../hooks/useBreakpoint';

const allCategories = [...new Set(products.map(p => p.category))];

function Shop() {
    const { lang } = useLang();
    const t = tx[lang];
    const { isMobile } = useBreakpoint();
    const [active, setActive] = useState(null);
    const [sort, setSort] = useState('new');

    const filtered = useMemo(() => {
        let list = active === null ? [...products] : products.filter(p => p.category === active);
        if (sort === 'low')  list.sort((a, b) => a.price - b.price);
        if (sort === 'high') list.sort((a, b) => b.price - a.price);
        return list;
    }, [active, sort]);

    return (
        <div style={{ minHeight: '80vh' }}>

            {/* Page header */}
            <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: isMobile ? '48px 20px 32px' : '64px 48px 40px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>{t.products_eyebrow}</p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                        <h1 style={{ margin: 0, fontWeight: 300, letterSpacing: '-2px' }}>{t.products_title}</h1>
                        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{filtered.length} {t.products_count}</span>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '28px 20px 64px' : '36px 48px 80px' }}>

                {/* Filters + Sort row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
                    {/* Filter pills */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[null, ...allCategories].map(cat => {
                            const label = cat === null ? t.products_filter_all : cat;
                            const isActive = cat === active;
                            return (
                                <button key={label} onClick={() => setActive(cat)} style={{
                                    padding: '7px 18px', borderRadius: '999px', cursor: 'pointer',
                                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                                    background: isActive ? 'var(--accent)' : 'transparent',
                                    color: isActive ? '#fff' : 'var(--text)',
                                    fontWeight: isActive ? 600 : 400, fontSize: '13px',
                                    transition: 'all 0.15s ease',
                                }}>{label}</button>
                            );
                        })}
                    </div>

                    {/* Sort */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t.products_sort}:</span>
                        <select value={sort} onChange={e => setSort(e.target.value)} style={{
                            padding: '7px 12px', borderRadius: '8px', border: '1px solid var(--border)',
                            background: 'var(--bg)', color: 'var(--text-h)', fontSize: '13px', cursor: 'pointer',
                            outline: 'none',
                        }}>
                            <option value="new">{t.products_sort_new}</option>
                            <option value="low">{t.products_sort_low}</option>
                            <option value="high">{t.products_sort_high}</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: isMobile ? '12px' : '24px' }}>
                    {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>
        </div>
    );
}

export default Shop;
