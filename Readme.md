# Climate Hazard Analyzer

A React frontend with a Node.js backend to analyze climate hazards — heatwaves, droughts, and rainfall events — over a specified geographic location and time range. This app fetches data, processes it, and visualizes hazard trends using Chart.js.

---

##  Features

- Input geographic coordinates (latitude & longitude)
- Specify start and end years for analysis
- Generate climate hazard data on the backend
- Display trends of heatwaves, droughts, and rainfall over time
- Responsive, user-friendly UI with loading states and validation


---

## 🛠 Tech Stack

### Frontend
- React
- Chart.js
- Axios
- Tailwind CSS


### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Open-Meteo API


---

## 📁 Folder Structure

🛠️ Setup Instructions
📁 Backend Setup
1. Clone the Repository

   git clone https://github.com/delvinjoseph13/Boom_assignment.git

   cd backend

2. Install Dependencies

   npm install

3. Environment Variables

   Create a .env file with the following contents: MONGODB_URL=mongodb://localhost:27017/agent-distributor,PORT=5000
   or use MongoDb Atlas

4. Run the Server
   
   npm start

Frontend Setup

1. Navigate to Frontend Folder

   cd frontend
   cd vite-project

2. Install Dependencies

   npm install

3. Start the Frontend
 
   npm run dev


backend/
  controllers/
  middleware/
  model/
  routes/
  server.js
  .env

frontend/vite-project
  src/
    components/
      Home.jsx
    App.js
    index.css
  tailwind.config.js
  package.json

