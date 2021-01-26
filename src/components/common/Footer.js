import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMapPin, faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faFacebookF, faTwitter, faYoutube, faMapPin, faEnvelope, faPhoneAlt)

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <section>
          <article className="col-1">
            <h3>Contact</h3>
            <ul>
              <li className="address">
                <a href="/"><FontAwesomeIcon className="map-icon" icon={faMapPin}/>Orsova&nbsp;Street&nbsp;nr.&nbsp;104</a>
              </li>
              <li className="email">
                <a href="/"><FontAwesomeIcon className="email-icon" icon={faEnvelope}/>office@outlook.com</a>
              </li>
              <li className="phone last">
                <a href="/"><FontAwesomeIcon className="phone-icon" icon={faPhoneAlt}/>0213210153</a>
              </li>
            </ul>
          </article>
          <article className="col-2">
            <h3>Main Subjects</h3>
            <ul>
              <li>
                <a href="/">History</a>
              </li>
              <li>
                <a href="/">IT</a>
              </li>
              <li>
                <a href="/">Mathematics</a>
              </li>
              <li>
                <a href="/">Astronomy</a>
              </li>
              <li>
                <a href="/">Geography</a>
              </li>
              <li className="last">
                <a href="/">Physics</a>
              </li>
            </ul>
          </article>
          <article className="col-3">
            <h3>Social Media</h3>
            <ul>
            <li className="facebook"><a href="/"><FontAwesomeIcon className="facebook-icon" icon={faFacebookF}/>Facebook</a></li>
              <li className="twitter"><a href="/"><FontAwesomeIcon className="twitter-icon" icon={faTwitter}/>Twitter</a></li>
              <li className="youtube"><a href="/"><FontAwesomeIcon className="youtube-icon" icon={faYoutube}/>YouTube</a></li>
            </ul>
          </article>
        </section>
        <p className="copyright">2021 &copy; Designed by Coni &amp; Tudor</p>
      </div>
    </footer>
  );
};

export default Footer;
