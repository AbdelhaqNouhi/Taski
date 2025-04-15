import dynamic from 'next/dynamic';

const MainModal = dynamic(() => import('./MainModal'), {
    ssr: false,
});

export {MainModal}