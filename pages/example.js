import React, { useEffect } from 'react';
import AppLayout from '../components/templates/AppLayout';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Example() {
  const { isLoading, error, data, isFetching } = useQuery(['repoData'], () =>
    axios.get('https://api.github.com/repos/tannerlinsley/react-query').then((res) => res.data),
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <AppLayout
        mode={'dev'}
        title="404"
        description=""
        showLeftSidebar={false}
        showRightSidebar={false}
        showHeader={false}
        showFooter={false}
      >
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="display-1 fw-bold">Example</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong>
            <div>{isFetching ? 'Updating...' : ''}</div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
