import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      {children}
      <SiteFooter />
    </>
  );
}
