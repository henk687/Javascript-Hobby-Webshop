const CheckoutSteps = {
  render: (props) => {
    return `
    <div class="checkout-steps">
      <div class="${props.step1 ? 'active' : ''}">Aanmelden</div>
      <div class="${props.step2 ? 'active' : ''}">Verzending</div>
      <div class="${props.step3 ? 'active' : ''}">Betaling</div>
      <div class="${props.step4 ? 'active' : ''}">Plaats bestelling</div>
    </div>
    `;
  },
};
export default CheckoutSteps;
