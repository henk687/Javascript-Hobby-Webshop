import DashboardMenu from '../components/DashboardMenu';
import { getOrders, deleteOrder } from '../api';
import { showLoading, hideLoading, rerender, showMessage } from '../utils';

const OrderListScreen = {
  after_render: () => {
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure to delete this order?')) {
          showLoading();
          const data = await deleteOrder(deleteButton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(OrderListScreen);
          }
          hideLoading();
        }
      });
    });
    const editButtons = document.getElementsByClassName('edit-button');
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener('click', async () => {
        document.location.hash = `/order/${editButton.id}`;
      });
    });
  },
  render: async () => {
    const orders = await getOrders();
    return `
    <div class="dashboard">
    ${DashboardMenu.render({ selected: 'orders' })}
    <div class="dashboard-content">
      <h1>Bestellingen</h1>
       
      <div class="order-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATUM</th>
              <th>TOTAAL</th>
              <th>GEBRUIKER</th>
              <th>BETAALD OP</th>
              <th>GELEVERD OP</th>
              <th class="tr-action">ACTIE</th>
            <tr>
          </thead>
          <tbody>
            ${orders
              .map(
                (order) => `
            <tr>
              <td>${order._id}</td>
              <td>${order.createdAt}</td>
              <td>${order.totalPrice}</td>
              <td>${order.user.name}</td>
              <td>${order.paidAt || 'Nee'}</td>
              <td>${order.deliveredAt || 'Nee'}</td>
              <td>
              <button id="${order._id}" class="edit-button">Bewerken</button>
              <button id="${order._id}" class="delete-button">Verwijderen</button>
              </td>
            </tr>
            `
              )
              .join('\n')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
    `;
  },
};
export default OrderListScreen;
