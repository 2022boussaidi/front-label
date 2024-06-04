import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, CardBody, CardTitle, Table } from 'reactstrap';

const ViewRobot = () => {
    const [robot, setRobot] = useState({
        robotId: "",
        name: "",
        heartBeat: false,
        hbmax: "",
        hbStatus: "",
        version: "",
        siteManagerAddress: "",
        hasSiteManagerIssue: false,
        plugins: [],
        components: [],
        certificates: {},
        ips: { public: "", private: [] },
        lastStatus: {
            s_dst: "",
            s_src: "",
            s_host: "",
            s_name: "",
            tp_hbmax: "",
            b_stopped: false,
            ls_queues: [],
            s_robotId: "",
            s_version: "",
            ls_plugins: [],
            s_sourceIp: "",
            td_timestamp: "",
            ls_privateIps: [],
            ls_collectors: [],
            ls_components: [],
            ls_certificats: [],
            s_systemVersion: "",
            s_sharedDataHash: "",
            s_siteManagerAddress: "",
            ls_resourceThresholds: []
        },
        endpoint: "",
        host: "",
        storageName: null,
        needUpdate: false,
        queues: [],
        isPrivate: false
    });
    const [showMore, setShowMore] = useState(false); // State variable to track show more/less
    const [openModal, setOpenModal] = useState(false);
    
    const { id } = useParams();
    
    useEffect(() => {
        loadRobot();
    }, []);
    
    const loadRobot = async () => {
        try {
            const bearerToken = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/callrobot/${id}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            });
            const robotData = response.data;
            setRobot(robotData);
        } catch (error) {
            console.error("Error loading site:", error);
        }
    };
    
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const toggleModal = () => {
        setOpenModal(!openModal);
        if (!openModal) {
         loadRobot();
        }
    };

    return (
        <div className="row">
            <Button color="primary" onClick={toggleModal}>
                View Robot Details
            </Button>
            <Modal isOpen={openModal} toggle={toggleModal} size="xl">
                <ModalHeader toggle={toggleModal}>Robot Details</ModalHeader>
                <ModalBody style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                    <div className="card-header">
                        Details of Robot with ID: {robot.robotId}
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Name:</b> {robot.name}
                            </li>
                            <li className="list-group-item">
                                <b>Heartbeat:</b> {robot.heartBeat}
                            </li>
                            <li className="list-group-item">
                                <b>Version:</b> {robot.version}
                            </li>
                            <li className="list-group-item">
                                <b>Site Manager Address:</b> {robot.siteManagerAddress}
                            </li>
                            <li className="list-group-item">
                                <b>Has Site Manager Issue:</b> {robot.hasSiteManagerIssue ? "Yes" : "No"}
                            </li>
                            {robot.certificates && Object.values(robot.certificates).length > 0 && (
                                <li className="list-group-item">
                                    <b>Certificates:</b>
                                    <ul>
                                        {Object.values(robot.certificates).map((certificate, index) => (
                                            <li key={index}>{certificate.s_pattern} - Expiration Date: {certificate.td_expirationDate}</li>
                                        ))}
                                    </ul>
                                </li>
                            )}
                            <li className="list-group-item">
                                <b>Public IP:</b> {robot.ips.public}
                            </li>
                            <li className="list-group-item">
                                <b>Last Status:</b> {robot.lastStatus.s_src}
                            </li>
                            {showMore && (
                                <>
                                    <li className="list-group-item">
                                        <b>Endpoint:</b> {robot.endpoint}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Host:</b> {robot.host}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Storage Name:</b> {robot.storageName}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Plugins:</b>
                                        <ul>
                                            {robot.plugins.map((plugin, index) => (
                                                <li key={index}>{plugin.s_ID} - Version: {plugin.s_version}</li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Components:</b>
                                        <ul>
                                            {robot.components.map((component, index) => (
                                                <li key={index}>{component.s_name} - Version: {component.s_version}</li>
                                            ))}
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="list-group-item">
                                <button className="btn btn-outline-primary" onClick={toggleShowMore}>
                                    {showMore ? "Show less" : "Show more"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>OK</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ViewRobot;
