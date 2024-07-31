import React, { lazy, Suspense } from 'react';

const LazyOldTask = lazy(() => import('./OldTask'));

const OldTask = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOldTask {...props} />
  </Suspense>
);

export default OldTask;
