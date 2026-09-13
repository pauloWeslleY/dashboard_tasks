import { useRouter } from 'next/navigation';
import { authClient } from '@/infra/auth/auth-client';

export function useMenuPopover() {
  const { data } = authClient.useSession();
  const router = useRouter();
  const user = data?.user;

  async function handlerSignOut(): Promise<void> {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  }

  return {
    user,
    handlerSignOut,
  };
}
