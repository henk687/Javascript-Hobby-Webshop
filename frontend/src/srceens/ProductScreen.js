import { parseRequestUrl, showLoading, hideLoading } from '../utils';
import { getProduct } from '../api';
import Rating from '../components/Rating';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
    <div class="content">
      <div class="back-to-result">
        <a href="/#/">Terug naar resultaat </a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} reviews`,
            })}
            </li>
            <li>
              Prijs: <strong>€${product.price}</strong>
            </li>
            <li>
              Beschrijving:
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
            <ul>
              <li>
                Prijs: €${product.price}
              </li>
              <li>
                Status : 
                  ${
                    product.countInStock > 0
                      ? `<span class="success">Op voorraad</span>`
                      : `<span class="error">Niet beschikbaar</span>`
                  }
              </li>
              <li>
                  <button id="add-button" class="fw primary">Toevoegen aan winkelwagen </div>
            </ul>
        </div>
      </div>
    </div>`;
  },
};
export default ProductScreen;
