import './src/styles/global.css';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
export const wrapPageElement = ({ element }) => (
    <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
);

const transitionDelay = 500

// this fixes issue with scrolling to top before exit animation on page change
export const shouldUpdateScroll = ({
    routerProps: { location },
    getSavedScrollPosition,
}) => {
    if (location.action === 'PUSH') {
        window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
    } else {
        const savedPosition = getSavedScrollPosition(location);
        window.setTimeout(
            () => window.scrollTo(...(savedPosition || [0, 0])),
            transitionDelay
        );
    }
    return false;
};
