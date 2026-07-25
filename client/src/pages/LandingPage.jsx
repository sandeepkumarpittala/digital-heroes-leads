// ============================================
// src/pages/LandingPage.jsx
// Public Landing Page — combines HeroSection + LeadForm
//
// No business logic or API calls here — this page is purely
// a layout/composition layer. All form logic lives in LeadForm.
// ============================================

import { useRef } from 'react';
import HeroSection from '../components/landing/HeroSection.jsx';
import LeadForm from '../components/landing/LeadForm.jsx';

const LandingPage = () => {
  // Ref used to smoothly scroll down to the Lead Form
  // when the Hero's CTA button is clicked
  const leadFormRef = useRef(null);

  const scrollToForm = () => {
    leadFormRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero section with CTA that scrolls down to the form */}
      <HeroSection onCtaClick={scrollToForm} />

      {/* Lead Form section */}
      <section
        ref={leadFormRef}
        className="w-full px-6 pb-24 sm:pb-32"
      >
        <LeadForm />
      </section>
    </main>
  );
};

export default LandingPage;