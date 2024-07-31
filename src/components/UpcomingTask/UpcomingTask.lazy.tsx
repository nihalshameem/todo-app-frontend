import React, { lazy, Suspense } from 'react';

const LazyUpcomingTask = lazy(() => import('./UpcomingTask'));

const UpcomingTask = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyUpcomingTask {...props} />
  </Suspense>
);

export default UpcomingTask;
