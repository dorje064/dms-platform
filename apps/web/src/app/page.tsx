import Image from 'next/image';

export default function Page() {
  return (
    <div className="page-wrapper">
      {/* Navigation */}
      <nav className="navbar glass-effect">
        <div className="container nav-container">
          <div className="logo-group">
            <div className="logo-wrapper">
              <Image
                src="/images/logo.jpg"
                alt="DMS Logo"
                fill
                className="img-cover"
              />
            </div>
            <span className="brand-name">DMS</span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#purpose">Purpose</a>
            <a href="#objectives">Objectives</a>
            <a href="#support">Support</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#join" className="btn btn-sm">Join Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg-accent"></div>
        <div className="hero-bg-accent-2"></div>

        <div className="container hero-content animate-fade-in">
          <div className="hero-logo animate-float">
            <Image
              src="/images/rinpoche.jpg"
              alt="His Holiness Degyal Rinpoche"
              fill
              className="img-cover"
              priority
            />
          </div>
          <h1 className="hero-title">
            Degyal Memorial Society
          </h1>
          <p className="hero-tagline">
            Preserving Dharma, Supporting Education, Strengthening Community
          </p>
          <div className="hero-description">
            Reconnecting younger generations with the spiritual lineage of His Holiness Degyal Rinpoche,
            while supporting students in their educational journey.
          </div>
          <div className="hero-actions">
            <a href="#about" className="btn">Our Mission</a>
            <a href="#support" className="btn btn-outline">Student Support</a>
          </div>
        </div>
      </header>

      {/* Cultural Greeting */}
      <section className="greeting-section">
        <div className="container">
          <div className="glass-card text-center greeting-card">
            <h2 className="greeting-title">"Khamsang and Tashi Delek"</h2>
            <p className="greeting-text">
              We extend our warm greetings to all members, students, parents, and well-wishers of Degyal Memorial Society.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container grid-2">
          <div className="about-card-featured">
            <div className="card-bg-decoration"></div>
            <h3>Who We Are</h3>
            <p>
              DMS is a non-political, non-profit community organization founded to rebuild the spiritual and communal bond between our people and the lineage of <strong>Namkha Khyung Dzong</strong>.
            </p>
            <p>
              In earlier times, His Holiness Degyal Rinpoche and Serta Rinpoche personally offered blessings to everyone.
              As generations spread, this connection weakened. DMS was established to restore this bond through shared values and collective effort.
            </p>
          </div>

          <div id="purpose" className="purpose-wrapper">
            <div>
              <span className="subtitle">Our Purpose</span>
              <h2 className="section-title">Why We Exist</h2>
              <ul className="list-styled">
                {[
                  "Rebuild spiritual connections with the lineage of Degyal Rinpoche",
                  "Support young students during formative years",
                  "Preserve Dharma, tradition, and community unity",
                  "Move forward as a compassionate society"
                ].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="info-box">
              <h4>Meaning of DMS</h4>
              <p>
                Named <strong>Degyal Memorial Society</strong> in honor of His Holiness Degyal Rinpoche's guidance,
                compassion, and legacy, which all members deeply respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section - Education */}
      <section id="objectives" className="objectives-section">
        <div className="pattern-overlay"></div>
        <div className="container relative">
          <div className="text-center mb-large">
            <span className="subtitle-light">Core Mission</span>
            <h2 className="section-title-light">Supporting Education & Community</h2>
          </div>

          <div className="grid-3">
            {/* Regions */}
            <div className="glass-card-dark">
              <h3 className="card-title-light">Focus Regions</h3>
              <ul className="list-simple-light">
                {['Yultsho Dhun', 'Drukchu Lung', 'Nyin', 'Chang', 'Limi', 'Bhalu-Drukpa (Shi, Sum, Chungnyi)'].map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Aid Type */}
            <div className="glass-card-dark highlight-card">
              <div className="icon-circle">
                <span>🎓</span>
              </div>
              <h3 className="card-title-light">Educational Support</h3>
              <p className="text-sm-light mb-4">
                Providing modest yet meaningful financial assistance to students pursuing:
              </p>
              <ul className="list-bullets-light">
                <li>+2 (10+2) Education</li>
                <li>Bachelor-level Education</li>
              </ul>
              <p className="region-note">
                Within Nepal
              </p>
            </div>

            {/* Cultural Goals */}
            <div className="glass-card-dark">
              <h3 className="card-title-light">Beyond Finance</h3>
              <p className="text-sm-light mb-4">DMS also works to:</p>
              <ul className="list-icons-light">
                <li><span>☸</span> Serve the Dharma</li>
                <li><span>🏛</span> Preserve Culture</li>
                <li><span>🤝</span> Strengthen Unity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Governance */}
      <section id="support" className="section-padding">
        <div className="container">
          <h2 className="section-title text-center mb-large">Governance & Model</h2>

          <div className="grid-2">
            {/* Principles */}
            <div className="principles-wrapper">
              <h3>Core Guidelines</h3>
              <div className="rules-grid">
                {[
                  { title: "Non-Political", desc: "DMS will not engage in any political matters." },
                  { title: "Independent", desc: "No formal affiliation with NGOs/INGOs, though personal support is welcome." },
                  { title: "Member Contribution", desc: "Minimum NPR 50/year. A symbolic contribution to encourage responsibility." },
                ].map((rule, i) => (
                  <div key={i} className="rule-card">
                    <div className="rule-line"></div>
                    <div>
                      <h4>{rule.title}</h4>
                      <p>{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Finances */}
            <div className="glass-card finance-card">
              <h3 className="finance-title">Annual Funding Support</h3>
              <div className="total-fund-box">
                <p className="label-sm">Total Annual Grant</p>
                <div className="fund-amount">NPR 1,500,000</div>
                <p className="fund-source">Provided personally by Kyabje III Degyal Orgen Choedak Rinpoche</p>
              </div>

              <div className="fund-breakdown">
                <div className="breakdown-item">
                  <div className="amt green">10 Lakhs</div>
                  <div className="desc">Student Distribution</div>
                </div>
                <div className="breakdown-item">
                  <div className="amt orange">5 Lakhs</div>
                  <div className="desc">Org & Gathering Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gatherings Timeline */}
          <div className="gatherings-section">
            <h3 className="text-center heading-md mb-medium">Annual Gatherings</h3>
            <div className="grid-3">
              {[
                { title: "Community Service", desc: "Social work and giving back to society." },
                { title: "Cultural & Sports", desc: "Football, programs, and entertainment with elders." },
                { title: "Annual Celebration", desc: "Held at Namkha Khyung Dzong Rigzin Choeling Monastery. Honoring past contributors." }
              ].map((event, i) => (
                <div key={i} className="event-card">
                  <div className="event-badge">
                    {i + 1}
                  </div>
                  <h4>{event.title}</h4>
                  <p>{event.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="future-section">
        <div className="container text-center">
          <h2>Future Vision: Interest-Free Loans</h2>
          <p className="future-text">
            As DMS grows, we plan to offer interest-free loans to students from economically disadvantaged families,
            orphans, and those in difficult circumstances. Repayments will fund future students—creating a cycle of support.
          </p>
          <div className="badge-pill">
            Sustainable Community Support Model
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="contact" className="footer">
        <div className="container text-center">
          <div className="footer-logo">
            <Image
              src="/images/logo.jpg"
              alt="DMS Logo"
              fill
              className="img-cover"
            />
          </div>
          <h2 className="footer-title">Degyal Memorial Society</h2>
          <p className="footer-quote">
            "With collective effort, mutual care, and sincere intention, we believe DMS will achieve meaningful and lasting results."
          </p>

          <div className="footer-actions">
            <button className="btn">Contact Us</button>
            <button className="btn btn-outline-light">
              Join Society
            </button>
          </div>

          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Degyal Memorial Society. All rights reserved.</p>
            <p className="small-text">A non-political, non-profit community initiative.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
