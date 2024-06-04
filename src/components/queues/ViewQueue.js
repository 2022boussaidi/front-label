import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewQueue() {
    const [queue, setQueue] = useState({
        queueId: "",
        name: "",
        interactive: false,
        status: 0,
        siteId: "",
        siteName: "",
        plannerId: "",
        resources: "",
        plugins: [],
        reservedState: 0,
        heartBeat: null,
        deviceId: null,
        siteManagerStatus: 0,
        robotStopped: false,
        clientRestrictions: [],
        robot: {
            robotId: "",
            name: "",
            heartBeat: null,
            hbmax: "",
            hbStatus: "",
            siteManagerAddress: "",
            plugins: [],
            ips: { public: "", private: [] }
        },
        computedStatus: 0
    });
    const [showMore, setShowMore] = useState(false); // State variable to track show more/less

    const { id } = useParams();

    useEffect(() => {
        loadQueue();
    }, []);

    const loadQueue = async () => {
        try {
            const bearerToken = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/callqueue/${id}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            });
            setQueue(response.data);
        } catch (error) {
            console.error("Error loading queue:", error);
        }
    };
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    

    return (
       
            <div className="row">
                
                    <h2 className="text-center m-4">Queue Details</h2>
                    <div className="card">
                        <div className="card-header">
                            Details of Queue with ID: {queue.queueId}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name:</b> {queue.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Interactive:</b> {queue.interactive ? "Yes" : "No"}
                                </li>
                                <li className="list-group-item">
                                    <b>Status:</b> {queue.status}
                                </li>
                                <li className="list-group-item">
                                    <b>Site ID:</b> {queue.siteId}
                                </li>
                                <li className="list-group-item">
                                    <b>Site Name:</b> {queue.siteName}
                                </li>
                               
                               
                               
                                <li className="list-group-item">
                                    <b>Reserved State:</b> {queue.reservedState}
                                </li>
                                <li className="list-group-item">
                                    <b>Heartbeat:</b> {queue.heartBeat}
                                </li>
                                <li className="list-group-item">
                                    <b>Device ID:</b> {queue.deviceId}
                                </li>
                                <li className="list-group-item">
                                    <b>Site Manager Status:</b> {queue.siteManagerStatus}
                                </li>
                                <li className="list-group-item">
                                    <b>Robot Stopped:</b> {queue.robotStopped ? "Yes" : "No"}
                                </li>
                                <li className="list-group-item">
                                    <b>Client Restrictions:</b> {queue.clientRestrictions.join(', ')}
                                </li>
                               
                                <li className="list-group-item">
                                    <b>Computed Status:</b> {queue.computedStatus}
                                </li>
                                 {/* Conditional rendering based on showMore state */}
                        {showMore && (
                            <>
                             <li className="list-group-item">
                                    <b>Resources:</b> {queue.resources}
                                </li>
                                <li className="list-group-item">
                                    <b>Planner ID:</b> {queue.plannerId}
                                </li>
                                <li className="list-group-item">
                                    <b>Robot Details:</b>
                                    <ul>
                                        <li><b>Robot ID:</b> {queue.robot.robotId}</li>
                                        <li><b>Name:</b> {queue.robot.name}</li>
                                        <li><b>Heartbeat:</b> {queue.robot.heartBeat}</li>
                                        <li><b>Heartbeat Max:</b> {queue.robot.hbmax}</li>
                                        <li><b>Heartbeat Status:</b> {queue.robot.hbStatus}</li>
                                        <li><b>Site Manager Address:</b> {queue.robot.siteManagerAddress}</li>
                                        
                                        <li><b>Public IP:</b> {queue.robot.ips.public}</li>
                                        <li><b>Private IPs:</b>
                                            <ul>
                                                {queue.robot.ips.private.map((ip, index) => (
                                                    <li key={index}>{ip}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="list-group-item">
                                    <b>Plugins:</b>
                                    <ul>
                                        {queue.plugins.map((plugin, index) => (
                                            <li key={index}>{plugin.s_ID} - Version: {plugin.s_version}</li>
                                        ))}
                                    </ul>
                                </li>
                      
                                {/* Add more details as needed */}
                            </>
                        )}
                        
                        {/* Show more/less button */}
                        <li className="list-group-item">
                            <button className="btn btn-outline-primary" onClick={toggleShowMore}>
                                {showMore ? "Show less" : "Show more"}
                            </button>
                        </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                    <Link className="btn btn-primary my-2" to={"/queues"}>
                        Back to Queues
                    </Link>
                </div>
            </div>
        
    );
}
