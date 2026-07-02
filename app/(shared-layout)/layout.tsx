
import Navbar from "@/components/web/Navbar";
import { ReactNode } from "react";
// shared-layout 分组 共享布局，用于在多个页面中共享相同的布局
export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
