import DashboardLayout from "@/components/DashboardLayout";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
