import React, { lazy, Suspense } from 'react';

const LazysideMenu = lazy(() => import('./sideMenu'));

const sideMenu = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazysideMenu {...props} />
  </Suspense>
);

export default sideMenu;
