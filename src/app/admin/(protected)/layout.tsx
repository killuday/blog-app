import { createClient } from '../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNav email={user!.email ?? ''} />
      <main className="flex-grow container mx-auto px-5 py-8">
        {children}
      </main>
    </div>
  );
}
