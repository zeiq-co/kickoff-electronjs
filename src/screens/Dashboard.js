import React from 'react';

import Layout from '../components/Layout';
import { EmptyState } from '../components/elements';

export default function Dashboard() {
  return (
    <Layout title="Dashboard" description="Welcome!">
      <EmptyState
        title="Dashboard"
        details="This is landing page of your app"
      />
    </Layout>
  );
}
