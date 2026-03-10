export default function LandingPage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; background: #fafaf8; color: #1a1a1a; }
        
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 48px;
          border-bottom: 1px solid #eee;
          background: #fff;
        }
        .logo { font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
        .logo span { color: #888; font-weight: 400; }
        .nav-cta {
          background: #1a1a1a;
          color: #fff;
          padding: 10px 22px;
          border-radius: 6px;
          text-decoration: none;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 14px;
          font-weight: 500;
        }

        .hero {
          max-width: 720px;
          margin: 0 auto;
          padding: 100px 24px 80px;
          text-align: center;
        }
        .hero-badge {
          display: inline-block;
          background: #f0ede8;
          color: #666;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 32px;
        }
        .hero h1 {
          font-size: 52px;
          line-height: 1.15;
          font-weight: 700;
          letter-spacing: -1.5px;
          margin-bottom: 24px;
          color: #111;
        }
        .hero h1 em {
          font-style: italic;
          color: #888;
        }
        .hero p {
          font-size: 18px;
          line-height: 1.7;
          color: #666;
          font-family: 'Helvetica Neue', sans-serif;
          font-weight: 300;
          margin-bottom: 40px;
          max-width: 540px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-cta {
          display: inline-block;
          background: #1a1a1a;
          color: #fff;
          padding: 16px 36px;
          border-radius: 8px;
          text-decoration: none;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 15px;
          font-weight: 500;
          margin-right: 12px;
        }
        .hero-secondary {
          display: inline-block;
          color: #888;
          padding: 16px 24px;
          text-decoration: none;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 15px;
        }

        .features {
          background: #fff;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          padding: 80px 48px;
        }
        .features-grid {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
        }
        .feature-number {
          font-size: 11px;
          font-family: 'Helvetica Neue', sans-serif;
          letter-spacing: 2px;
          color: #bbb;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .feature h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.3px;
        }
        .feature p {
          font-size: 15px;
          line-height: 1.7;
          color: #777;
          font-family: 'Helvetica Neue', sans-serif;
          font-weight: 300;
        }

        .how {
          max-width: 720px;
          margin: 0 auto;
          padding: 80px 24px;
          text-align: center;
        }
        .how h2 {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }
        .how-subtitle {
          font-size: 16px;
          color: #888;
          font-family: 'Helvetica Neue', sans-serif;
          font-weight: 300;
          margin-bottom: 56px;
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          text-align: left;
        }
        .step {
          padding: 28px;
          background: #fafaf8;
          border-radius: 12px;
          border: 1px solid #eee;
        }
        .step-num {
          font-size: 32px;
          font-weight: 700;
          color: #e8e4df;
          margin-bottom: 12px;
          letter-spacing: -1px;
        }
        .step h4 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .step p {
          font-size: 14px;
          color: #888;
          font-family: 'Helvetica Neue', sans-serif;
          font-weight: 300;
          line-height: 1.6;
        }

        .packamor {
          background: #1a1a1a;
          color: #fff;
          padding: 64px 48px;
          text-align: center;
        }
        .packamor h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .packamor p {
          font-size: 16px;
          color: #aaa;
          font-family: 'Helvetica Neue', sans-serif;
          font-weight: 300;
          margin-bottom: 28px;
        }
        .packamor a {
          display: inline-block;
          background: #fff;
          color: #1a1a1a;
          padding: 12px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 14px;
          font-weight: 600;
        }

        .footer {
          padding: 32px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #eee;
        }
        .footer-logo { font-size: 16px; font-weight: 700; }
        .footer p {
          font-size: 13px;
          color: #bbb;
          font-family: 'Helvetica Neue', sans-serif;
        }

        @media (max-width: 768px) {
          nav { padding: 20px 24px; }
          .hero h1 { font-size: 36px; }
          .features { padding: 60px 24px; }
          .features-grid { grid-template-columns: 1fr; gap: 32px; }
          .steps { grid-template-columns: 1fr; }
          .footer { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>

      <nav>
        <div className="logo">Co<span>perfumer</span></div>
        <a href="/auth/login" className="nav-cta">Install on Shopify</a>
      </nav>

      <section className="hero">
        <div className="hero-badge">For Indie Perfumers</div>
        <h1>Sell more perfume.<br /><em>Without discounting.</em></h1>
        <p>
          Coperfumer adds an AI-powered scent quiz to your Shopify store.
          Customers find their perfect fragrance. You capture leads and convert browsers into buyers.
        </p>
        <a href="/auth/login" className="hero-cta">Add to Shopify — Free</a>
        <a href="#how" className="hero-secondary">See how it works →</a>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature">
            <div className="feature-number">01</div>
            <h3>Scent Quiz</h3>
            <p>A beautiful popup quiz that matches customers to your fragrances using AI — no tags, no setup, works instantly.</p>
          </div>
          <div className="feature">
            <div className="feature-number">02</div>
            <h3>Email Capture</h3>
            <p>Every quiz completion is a lead. Customers enter their email before seeing results, growing your list automatically.</p>
          </div>
          <div className="feature">
            <div className="feature-number">03</div>
            <h3>AI Matching</h3>
            <p>Claude AI reads your product descriptions and matches them to each customer's scent profile. No configuration needed.</p>
          </div>
        </div>
      </section>

      <section className="how" id="how">
        <h2>How it works</h2>
        <p className="how-subtitle">Three steps from install to your first lead captured.</p>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h4>Install the app</h4>
            <p>One click install from the Shopify App Store. No code, no theme editing required.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h4>Quiz goes live</h4>
            <p>A floating "Find Your Scent" button appears on your store instantly. Customise colours and text in minutes.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h4>Leads come in</h4>
            <p>Customers take the quiz, enter their email, and get matched to your products. You see every lead in your dashboard.</p>
          </div>
        </div>
      </section>

      <section className="packamor">
        <h2>Need bottles for your brand?</h2>
        <p>Coperfumer is built by Packamor — premium glass perfume bottles for indie perfumers worldwide.</p>
        <a href="https://packamor.com" target="_blank" rel="noreferrer">Browse Packamor →</a>
      </section>

      <footer className="footer">
        <div className="footer-logo">Coperfumer</div>
        <p>Built by <a href="https://packamor.com" style={{color: '#bbb'}}>Packamor</a> · For indie perfumers everywhere</p>
      </footer>
    </>
  );
}