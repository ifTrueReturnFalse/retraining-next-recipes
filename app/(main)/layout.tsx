import HeaderSearch from "@/components/Headers/HeaderSearch/HeaderSearch";
import { SearchProvider } from "../contexts/SearchContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SearchProvider>
        <HeaderSearch />
        <main>{children}</main>
      </SearchProvider>
    </>
  );
}
