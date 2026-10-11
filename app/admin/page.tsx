import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";
import "./admin.css";

export const metadata: Metadata = {
  title: "Portfolio admin",
  // Keep the console out of search results.
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
