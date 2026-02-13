import Image from 'next/image';

export function Footer() {
  return (
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
  );
}