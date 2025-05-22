import axios from "axios";
import { useState, useRef } from "react";
import Chart from 'chart.js/auto';

function Home() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [startYear, setStartYear] = useState(1990);
  const [endYear, setEndYear] = useState(2020);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // useRef to keep the chart instance persistent
  const hazardChartInstance = useRef(null);

  const generateAndFetchData = async () => {
    if (!lat || !lon) return alert("Please enter both latitude and longitude");

    try {
      setLoading(true);
      await axios.post('https://dygnifyfullstackdevcasestudy-1.onrender.com/api/generate-hazards', {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        timeRange: { start: startYear, end: endYear }
      });
      await fetchData();
    } catch (error) {
        alert('No Data found')
      console.error(error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('https://dygnifyfullstackdevcasestudy-1.onrender.com/api/hazards', {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        timeRange: { start: startYear, end: endYear }
      });
      setData(response.data);
      drawChart(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const drawChart = (hazardData) => {
    const ctx = document.getElementById('hazardChart').getContext('2d');

    // Destroy existing chart instance if it exists
    if (hazardChartInstance.current) {
      hazardChartInstance.current.destroy();
    }

    hazardChartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hazardData.map(entry => entry.year),
        datasets: [
          {
            label: 'Heatwave Days',
            data: hazardData.map(entry => entry.heatwaveDays),
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Drought Days',
            data: hazardData.map(entry => entry.droughtDays),
            borderColor: 'orange',
            fill: false,
          },
          {
            label: 'Rainfall Events',
            data: hazardData.map(entry => entry.rainfallEvents),
            borderColor: 'blue',
            fill: false,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Climate Hazards Over Time' }
        }
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Climate Hazard Analyzer</h1>
      <input type="text" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} className="border p-2 m-2 w-full" />
      <input type="text" placeholder="Longitude" value={lon} onChange={(e) => setLon(e.target.value)} className="border p-2 m-2 w-full" />
      <input type="number" placeholder="Start Year" value={startYear} onChange={(e) => setStartYear(parseInt(e.target.value))} className="border p-2 m-2 w-full" />
      <input type="number" placeholder="End Year" value={endYear} onChange={(e) => setEndYear(parseInt(e.target.value))} className="border p-2 m-2 w-full" />
      <button onClick={generateAndFetchData} className="bg-blue-600 text-white px-4 py-2 rounded m-2" disabled={loading}>
        {loading ? 'Loading...' : 'Analyze'}
      </button>
      <canvas id="hazardChart" className="mt-6"></canvas>
    </div>
  );
}

export default Home;
