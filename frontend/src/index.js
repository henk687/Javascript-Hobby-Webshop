import HomeScreen from './srceens/HomeScreen';
import ProductScreen from './srceens/ProductScreen';
import { parseRequestUrl, showLoading, hideLoading, headerbg, scrollupLink, } from './utils';
import Error404Screen from './srceens/Error404Screen';
import CartScreen from './srceens/CartScreen';
import SigninScreen from './srceens/SigninScreen';
import Header from './components/Header';
import RegisterScreen from './srceens/RegisterScreen';
import ProfileScreen from './srceens/ProfileScreen';
import ShippingScreen from './srceens/ShippingScreen';
import PaymentScreen from './srceens/PaymentScreen';
import PlaceOrderScreen from './srceens/PlaceOrderScreen';
import OrderScreen from './srceens/OrderScreen';
import DashboardScreen from './srceens/DashboardScreen';
import ProductListScreen from './srceens/ProductListScreen';
import ProductEditScreen from './srceens/ProductEditScreen';
import OrderListScreen from './srceens/OrderListScreen';
import Footer from './components/Footer';
import IntroBanner from './components/IntroBanner';
import InfoBanner from './components/InfoBanner';
import PrivacyPolicyScreen from './srceens/PrivacyPolicyScreen';
import CookieStatementScreen from './srceens/CookieStatementScreen';

const routes = {
  '/': HomeScreen,
  '/product/:id/edit': ProductEditScreen,
  '/product/:id': ProductScreen,
  '/order/:id': OrderScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/dashboard': DashboardScreen,
  '/productlist': ProductListScreen,
  '/orderlist': OrderListScreen,
  '/privacyverklaring': PrivacyPolicyScreen,
  '/cookieverklaring': CookieStatementScreen,
};
const router = async () => {
  showLoading();
  headerbg();
  scrollupLink();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  console.log(request);
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();
  const introbanner = document.getElementById('intro-banner');
  introbanner.innerHTML = await IntroBanner.render();
  await IntroBanner.after_render();
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  const infobanner = document.getElementById('info-banner');
  infobanner.innerHTML = await InfoBanner.render();
  await InfoBanner.after_render();
  const footer = document.getElementById('contact');
  footer.innerHTML = await Footer.render();
  await Footer.after_render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
