import { getUserInfo } from '../localStorage';

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    return ` 
  <div class="brand">
    <a href="/#/"><i class="fas fa-subway"></i></a>
  </div>
  <div>
  ${
    name
      ? `<a href="/#/profile">${name}</a>`
      : `<a href="/#/signin">Aanmelden</a>`
  }    
    <a href="/#/cart">Winkelwagen</a>
    ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
  </div>`;
  },
  after_render: () => {},
};
export default Header;
