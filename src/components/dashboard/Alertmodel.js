import React, { useEffect, useState } from 'react';
import { Alert, Card, CardBody, Container, Modal, ModalBody, ModalHeader } from 'reactstrap';

// Function to remove duplicates
const removeDuplicates = (alerts) => {
    return [...new Set(alerts)];
};

const fetchAlerts = async () => {
    const response = await fetch('http://localhost:5000/api/alert');
    const data = await response.json();
    return removeDuplicates(data.alerts);
};

const Alertmodel = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const loadAlerts = async () => {
            try {
                const alertsData = await fetchAlerts();
                setAlerts(alertsData);
                setLoading(false);
                toggleModal(); // Open modal after alerts are loaded
            } catch (error) {
                console.error('Error fetching alerts:', error);
                setLoading(false);
            }
        };

        loadAlerts();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
           
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Alerts</ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            {alerts.map((alert, index) => (
                                <Alert
                                    color="warning"
                                    key={index}
                                >
                                    {alert}
                                </Alert>
                            ))}
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default Alertmodel;
