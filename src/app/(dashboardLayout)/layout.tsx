import { ThemeProvider } from '@/components/theme-provider';
import { PrimarySidebar } from './dashboard/_components/common/primary-sidebar';
import { PrimaryTopNav } from './dashboard/_components/common/primary-top-navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen overflow-hidden">
        <PrimarySidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <PrimaryTopNav />
          <main className="flex-1 overflow-y-auto bg-background p-4">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
