import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const css = `
@keyframes logoPulse {
    0%, 100% { transform: scale(1);   opacity: 1; }
    50%       { transform: scale(1.12); opacity: 0.7; }
}
@keyframes ringExpand {
    0%   { transform: scale(0.7); opacity: 0.6; }
    100% { transform: scale(1.8); opacity: 0; }
}
@keyframes dotFade {
    0%, 80%, 100% { opacity: 0; transform: scale(0.6); }
    40%           { opacity: 1; transform: scale(1); }
}`;

function PageLoader() {
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        setVisible(true);
        setFading(false);

        const t1 = setTimeout(() => setFading(true), 700);
        const t2 = setTimeout(() => setVisible(false), 1000);

        return () => [t1, t2].forEach(clearTimeout);
    }, [pathname]);

    if (!visible) return null;

    return (
        <>
            <style>{css}</style>
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'var(--bg)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '24px',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.3s ease',
            }}>
                {/* Pulsing ring behind logo */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                        position: 'absolute',
                        width: '72px', height: '72px', borderRadius: '20px',
                        border: '2px solid var(--accent)',
                        animation: 'ringExpand 1.4s ease-out infinite',
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: '72px', height: '72px', borderRadius: '20px',
                        border: '2px solid var(--gold)',
                        animation: 'ringExpand 1.4s ease-out infinite 0.4s',
                    }} />

                    {/* Logo mark */}
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '18px',
                        background: 'var(--accent)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 32px rgba(139,94,60,0.35)',
                        animation: 'logoPulse 1.4s ease-in-out infinite',
                        zIndex: 1,
                    }}>
                        <span style={{
                            color: '#fff',
                            fontFamily: 'var(--serif)',
                            fontWeight: 700,
                            fontSize: '32px',
                            lineHeight: 1,
                        }}>
                            E
                        </span>
                    </div>
                </div>

                {/* Brand name */}
                <span style={{
                    fontFamily: 'var(--serif)',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: 'var(--text-h)',
                    letterSpacing: '-0.3px',
                }}>
                    Ewenam
                </span>

                {/* Loading dots */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    {[0, 0.2, 0.4].map((delay, i) => (
                        <div key={i} style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: 'var(--accent)',
                            animation: `dotFade 1.2s ease-in-out infinite ${delay}s`,
                        }} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default PageLoader;
