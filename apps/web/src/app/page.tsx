import Image from 'next/image';

import { Navbar } from '../components/navbar';

// Placeholder data for Top Donors - Replace with real data
const TOP_DONORS = [
  {
    id: 1,
    name: "Tsering Ngetup Lama",
    amount: "NPR 25,005",
    image: "/images/donors/tsering-ngutup.jpeg",
    location: "Nyin",
    message: "Supporting education and preserving our cultural heritage."
  },
  {
    id: 2,
    name: "Norbu Angdu Lama",
    amount: "NPR 20,000",
    image: "/images/donors/nurbu-wangdu.jpeg",
    location: "Nyin",
    message: "Committed to helping students achieve their dreams."
  },
  {
    id: 3,
    name: "Chhapal Dorje",
    amount: "NPR 15,500",
    image: "/images/donor-placeholder-3.jpg",
    location: "Namkha",
    message: "Honoring the legacy of His Holiness Degyal Rinpoche."
  },
  {
    id: 4,
    name: "Lakha Thapa",
    amount: "NPR 15,500",
    image: "/images/donor-placeholder-1.jpg",
    location: "Namkha",
    message: "Dedicated to empowering future generations through education."
  },
  {
    id: 5,
    name: "Kunchong Tashi",
    amount: "NPR 15,005",
    image: "/images/donors/kunsang-tashi.jpeg",
    location: "Nyin",
    message: "Investing in the future of our community's youth."
  },
  {
    id: 6,
    name: "Pema Mugtup",
    amount: "NPR 15,005",
    image: "/images/donors/pama-mugtup.jpeg",
    location: "Nyin",
    message: "Investing in the future of our community's youth."
  },
  {
    id: 7,
    name: "Chhakka Bahadhur Lama",
    amount: "NPR 15,005",
    image: "/images/donors/chhakka-bahadur.jpeg",
    location: "Nyin",
    message: "Investing in the future of our community's youth."
  }
];

export default function Page() {
  return (
    <div className="page-wrapper">
      <Navbar />

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
            <a href="/about-us" className="btn">Our Mission</a>
            <a href="/students" className="btn btn-outline">Student Support</a>
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

      {/* Top Donors Section */}
      <section id="donor" className="section-padding">
        <div className="container">
          <div className="text-center mb-large">
            <span className="subtitle">Gratitude</span>
            <h2 className="section-title">Top Donors</h2>
            <p className="section-description">
              We are deeply grateful to our generous donors who make our mission possible.
            </p>
          </div>

          <div className="donors-horizontal-scroll">
            {TOP_DONORS.map((donor) => (
              <div key={donor.id} className="donor-card-compact">
                <div className="donor-image-circle">
                  <Image
                    src={donor.image}
                    alt={donor.name}
                    fill
                    className="img-cover"
                  />
                </div>
                <div className="donor-info-compact">
                  <h4 className="donor-name-compact">{donor.name}</h4>
                  <div className="donor-amount-compact">{donor.amount}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-large">
            <a href="/donors" className="btn btn-outline">View All Donors</a>
          </div>
        </div>
      </section>

      {/* Contact Us Section with Form */}
      <section id="contact" className="section-padding bg-gradient">
        <div className="container">
          <div className="text-center mb-large">
            <span className="subtitle-light">Get In Touch</span>
            <h2 className="section-title-light">Contact Us</h2>
            <p className="text-white opacity-80 max-w-2xl mx-auto">
              Have questions or want to support our mission? We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <form className="contact-form glass-card-dark">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="+977 9800000000"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-input"
                    placeholder="What is this about?"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-large">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info-grid mt-large">
            <div className="contact-info-card glass-card-dark text-center">
              <div className="info-icon">📧</div>
              <h4>Email</h4>
              <p>info@degyalmemorial.org</p>
            </div>
            <div className="contact-info-card glass-card-dark text-center">
              <div className="info-icon">📱</div>
              <h4>Phone</h4>
              <p>+977 9800000000</p>
            </div>
            <div className="contact-info-card glass-card-dark text-center">
              <div className="info-icon">📍</div>
              <h4>Location</h4>
              <p>Namkha Khyung Dzong, Nepal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
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

          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Degyal Memorial Society. All rights reserved.</p>
            <p className="small-text">A non-political, non-profit community initiative.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
