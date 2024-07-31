import React, { lazy, Suspense } from 'react';

const LazyCompletedTasks = lazy(() => import('./CompletedTasks'));

const CompletedTasks = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCompletedTasks {...props} />
  </Suspense>
);

export default CompletedTasks;
