import React from 'react';

const AlertList = ({ alerts }) => {
  return (
    <div>
      <h2>Alerts</h2>
      {alerts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Alert</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr key={index}>
                <td>{alert}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No alerts to display.</p>
      )}
    </div>
  );
};

export default AlertList;
