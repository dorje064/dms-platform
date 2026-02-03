import Image from 'next/image';
import { Navbar } from '../../components/navbar';

export default function AboutUsPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Header */}
      <header className="page-header">
        <div className="container text-center">
          <h1 className="hero-title text-white">About Us</h1>
          <p className="text-white opacity-80 max-w-2xl mx-auto">
            Learn about our mission, purpose, and commitment to preserving Dharma while supporting education in our community.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container section-padding -mt-10 relative z-10">
        {/* Who We Are */}
        <section className="mb-large">
          <div className="glass-card">
            <div className="card-bg-decoration"></div>
            <h2 className="section-title mb-4">Who We Are</h2>
            <p className="mb-4">
              DMS is a non-political, non-profit community organization founded to rebuild the spiritual and communal bond between our people and the lineage of <strong>Namkha Khyung Dzong</strong>.
            </p>
            <p>
              In earlier times, His Holiness Degyal Rinpoche and Serta Rinpoche personally offered blessings to everyone.
              As generations spread, this connection weakened. DMS was established to restore this bond through shared values and collective effort.
            </p>
          </div>
        </section>

        {/* Our Community */}
        <section className="mb-large">
          <div className="glass-card">
            <h2 className="section-title mb-4 text-center">Our Community</h2>
            <p className="text-center section-description mb-6">
              Meet the dedicated members who make DMS a thriving community of compassion and support.
            </p>

            <div className="community-grid">
              {[
                { id: 1, name: "Community Group", role: "Members", image: "/images/community-1.jpg" },
                { id: 2, name: "Youth Committee", role: "Student Support", image: "/images/community-2.jpg" },
                { id: 3, name: "Leadership Team", role: "Governance", image: "/images/community-3.jpg" },
                { id: 4, name: "Cultural Preservation", role: "Dharma & Tradition", image: "/images/community-1.jpg" },
                { id: 5, name: "Event Organizers", role: "Gatherings", image: "/images/community-2.jpg" },
                { id: 6, name: "Support Network", role: "Community Care", image: "/images/community-3.jpg" },
              ].map((member) => (
                <div key={member.id} className="community-member-card">
                  <div className="community-image-wrapper">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="img-cover"
                    />
                    <div className="community-overlay">
                      <h4 className="community-name">{member.name}</h4>
                      <p className="community-role">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Purpose */}
        <section className="mb-large">
          <div className="glass-card">
            <span className="subtitle">Our Purpose</span>
            <h2 className="section-title mb-4">Why We Exist</h2>
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

            <div className="info-box mt-6">
              <h4>Meaning of DMS</h4>
              <p>
                Named <strong>Degyal Memorial Society</strong> in honor of His Holiness Degyal Rinpoche's guidance,
                compassion, and legacy, which all members deeply respect.
              </p>
            </div>
          </div>
        </section>

        {/* Focus Regions with Images */}
        <section className="mb-large">
          <div className="glass-card">
            <h2 className="section-title mb-4 text-center">Our Focus Regions</h2>
            <p className="text-center section-description mb-6">
              DMS serves students across six beautiful regions, each with its unique heritage and community.
            </p>

            <div className="regions-grid">
              {[
                { id: 1, name: "Yultsho Dhun", image: "/images/region-yultsho.jpg", description: "Traditional highland village" },
                { id: 2, name: "Drukchu Lung", image: "/images/region-drukchu.jpg", description: "Riverside community" },
                { id: 3, name: "Nyin", image: "/images/region-nyin.jpg", description: "Mountain settlement" },
                { id: 4, name: "Chang", image: "/images/region-chang.jpg", description: "Historic village center" },
                { id: 5, name: "Limi", image: "/images/region-limi.jpg", description: "Remote mountain valley" },
                { id: 6, name: "Bhalu-Drukpa", image: "/images/region-bhalu.jpg", description: "Shi, Sum, Chungnyi villages" },
              ].map((region) => (
                <div key={region.id} className="region-card">
                  <div className="region-image-wrapper">
                    <Image
                      src={region.image}
                      alt={region.name}
                      fill
                      className="img-cover"
                    />
                    <div className="region-overlay">
                      <h4 className="region-name">{region.name}</h4>
                    </div>
                  </div>
                  <div className="region-info">
                    <p className="region-description">{region.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance & Model */}
        <section className="mb-large">
          <div className="glass-card">
            <h2 className="section-title text-center mb-6">Governance & Model</h2>

            <div className="grid-2 gap-6">
              {/* Principles */}
              <div className="principles-wrapper">
                <h3 className="mb-4">Core Guidelines</h3>
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
            <div className="gatherings-section mt-8">
              <h3 className="text-center heading-md mb-6">Annual Gatherings</h3>
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
        <section className="mb-large">
          <div className="glass-card text-center">
            <h2 className="section-title mb-4">Future Vision: Interest-Free Loans</h2>
            <p className="future-text mb-4">
              As DMS grows, we plan to offer interest-free loans to students from economically disadvantaged families,
              orphans, and those in difficult circumstances. Repayments will fund future students—creating a cycle of support.
            </p>
            <div className="badge-pill">
              Sustainable Community Support Model
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer mt-auto">
        <div className="container text-center pt-8 pb-8">
          <p className="small-text opacity-50">&copy; {new Date().getFullYear()} Degyal Memorial Society. All rights reserved.</p>
          <p className="small-text opacity-50">A non-political, non-profit community initiative.</p>
        </div>
      </footer>
    </div>
  );
}
