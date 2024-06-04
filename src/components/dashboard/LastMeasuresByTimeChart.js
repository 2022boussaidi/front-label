import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

const LastMeasuresByTimeChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Time'
        }
      },
      yaxis: {
        title: {
          text: 'Count'
        }
      },
      title: {
        text: 'Sending Measure By Time and Robot',
        align: 'center'
      },
      legend: {
        position: 'right'
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/last_measures_by_time');
        const buckets = response.data.aggregations['2'].buckets;

        const categories = [];
        const seriesData = {};

        buckets.forEach(bucket => {
          bucket['3'].buckets.forEach(subBucket => {
            const robotKey = subBucket.key;
            const docCount = subBucket['4'].buckets['"Sending results"'].doc_count;

            if (!seriesData[robotKey]) {
              seriesData[robotKey] = [];
            }

            categories.push(bucket.key_as_string);
            seriesData[robotKey].push(docCount);
          });
        });

        const series = Object.keys(seriesData).map(key => ({
          name: key,
          data: seriesData[key]
        }));

        setChartData({
          series: series,
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: [...new Set(categories)]
            }
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Card>
      <CardBody>
      <Chart options={chartData.options} series={chartData.series} type="line" height={370} />
      </CardBody>
      </Card>
    </div>
  );
};

export default LastMeasuresByTimeChart;
