import React, { useEffect, useState } from 'react';
import { Alert, Card, CardBody, Container } from 'reactstrap';

// Function to remove duplicates

const removeDuplicates = (alerts) => {
    return [...new Set(alerts)];
};

const fetchAlerts = async () => {
    const response = await fetch('http://localhost:5001/api/alerts/error-alert');
    const data = await response.json();
    return removeDuplicates(data.alerts);
};

const AlertsComponent = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
     // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);}

    useEffect(() => {
        const loadAlerts = async () => {
            try {
                const alertsData = await fetchAlerts();
                setAlerts(alertsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching alerts:', error);
                setLoading(false);
            }
        };

        loadAlerts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
<h2>    Alerts</h2>
          <Card>
            <CardBody>
            {alerts.map((alert, index) => (
                 <Alert
                 color="warning"
                 isOpen={visible}
                 toggle={onDismiss.bind(null)}
                 fade={false}
                 key ={index} 
               >
                    {alert}
                </Alert>
            ))}
            </CardBody>
            </Card>
        </div>
    );
};

export default AlertsComponent;
