import React from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const redirectUrl = useBaseUrl('/docs/intro');
  return <Redirect to={redirectUrl} />;
}