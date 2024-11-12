import {Suspense, ComponentType} from 'react';
import LoadingSpinner from './loading-spinner';

const Loadable =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;
