import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, PaginationItem, PaginationLink  , Card , CardBody} from 'reactstrap';

const PredictionTable = () => {
  const [data, setData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this value as needed

  // Function to process the JSON response and structure data for prediction
  const processDataForPrediction = (jsonData) => {
    const buckets = jsonData.aggregations['2'].buckets;
    const structuredData = buckets.flatMap(bucket => {
      const robotBuckets = bucket['3'].buckets;
      return robotBuckets.flatMap(robotBucket => {
        const severityBuckets = robotBucket['4'].buckets;
        return severityBuckets.map(severityBucket => ({
          Ekara_Site_Agent: bucket.key,
          Ekara_Robot: robotBucket.key,
          Robot_Severity: severityBucket.key
        }));
      });
    });
    return structuredData;
  };

  useEffect(() => {
    // Fetch real data
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/error'); // Replace with your real data endpoint
        const structuredData = processDataForPrediction(response.data);
        setData(structuredData);
      } catch (error) {
        console.error('Error fetching real data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch predicted data for each structured input
    const fetchPredictedData = async () => {
      try {
        const predictions = await Promise.all(data.map(async (item) => {
          const response = await axios.post('http://localhost:5002/predict/GBM_2_AutoML_1_20240516_212404', item); // Replace 'model_name' with your actual model name
          return { ...item, Prediction: response.data.Prediction };
        }));
        setPredictedData(predictions);
      } catch (error) {
        console.error('Error fetching predicted data:', error);
      }
    };

    if (data.length > 0) {
      fetchPredictedData();
    }
  }, [data]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = predictedData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
     <Card>
        <CardBody>
          <h4>Ekara_Robot_ToP_Error_Predicted_Count</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Ekara Site Agent</th>
            <th>Ekara Robot</th>
            <th>Robot Severity</th>
            <th style={{ color: 'black' }}  className="badge bg-warning" >Predicted_Count</th>

          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.Ekara_Site_Agent}</td>
              <td>{item.Ekara_Robot}</td>
              <td>{item.Robot_Severity}</td>
              <td  className="badge bg-warning">{item.Prediction}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PaginationItem>
          <PaginationLink previous onClick={prevPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next onClick={nextPage} />
        </PaginationItem>
      </Pagination>
      </CardBody>
      </Card>
    </>
  );
};

export default PredictionTable;
