const Footer = () => {
  return (
    <div className="footer">
      <div className="container-footer">
        <div className="footer-row">
          <div className="footer-links">
            <img src="/src/assets/img/round_logo.svg" alt="Logo" className="logo-footer" />
          </div>
          <div className="footer-links">
            <h4>Redes Sociales</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/saluddelmaule"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/saluddelmaule/"><i className="fab fa-instagram"></i></a>
              <a href="https://twitter.com/saluddelmaule"><i className="fab fa-twitter"></i></a>
              <a href="https://www.youtube.com/@serviciodesaludmaule"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
