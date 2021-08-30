import { getUserInfo } from '../localStorage';

const Footer = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    return ` 
      <div class="overlay-div overlay-background-black"></div>
      <div class="grid2">
        <h2 class="footer-bigtxt"><span>Heeft u vragen ?</span><span class="smaller-mob">Neem contact op</span></h2>
        <div class="footer-txt flex">
          <div class="footer-left">
            <p>
              <a class="active-link" href="mailto:info@hobbyverkoop.com">info@hobbyverkoop.com</a>
            </p>
            <p class="txtsm smaller-mob">
              Copyright &copy; 
              <script>
                var CurrentYear = new Date().getFullYear()
                document.write(CurrentYear)
              </script>  
            </p>
            <p class="txtsm smaller-mob">
              hobbyverkoop.com
            </p>
          </div>
          <div class="footer-right">
            <ul class="social">
              <li>
                ${
                  name
                    ? `<a href="/#/profile">${name}</a>`
                    : `<a href="/#/signin">Aanmelden</a>`
                }
              </li>
              <li><a href="/#/cart">Winkelwagen</a></li>
              <li><a href="/#/privacyverklaring">Privacyverklaring</a></li>
              <li><a href="/#/cookieverklaring">Cookieverklaring</a></li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },
  after_render: () => {},
};
export default Footer;
