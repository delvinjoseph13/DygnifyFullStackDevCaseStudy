import hazardModel from "../models/hazard.js";
import axios from 'axios'

// Dummy weather data fetcher for simulation
const fetchWeatherData = async (lat, lon, startYear, endYear) => {
  const allData = [];

  for (let year = startYear; year <= endYear; year++) {
    const res = await axios.get(`https://archive-api.open-meteo.com/v1/archive`, {
      params: {
        latitude: lat,
        longitude: lon,
        start_date: `${year}-01-01`,
        end_date: `${year}-12-31`,
        daily: 'temperature_2m_max',
        timezone: 'auto'
      }
    });

    const temps = res.data.daily.temperature_2m_max;
    let heatwaveDays = 0, droughtDays = 0, rainfallEvents = 0, streak = 0;

    const threshold = 35; // simplified heatwave threshold
    for (let temp of temps) {
      if (temp >= threshold) {
        streak++;
        if (streak >= 3) heatwaveDays++;
      } else {
        streak = 0;
      }
    }

    allData.push({ lat, lon, year, heatwaveDays, droughtDays, rainfallEvents });
  }
  return allData;
};

//To generate and save hazard data
export const generateHazard=async(req,res)=>{
  try {
    const { lat, lon, timeRange } = req.body;
    const data = await fetchWeatherData(lat, lon, timeRange.start, timeRange.end);

    await hazardModel.deleteMany({ lat, lon, year: { $gte: timeRange.start, $lte: timeRange.end } });
    await hazardModel.insertMany(data);

    res.json({ message: 'Hazard data generated and stored', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating hazards', error });
  }
}

export const getHazardData=async(req,res)=>{
try {
    const { lat, lon, timeRange } = req.body;
    const data = await hazardModel.find({
      lat,
      lon,
      year: { $gte: timeRange.start, $lte: timeRange.end }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
