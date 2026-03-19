import React, { Suspense, lazy } from "react";
import MainLayout from "@layouts/MainLayout/MainLayout";
import Hero from "@pages/HomePage/Hero/Hero";

const Marquee = lazy(() => import("@pages/HomePage/Marquee/Marquee"));
const StackCard = lazy(() => import("@pages/HomePage/StackCard/StackCard"));
const CalendarSection = lazy(
  () => import("@pages/HomePage/CalendarSection/CalendarSection"),
);
const FlowSection = lazy(
  () => import("@pages/HomePage/FlowSection/FlowSection"),
);
const CommunitySection = lazy(
  () => import("@pages/HomePage/CommunitySection/CommunitySection"),
);

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero dirender langsung karena ini yang pertama kali dilihat */}
      <Hero />

      <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
        <Marquee />
        <StackCard />
        <CalendarSection />
        <FlowSection />
        <CommunitySection />
      </Suspense>
    </MainLayout>
  );
}
