import Image from 'next/image';

export const Navbar = () => {
  return (
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
          <a href="/">Home</a>
          <a href="/#donor">Donor</a>
          <a href="/about-us">About Us</a>
          <a href="/students">Students</a>
          <a href="/#contact">Contact</a>
        </div>
        <a href="/#donate" className="btn btn-sm">Donate</a>
      </div>
    </nav>
  );
};
