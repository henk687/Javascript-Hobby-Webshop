import { register } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { showLoading, hideLoading, showMessage, redirectUser } from '../utils';

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          redirectUser();
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
    <div class="form-container">
      <form id="register-form">
        <ul class="form-items">
          <li>
            <h1>Maak een account aan</h1>
          </li>
          <li>
            <label for="name">Naam</label>
            <input type="name" name="name" id="name" />
          </li>
          <li>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" />
          </li>
          <li>
            <label for="password">Wachtwoord</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <label for="repassword">Herhaal Wachtwoord</label>
            <input type="password" name="repassword" id="repassword" />
          </li>
          <li>
            <button type="submit" class="primary">registreren</button>
          </li>
          <li>
            <div>
              Heb je al een account?
              <a href="/#/signin">Inloggen </a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};
export default RegisterScreen;
