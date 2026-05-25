import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />

      <main className="mt-16 flex-1 xs:px-0 sm:px-4 lg:px-20">
        {children}
      </main>

      <Footer />
    </div>
  );
}