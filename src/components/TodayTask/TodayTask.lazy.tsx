import React, { lazy, Suspense } from 'react';

const LazyTodayTask = lazy(() => import('./TodayTask'));

const TodayTask = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTodayTask {...props} />
  </Suspense>
);

export default TodayTask;
