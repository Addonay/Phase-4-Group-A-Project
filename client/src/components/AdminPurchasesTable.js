import React from 'react';

function AdminPurchasesTable({ purchases }) {
  return (
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Car Make</th>
          <th>Price</th>
          <th>Purchase Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((purchase) => (
          <tr key={purchase.id}>
            <td>{purchase.user_id}</td>
            <td>{purchase.car_make}</td>
            <td>{purchase.price}</td>
            <td>{purchase.purchase_date}</td>
            <td>{purchase.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminPurchasesTable;
