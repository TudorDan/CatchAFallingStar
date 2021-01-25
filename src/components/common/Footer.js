import React from "react";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <section>
          <article className="col-1">
            <h3>Contact</h3>
            <ul>
              <li className="address">
                <a href="/">Orsova&nbsp;Street&nbsp;nr.&nbsp;104</a>
              </li>
              <li className="email">
                <a href="/">office@outlook.com</a>
              </li>
              <li className="phone last">
                <a href="/">0213210153</a>
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
              <li>Facebook</li>
              <li>Google</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </article>
        </section>
        <p className="copyright">2021 &copy; Designed by Coni &amp; Tudor</p>
      </div>
    </footer>
  );
};

export default Footer;
