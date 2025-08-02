import React from 'react';

const donations = [
  { id: 1, donor: "Alice", amount: 500 },
  { id: 2, donor: "Bob", amount: 1000 },
];

function AllDonations() {
  return (
    <div>
      <h2>All Donations</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Donor</th><th>Amount</th></tr>
        </thead>
        <tbody>
          {donations.map(d => (
            <tr key={d.id}>
              <td>{d.donor}</td>
              <td>₹{d.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllDonations;
