import HeaderSearch from "@/components/Headers/HeaderSearch/HeaderSearch";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderSearch />
      <main>{children}</main>
    </>
  );
}
