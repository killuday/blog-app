// Auth pages (login, signup, forgot-password, reset-password) use this layout
// They don't need auth checking - just render children directly
export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
