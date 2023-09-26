import BaseLayout from './BaseLayout';
import SideNavigation from '@/components/SideNavigation';
import type { FC, PropsWithChildren } from 'react';

const ContributeLayout: FC<PropsWithChildren> = ({ children }) => (
  <BaseLayout>
    <div className="has-side-nav container">
      <SideNavigation navigationKey="getInvolved" />
      <article dir="auto">{children}</article>
    </div>
  </BaseLayout>
);

export default ContributeLayout;
