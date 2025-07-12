import Footer from "@/components/layout/footer";
import PublicHeader from "@/components/layout/public-header";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <PublicHeader />
      <main className="flex-1 py-12 md:py-20">
        <div className="container">
         <div className="mx-auto max-w-3xl">
             {children}
         </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
