import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialFloat from "@/components/SocialFloat";
import SiteInteractions from "@/components/SiteInteractions";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <SocialFloat />
      <SiteInteractions />
    </>
  );
}
