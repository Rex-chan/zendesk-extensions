import React from 'react';

const OrderDetail = ({ order }) => {
  return (
    <div className="order-detail">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      {/*<p><strong>Date:</strong> {order.date}</p>*/}
      {/*<p><strong>Customer Name:</strong> {order.customerName}</p>*/}
      {/*<p><strong>Customer Email:</strong> {order.customerEmail}</p>*/}
      {/*<h3>Products:</h3>*/}
      {/*<ul>*/}
      {/*  {order.products.map((product, index) => (*/}
      {/*    <li key={index}>*/}
      {/*      <p><strong>Name:</strong> {product.name}</p>*/}
      {/*      <p><strong>Price:</strong> ${product.price}</p>*/}
      {/*      <p><strong>Quantity:</strong> {product.quantity}</p>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      {/*<p><strong>Total:</strong> ${calculateTotal(order.products)}</p>*/}
    </div>
  );
};

// const calculateTotal = (products) => {
//   return products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
// };

export default OrderDetail;
