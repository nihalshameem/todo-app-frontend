import React, { lazy, Suspense } from 'react';
import { AuthFormIntserface } from '../../utils/interfaces';

const LazySignIn = lazy(() => import('./SignIn'));

const SignIn = (props: {submit: (req: AuthFormIntserface) => void} & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySignIn {...props} />
  </Suspense>
);

export default SignIn;
