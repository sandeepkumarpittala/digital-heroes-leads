// ============================================
// src/components/landing/HeroSection.jsx
// Modern SaaS-style hero section for the Landing Page
//
// Props:
// - onCtaClick: function — called when CTA button is clicked
//   (e.g. scrolls down to the Lead Form)
// ============================================

import Button from '../common/Button.jsx';

const HeroSection = ({ onCtaClick }) => {
  return (
    <section className="w-full px-6 py-20 sm:py-28 bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* Eyebrow tag */}
        <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wide text-indigo-600 bg-indigo-100 rounded-full">
          LeadDesk for Growing Businesses
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
          Turn Every Visitor Into a
          <span className="text-indigo-600"> Qualified Lead</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
          Share a few details about your project and budget, and our team
          will get back to you with a tailored plan — no calls, no pressure,
          just a quick conversation to get started.
        </p>

        {/* Call to action */}
        <div className="mt-10 flex justify-center">
          <Button variant="primary" onClick={onCtaClick} className="px-8 py-3 text-base">
            Get Started — It's Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;