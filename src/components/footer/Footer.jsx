import React from "react";
import './Footer.scss';

class Footer extends React.Component {
    render() {

      return(
          <footer className="footer">
            <section className="footer__text">
              <p>&copy; {new Date().getFullYear()} | The Space</p>
            </section>
          </footer>
      );
    }
}

export default Footer;
