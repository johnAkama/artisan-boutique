import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
    const { pathname } = useLocation();
    const [opacity, setOpacity] = useState(0);
    const [translateY, setTranslateY] = useState(12);

    useEffect(() => {
        setOpacity(0);
        setTranslateY(12);

        const t = setTimeout(() => {
            setOpacity(1);
            setTranslateY(0);
        }, 50);

        return () => clearTimeout(t);
    }, [pathname]);

    return (
        <div style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}>
            {children}
        </div>
    );
}

export default PageTransition;
