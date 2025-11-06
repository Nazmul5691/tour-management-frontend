
import { useEffect, useState } from 'react';

const Counter = ({ endValue, duration, resetTrigger }: { endValue: number; duration: number; resetTrigger: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = endValue / (duration / 16.67); // 16.67ms per frame at 60fps
        const interval = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                start = endValue;
                clearInterval(interval);
            }
            setCount(Math.floor(start));
        }, 16.67);

        return () => clearInterval(interval);
    }, [resetTrigger, endValue, duration]);

    return (
        <span>{ count.toLocaleString() } </span>
    );
};

export default Counter;