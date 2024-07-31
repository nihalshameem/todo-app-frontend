import React, { lazy, Suspense } from 'react';

const LazyNewTask = lazy(() => import('./NewTask'));

const NewTask = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyNewTask {...props} />
  </Suspense>
);

export default NewTask;
