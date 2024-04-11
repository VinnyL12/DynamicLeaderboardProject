import React, { useEffect } from 'react';

const AutoScroll = ({ enabled, onBottom }) => {
    useEffect(() => {
        if (enabled) {
            window.scrollTo(0, 250);

            const scrollInterval = setInterval(() => {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const currentScrollPosition = window.scrollY;

                window.scrollBy(0, 150);

                if (currentScrollPosition >= Math.floor(documentHeight - windowHeight - 1)) {
                    onBottom();
                    window.scrollTo(0, 250);
                }
            }, 2000);

            return () => clearInterval(scrollInterval);
        }
    }, [enabled]);

    return (
        <></>
    );
};

export default AutoScroll;