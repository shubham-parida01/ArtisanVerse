
import { cookies } from 'next/headers';
import ProfileClientPage from './profile-client-page';
import type { Artisan } from '@/lib/types';
import { artisans } from '@/lib/data';

async function getArtisan(artisanId: string): Promise<Artisan | null> {
  // Now we can look up directly from the consolidated data source
  const artisan = artisans.find(a => a.id === artisanId);
  return artisan || null;
}


export default async function ProfilePage() {
  const cookieStore = cookies();
  const authSession = cookieStore.get('auth-session');
  
  let artisan: Artisan | null = null;
  if (authSession && authSession.value.startsWith('artisan:')) {
      const artisanId = authSession.value.split(':')[1];
      artisan = await getArtisan(artisanId);
  }

  return <ProfileClientPage artisan={artisan} />;
}
