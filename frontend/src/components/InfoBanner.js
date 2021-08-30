const InfoBanner = {
  render: () => {
    return ` 
      <div class="overlay-div overlay-background-orange"></div>
      <div class="grid">
        <div class="title-main">
          <h2>verkoop</h2> 
          <h3 class="title-sub">info</h3>
        </div>
        <div class="text">
          <p>Je kunt betalen via PayPal.</p> 
          <p>Retourneren of ruilen is niet mogelijk.</p> 
          <p>Verzending is gratis bij een bestelling vanaf € 100</p>
        </div>
      </div>
    `;
  },
  after_render: () => {},
};
export default InfoBanner;
