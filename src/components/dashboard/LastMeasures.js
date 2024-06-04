import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, CardBody } from 'reactstrap';

const LastMeasures = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/last_measures');
        const buckets = response.data.aggregations['4'].buckets['"Sending results"']['3'].buckets;

        // Process data
        const processedData = buckets.map(bucket => ({
          RoboT: bucket.key,
          NbreDeMesures: bucket.doc_count
        }));

        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginateNext = () => setCurrentPage(prev => prev + 1);
  const paginatePrev = () => setCurrentPage(prev => prev - 1);

  return (
    <div>
        <Card>
            <CardBody>
      <h4>Last Measures Count</h4>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table striped>
            <thead>
              <tr>
                <th>Filters</th>
                <th>RoboT</th>
                <th>Nbre De Mesures</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>"Sending results"</td>
                  <td>{item.RoboT}</td>
                  <td>{item.NbreDeMesures.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagination">
            <Button onClick={paginatePrev} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button onClick={paginateNext} disabled={currentItems.length < itemsPerPage}>
              Next
            </Button>
          </div>
        </>
      )}
      </CardBody>
      </Card>
    </div>
  );
};

export default LastMeasures;
