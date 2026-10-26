import { useEffect, useState } from 'react';

export function useBreakpoint() {
    const [width, setWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );
    useEffect(() => {
        const fn = () => setWidth(window.innerWidth);
        window.addEventListener('resize', fn, { passive: true });
        return () => window.removeEventListener('resize', fn);
    }, []);
    return {
        isMobile: width < 640,
        isTablet: width < 1024,
        width,
    };
}
