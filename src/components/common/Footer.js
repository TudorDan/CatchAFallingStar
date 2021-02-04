import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapPin,
  faEnvelope,
  faPhoneAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faFacebookF,
  faTwitter,
  faYoutube,
  faMapPin,
  faEnvelope,
  faPhoneAlt,
  faArrowRight
);

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 footer-contact">
                <h3>eLearning</h3>
                <p>
                  Orșova Street, nr. 104 <br />
                  Orșova, MH 123432 <br />
                  România <br />
                  <br />
                  <strong>Phone:</strong> +40 123 456 789
                  <br />
                  <strong>Email:</strong> office@schoolsystem.com
                  <br />
                </p>
              </div>

              <div className="col-lg-4 col-md-6 footer-links">
                <h4>Main subjects</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="/">Hystory</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="/">IT</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="/">Mathematics</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="/">Astronomy</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="/">Geography</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/">Physics</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Join Our Newsletter</h4>
                <p>
                  Tamen quem nulla quae legam multos aute sint culpa legam
                  noster magna
                </p>
                <form action="" method="post">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container d-md-flex py-4">
          <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
              &copy; 2021 - Programmed by Coni &amp; Tudor
            </div>
            <div className="credits">
              Graphical template provided by{" "}
              <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
          <div className="own-social-links text-center text-md-right pt-3 pt-md-0">
            <a href="/" className="twitter">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="/" className="facebook">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="/" className="instagram">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="/" className="google-plus">
              <i className="bx bxl-skype"></i>
            </a>
            <a href="/" className="linkedin">
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>

      <a href="/" className="back-to-top">
        <i className="bx bx-up-arrow-alt"></i>
      </a>

      <div id="preloader"></div>
    </>
  );
};

export default Footer;
