import Image from 'next/image';

import { Navbar } from '../components/navbar';
import { ContactForm } from '../components/contactForm';
import { Footer } from '../components/footer';

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
    image: "/images/donors/lakha-thapa.jpeg",
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
            <ContactForm />
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
      <Footer />
    </div>
  );
}
