import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full bg-muted/30 dark:bg-black">
      <AppSidebar />
      <div className="flex flex-1 flex-col sm:pl-16">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
