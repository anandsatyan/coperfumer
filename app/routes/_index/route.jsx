import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "✦",
      title: "AI Scent Quiz",
      desc: "A floating quiz that matches browsers to your best fragrances — powered by Claude AI. Zero setup. Works the moment you install.",
      tag: "Core",
    },
    {
      icon: "◈",
      title: "Email Lead Capture",
      desc: "Every quiz completion grows your list. Customers reveal their email before seeing their matches — frictionless, converting, powerful.",
      tag: "Growth",
    },
    {
      icon: "⬡",
      title: "Fragrance Description AI",
      desc: "Input your notes. Get three versions of soul-stirring copy — poetic, minimal, technical. SEO-optimised, ready to publish.",
      tag: "Content",
    },
    {
      icon: "◎",
      title: "Sample Conversion Flow",
      desc: "Track sample buyers. Trigger automated follow-ups at the perfect moment. Turn testers into loyalists with a single campaign.",
      tag: "Retention",
    },
    {
      icon: "⟡",
      title: "Batch & Compliance",
      desc: "Track batches, cure dates, and IFRA compliance across your entire range. One dashboard. No spreadsheets. Export-ready.",
      tag: "Operations",
    },
    {
      icon: "◇",
      title: "Wholesale Portal",
      desc: "A trade-facing storefront with MOQ controls, tiered pricing, and auto-generated catalog PDFs. Built for growth.",
      tag: "B2B",
    },
  ];

  const testimonials = [
    {
      quote: "My email list grew by 340 subscribers in the first month. The quiz does the work I never had time for.",
      name: "Sasha R.",
      brand: "Founder, Éclat Parfums",
    },
    {
      quote: "Customers finally understand my fragrances before buying. Returns dropped. Repeat orders doubled.",
      name: "Marcus T.",
      brand: "Indie Perfumer, NYC",
    },
    {
      quote: "I went from 2 wholesale accounts to 11 in three months. The catalog tool alone is worth it.",
      name: "Priya N.",
      brand: "Owner, Velvet Atelier",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Corben:wght@400;700&family=Manrope:wght@300;400;500;600;700;800&display=swap');

        :root {
          --maroon: #6B1A2A;
          --maroon-deep: #4A0F1C;
          --maroon-light: #8B2438;
          --gold: #C9A84C;
          --gold-light: #E4C87A;
          --gold-pale: #F5E9C8;
          --cream: #FBF7F0;
          --ink: #1A0A0E;
          --mist: #F0EAE0;
          --text-sub: #7A5C62;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          font-family: 'Manrope', sans-serif;
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
        }

        h1, h2, h3, h4 {
          font-family: 'Corben', serif;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 56px;
          transition: all 0.4s ease;
          background: transparent;
        }
        nav.scrolled {
          background: rgba(251, 247, 240, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201, 168, 76, 0.2);
          padding: 14px 56px;
        }
        .logo {
          font-family: 'Corben', serif;
          font-size: 22px;
          color: var(--maroon);
          letter-spacing: -0.5px;
        }
        .logo span { color: var(--gold); }
        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav-links a {
          font-size: 13px;
          font-weight: 500;
          color: var(--maroon);
          text-decoration: none;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .nav-links a:hover { opacity: 1; }
        .nav-cta {
          background: var(--maroon);
          color: var(--gold-light) !important;
          padding: 10px 24px !important;
          border-radius: 4px;
          opacity: 1 !important;
          font-weight: 600 !important;
          transition: background 0.2s !important;
        }
        .nav-cta:hover { background: var(--maroon-deep) !important; }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107, 26, 42, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(201, 168, 76, 0.06) 0%, transparent 60%);
        }

        .hero-ornament {
          position: absolute;
          top: 15%;
          left: 8%;
          width: 1px;
          height: 120px;
          background: linear-gradient(to bottom, transparent, var(--gold), transparent);
          opacity: 0.4;
        }
        .hero-ornament-r {
          position: absolute;
          top: 20%;
          right: 10%;
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, var(--gold), transparent);
          opacity: 0.3;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--maroon);
          color: var(--gold-light);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 2px;
          margin-bottom: 40px;
          animation: fadeUp 0.8s ease both;
        }
        .hero-badge::before {
          content: '✦';
          font-size: 8px;
        }

        .hero h1 {
          font-size: clamp(48px, 7vw, 88px);
          line-height: 1.05;
          letter-spacing: -2px;
          color: var(--maroon-deep);
          margin-bottom: 12px;
          animation: fadeUp 0.8s ease 0.1s both;
        }
        .hero h1 .gold { color: var(--gold); }
        .hero h1 .italic { font-style: italic; }

        .hero-sub {
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.7;
          color: var(--text-sub);
          font-weight: 400;
          max-width: 560px;
          margin: 24px auto 48px;
          animation: fadeUp 0.8s ease 0.2s both;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeUp 0.8s ease 0.3s both;
        }
        .btn-primary {
          background: var(--maroon);
          color: var(--gold-light);
          padding: 16px 40px;
          border-radius: 4px;
          text-decoration: none;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          transition: all 0.2s;
          border: 2px solid var(--maroon);
        }
        .btn-primary:hover {
          background: var(--maroon-deep);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(107, 26, 42, 0.25);
        }
        .btn-outline {
          background: transparent;
          color: var(--maroon);
          padding: 16px 40px;
          border-radius: 4px;
          text-decoration: none;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          border: 2px solid rgba(107, 26, 42, 0.2);
          transition: all 0.2s;
        }
        .btn-outline:hover {
          border-color: var(--maroon);
          background: rgba(107, 26, 42, 0.04);
        }

        .hero-stats {
          display: flex;
          gap: 56px;
          margin-top: 80px;
          justify-content: center;
          animation: fadeUp 0.8s ease 0.4s both;
        }
        .stat {
          text-align: center;
        }
        .stat-num {
          font-family: 'Corben', serif;
          font-size: 36px;
          color: var(--maroon);
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-num span { color: var(--gold); }
        .stat-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-sub);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .stat-divider {
          width: 1px;
          background: rgba(201, 168, 76, 0.3);
          align-self: stretch;
        }

        /* MARQUEE */
        .marquee-wrap {
          background: var(--maroon);
          padding: 16px 0;
          overflow: hidden;
          border-top: 1px solid rgba(201, 168, 76, 0.2);
          border-bottom: 1px solid rgba(201, 168, 76, 0.2);
        }
        .marquee-track {
          display: flex;
          gap: 0;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 0 32px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold-light);
        }
        .marquee-dot { color: var(--gold); opacity: 0.5; }

        /* PROBLEM SECTION */
        .problem {
          padding: 100px 56px;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .section-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
        }
        .problem h2 {
          font-size: clamp(32px, 4vw, 48px);
          line-height: 1.15;
          letter-spacing: -1px;
          color: var(--maroon-deep);
          margin-bottom: 24px;
        }
        .problem p {
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-sub);
          font-weight: 400;
          margin-bottom: 16px;
        }
        .problem-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .problem-card {
          background: #fff;
          border: 1px solid rgba(107, 26, 42, 0.08);
          border-left: 3px solid var(--gold);
          padding: 20px 24px;
          border-radius: 4px;
        }
        .problem-card h4 {
          font-family: 'Corben', serif;
          font-size: 16px;
          color: var(--maroon);
          margin-bottom: 6px;
        }
        .problem-card p {
          font-size: 14px;
          color: var(--text-sub);
          margin: 0;
          line-height: 1.6;
        }

        /* FEATURES */
        .features-section {
          background: var(--maroon-deep);
          padding: 100px 56px;
          position: relative;
          overflow: hidden;
        }
        .features-section::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08), transparent 70%);
        }
        .features-header {
          text-align: center;
          margin-bottom: 72px;
        }
        .features-header .section-label { color: var(--gold); }
        .features-header h2 {
          font-size: clamp(32px, 4vw, 52px);
          color: #fff;
          letter-spacing: -1.5px;
          line-height: 1.1;
        }
        .features-header h2 span { color: var(--gold); }
        .features-header p {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
          margin-top: 16px;
          font-weight: 400;
        }

        .features-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201, 168, 76, 0.1);
          padding: 40px 32px;
          transition: all 0.3s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(201, 168, 76, 0.3);
          transform: translateY(-2px);
        }
        .feature-card.active {
          background: rgba(201, 168, 76, 0.08);
          border-color: rgba(201, 168, 76, 0.4);
        }
        .feature-icon {
          font-size: 24px;
          color: var(--gold);
          margin-bottom: 16px;
          display: block;
        }
        .feature-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(201, 168, 76, 0.1);
          padding: 3px 10px;
          border-radius: 2px;
          margin-bottom: 14px;
        }
        .feature-card h3 {
          font-size: 20px;
          color: #fff;
          margin-bottom: 12px;
          letter-spacing: -0.3px;
        }
        .feature-card p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          font-weight: 400;
        }

        /* HOW IT WORKS */
        .how-section {
          padding: 100px 56px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .how-header {
          text-align: center;
          margin-bottom: 72px;
        }
        .how-header h2 {
          font-size: clamp(32px, 4vw, 52px);
          color: var(--maroon-deep);
          letter-spacing: -1.5px;
        }
        .how-header p {
          font-size: 16px;
          color: var(--text-sub);
          margin-top: 16px;
        }
        .steps-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }
        .steps-row::before {
          content: '';
          position: absolute;
          top: 28px;
          left: 12%;
          right: 12%;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), var(--gold), transparent);
          opacity: 0.3;
        }
        .step {
          padding: 0 24px;
          text-align: center;
        }
        .step-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--maroon);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-family: 'Corben', serif;
          font-size: 18px;
          color: var(--gold-light);
          position: relative;
          z-index: 1;
          border: 2px solid rgba(201, 168, 76, 0.3);
        }
        .step h4 {
          font-size: 16px;
          color: var(--maroon-deep);
          margin-bottom: 10px;
        }
        .step p {
          font-size: 13px;
          color: var(--text-sub);
          line-height: 1.6;
          font-weight: 400;
        }

        /* TESTIMONIALS */
        .testimonials {
          background: var(--mist);
          padding: 100px 56px;
          border-top: 1px solid rgba(201, 168, 76, 0.15);
          border-bottom: 1px solid rgba(201, 168, 76, 0.15);
        }
        .testimonials-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .testimonials-header h2 {
          font-size: clamp(28px, 3.5vw, 44px);
          color: var(--maroon-deep);
          letter-spacing: -1px;
        }
        .testimonials-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .testimonial-card {
          background: #fff;
          border: 1px solid rgba(107, 26, 42, 0.08);
          border-radius: 8px;
          padding: 36px;
          position: relative;
        }
        .testimonial-card::before {
          content: '"';
          font-family: 'Corben', serif;
          font-size: 80px;
          color: var(--gold);
          opacity: 0.15;
          position: absolute;
          top: 12px;
          left: 24px;
          line-height: 1;
        }
        .testimonial-quote {
          font-size: 15px;
          line-height: 1.8;
          color: var(--ink);
          font-weight: 400;
          margin-bottom: 24px;
          font-style: italic;
        }
        .testimonial-author strong {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: var(--maroon);
        }
        .testimonial-author span {
          font-size: 12px;
          color: var(--text-sub);
        }

        /* PACKAMOR BAND */
        .packamor-band {
          background: linear-gradient(135deg, var(--maroon-deep) 0%, var(--maroon) 100%);
          padding: 80px 56px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .packamor-band::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .packamor-band h2 {
          font-size: clamp(28px, 3.5vw, 44px);
          color: #fff;
          letter-spacing: -1px;
          margin-bottom: 16px;
          position: relative;
        }
        .packamor-band p {
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          max-width: 480px;
          margin: 0 auto 36px;
          font-weight: 400;
          line-height: 1.7;
          position: relative;
        }
        .packamor-band a {
          display: inline-block;
          background: var(--gold);
          color: var(--maroon-deep);
          padding: 14px 36px;
          border-radius: 4px;
          text-decoration: none;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.5px;
          transition: all 0.2s;
          position: relative;
        }
        .packamor-band a:hover {
          background: var(--gold-light);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        /* PRICING */
        .pricing {
          padding: 100px 56px;
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        .pricing h2 {
          font-size: clamp(32px, 4vw, 52px);
          color: var(--maroon-deep);
          letter-spacing: -1.5px;
          margin-bottom: 12px;
        }
        .pricing-sub {
          font-size: 16px;
          color: var(--text-sub);
          margin-bottom: 56px;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          text-align: left;
        }
        .pricing-card {
          border: 1px solid rgba(107, 26, 42, 0.1);
          border-radius: 8px;
          padding: 40px 32px;
          background: #fff;
        }
        .pricing-card.featured {
          background: var(--maroon);
          border-color: var(--maroon);
          position: relative;
          transform: scale(1.03);
        }
        .pricing-card.featured::before {
          content: 'Most Popular';
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gold);
          color: var(--maroon-deep);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 16px;
          border-radius: 20px;
        }
        .plan-name {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
        }
        .plan-price {
          font-family: 'Corben', serif;
          font-size: 48px;
          color: var(--maroon-deep);
          line-height: 1;
          margin-bottom: 4px;
        }
        .pricing-card.featured .plan-price { color: #fff; }
        .plan-price sup { font-size: 20px; vertical-align: top; margin-top: 12px; }
        .plan-price sub { font-size: 14px; font-family: 'Manrope', sans-serif; font-weight: 400; }
        .plan-desc {
          font-size: 13px;
          color: var(--text-sub);
          margin: 16px 0 24px;
          line-height: 1.6;
        }
        .pricing-card.featured .plan-desc { color: rgba(255,255,255,0.6); }
        .plan-features {
          list-style: none;
          margin-bottom: 32px;
        }
        .plan-features li {
          font-size: 13px;
          color: var(--ink);
          padding: 8px 0;
          border-bottom: 1px solid rgba(107, 26, 42, 0.06);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 400;
        }
        .pricing-card.featured .plan-features li {
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.1);
        }
        .plan-features li::before {
          content: '✓';
          color: var(--gold);
          font-weight: 700;
          flex-shrink: 0;
        }
        .plan-cta {
          display: block;
          text-align: center;
          padding: 13px;
          border-radius: 4px;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
          border: 2px solid var(--maroon);
          color: var(--maroon);
        }
        .pricing-card.featured .plan-cta {
          background: var(--gold);
          color: var(--maroon-deep);
          border-color: var(--gold);
        }
        .plan-cta:hover {
          background: var(--maroon);
          color: #fff;
        }
        .pricing-card.featured .plan-cta:hover {
          background: var(--gold-light);
        }

        /* CTA SECTION */
        .final-cta {
          padding: 100px 56px;
          text-align: center;
          background: var(--cream);
        }
        .final-cta h2 {
          font-size: clamp(36px, 5vw, 64px);
          color: var(--maroon-deep);
          letter-spacing: -2px;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        .final-cta h2 .gold { color: var(--gold); }
        .final-cta p {
          font-size: 16px;
          color: var(--text-sub);
          max-width: 440px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }

        /* FOOTER */
        footer {
          background: var(--ink);
          padding: 48px 56px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-logo {
          font-family: 'Corben', serif;
          font-size: 18px;
          color: #fff;
        }
        .footer-logo span { color: var(--gold); }
        .footer-links {
          display: flex;
          gap: 24px;
        }
        .footer-links a {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--gold); }
        .footer-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
        }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          nav { padding: 16px 24px; }
          nav.scrolled { padding: 12px 24px; }
          .nav-links { display: none; }
          .problem { grid-template-columns: 1fr; padding: 60px 24px; gap: 40px; }
          .features-section { padding: 60px 24px; }
          .features-grid { grid-template-columns: 1fr; }
          .how-section { padding: 60px 24px; }
          .steps-row { grid-template-columns: 1fr 1fr; gap: 32px; }
          .steps-row::before { display: none; }
          .testimonials { padding: 60px 24px; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .pricing { padding: 60px 24px; }
          .pricing-grid { grid-template-columns: 1fr; }
          .pricing-card.featured { transform: none; }
          .final-cta { padding: 60px 24px; }
          footer { flex-direction: column; gap: 16px; text-align: center; padding: 32px 24px; }
          .footer-links { flex-wrap: wrap; justify-content: center; }
          .packamor-band { padding: 60px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="logo">Co<span>perfumer</span></div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="https://packamor.com" target="_blank" rel="noreferrer">Packamor</a></li>
          <li><a href="/auth/login" className="nav-cta">Install Free</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-ornament" />
        <div className="hero-ornament-r" />
        <div className="hero-badge">The #1 Marketing Platform for Perfume Brands</div>
        <h1>
          Turn Browsers Into<br />
          <span className="gold italic">Loyal Fragrance</span><br />
          Collectors.
        </h1>
        <p className="hero-sub">
          Coperfumer is the only Shopify app built exclusively for indie perfumers and fragrance brands. AI-powered scent matching, email capture, compliance tools — everything you need to grow.
        </p>
        <div className="hero-actions">
          <a href="/auth/login" className="btn-primary">Add to Shopify — It's Free</a>
          <a href="#features" className="btn-outline">Explore Features</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">3<span>x</span></div>
            <div className="stat-label">Higher Conversion</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-num">60<span>%</span></div>
            <div className="stat-label">Quiz Completion Rate</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-num">0</div>
            <div className="stat-label">Setup Required</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{display:'inline-flex'}}>
              {["Scent Quiz", "Email Capture", "AI Matching", "Sample Flows", "IFRA Compliance", "Wholesale Portal", "Batch Tracking", "Brand Analytics", "Description AI", "Launch Planner"].map((item, j) => (
                <span key={j} className="marquee-item">
                  {item} <span className="marquee-dot">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section className="problem">
        <div>
          <span className="section-label">The Problem</span>
          <h2>You can't sell perfume the way other products are sold.</h2>
          <p>Customers can't smell through a screen. Your fragrances deserve more than a product photo and a description nobody reads.</p>
          <p>Indie perfumers lose sales every day because browsers leave overwhelmed, uncertain, or simply uninspired. Coperfumer changes that.</p>
        </div>
        <div className="problem-cards">
          {[
            { title: "You can't smell through a screen", desc: "Generic Shopify stores give customers nothing to connect with. The experience ends at a product photo." },
            { title: "Your email list isn't growing", desc: "Popups are ignored. Discounts cheapen your brand. There's no elegant way to capture fragrance leads." },
            { title: "Manual operations slow you down", desc: "IFRA compliance, batch tracking, wholesale pricing — all managed in spreadsheets you don't have time for." },
          ].map((card, i) => (
            <div key={i} className="problem-card">
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="features-header">
          <span className="section-label">Everything You Need</span>
          <h2>Built for <span>fragrance brands.</span><br />Nothing else.</h2>
          <p>Six powerful tools. One Shopify app. Zero compromises.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className={`feature-card ${activeFeature === i ? "active" : ""}`} onMouseEnter={() => setActiveFeature(i)}>
              <span className="feature-icon">{f.icon}</span>
              <span className="feature-tag">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="how-header">
          <span className="section-label">How It Works</span>
          <h2>From install to first lead in minutes.</h2>
          <p>No developers. No theme editing. No configuration required.</p>
        </div>
        <div className="steps-row">
          {[
            { n: "1", title: "Install the App", desc: "One click from the Shopify App Store. Coperfumer installs in under 60 seconds." },
            { n: "2", title: "Customise Your Quiz", desc: "Set your brand colours, button text, and quiz title. Takes three minutes." },
            { n: "3", title: "Quiz Goes Live", desc: "A floating 'Find Your Scent' button appears on your store immediately." },
            { n: "4", title: "Leads Come In", desc: "Customers get matched to your fragrances. You see every lead in your dashboard." },
          ].map((s, i) => (
            <div key={i} className="step">
              <div className="step-circle">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testimonials-header">
          <span className="section-label">From the Community</span>
          <h2>Perfumers who grow with Coperfumer.</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.brand}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAMOR BAND */}
      <section className="packamor-band">
        <h2>Need bottles for your growing brand?</h2>
        <p>Coperfumer is built by Packamor — the trusted source of premium glass perfume bottles for indie perfumers worldwide.</p>
        <a href="https://packamor.com" target="_blank" rel="noreferrer">Browse Packamor Bottles →</a>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <span className="section-label">Simple Pricing</span>
        <h2>Grow at your own pace.</h2>
        <p className="pricing-sub">Start free. Upgrade when you're ready. No hidden fees.</p>
        <div className="pricing-grid">
          {[
            {
              name: "Starter",
              price: "0",
              desc: "Perfect for perfumers just launching their brand.",
              features: ["Scent Quiz (100 responses/mo)", "Email Capture", "AI Matching", "Powered by Coperfumer badge"],
              cta: "Start Free",
              featured: false,
            },
            {
              name: "Grow",
              price: "29",
              desc: "For brands serious about building their audience.",
              features: ["Unlimited quiz responses", "Email flows & automation", "Description AI", "Sample conversion tracking", "Remove Coperfumer branding"],
              cta: "Start Growing",
              featured: true,
            },
            {
              name: "Scale",
              price: "79",
              desc: "For established brands scaling to wholesale.",
              features: ["Everything in Grow", "IFRA compliance checker", "Batch & expiry tracking", "Wholesale portal", "Dedicated Packamor account"],
              cta: "Start Scaling",
              featured: false,
            },
          ].map((plan, i) => (
            <div key={i} className={`pricing-card ${plan.featured ? "featured" : ""}`}>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <sup>$</sup>{plan.price}<sub>/mo</sub>
              </div>
              <p className="plan-desc">{plan.desc}</p>
              <ul className="plan-features">
                {plan.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <a href="/auth/login" className="plan-cta">{plan.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>Your fragrances deserve<br />to be <span className="gold">discovered.</span></h2>
        <p>Join indie perfumers worldwide using Coperfumer to grow their brand, capture leads, and sell more — without discounting.</p>
        <a href="/auth/login" className="btn-primary">Add to Shopify — Free Forever</a>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Co<span>perfumer</span></div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="https://packamor.com" target="_blank" rel="noreferrer">Packamor</a>
          <a href="https://www.instagram.com/packamorhq/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <div className="footer-copy">© 2026 Coperfumer by Packamor</div>
      </footer>
    </>
  );
}