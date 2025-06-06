import React, { lazy, Suspense } from 'react';

const LazySideMenu = lazy(() => import('./sideMenu'));

const SideMenu = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySideMenu {...props} />
  </Suspense>
);

export default SideMenu;
