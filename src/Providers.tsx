import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from '@/hooks/useTheme.tsx';

const queryClient = new QueryClient();

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  console.log(theme);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
