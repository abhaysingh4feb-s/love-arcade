import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — 9 Levels of Us",
  description:
    "Track your progress through 9 romantic mini-games. Unlock levels, complete challenges, and celebrate your love story in the Love Arcade.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
