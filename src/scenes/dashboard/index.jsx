import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Box, Typography, Link, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import 'leaflet/dist/leaflet.css';

import './index.css';

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const data1 = [
    { name: 'Communicating', value: 400 },
    { name: 'No Communicating', value: 300 },
  ];

  const data2 = [
    { name: 'Crictical', value: 100 },
    { name: 'Non-Critical', value: 200 },
    { name: 'Major', value: 500 },
    { name: 'Minor', value: 100 },
  ];

  const COLORS1 = ['#0088FE', '#00C49F'];
  const COLORS2 = ['#FF4040', '#FF6347', '#FF8C00'];

  const location1 = { lat: 17.4065, lng:  78.4772 };
  const location2 = { lat:17.4065, lng:  78.4772 };

  // Example line chart data
  const lineChartData = [
    { time: '10:00', value: 300 },
    { time: '10:30', value: 450 },
    { time: '11:00', value: 500 },
    { time: '11:30', value: 600 },
    { time: '12:00', value: 700 },
  ];

  const handlePieClick = (data, index) => {
    setSelectedStatus(data.name); // Set the selected status on pie click
    setOpenDialog(true); // Open the dialog box
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog box
  };

  return (
    <Box className="dashboard-container">
      <Box className="dashboard-content">
        {/* First Pie Chart with Map */}
        <Box className="chart-map-container">
        <div className="pie-container">
          <PieChart width={250} height={250} className="pie-chart">
            <Pie
              data={data1}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              onClick={handlePieClick}
            >
              {data1.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          </div>
          <MapContainer center={location1} zoom={10} className="map-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location1}>
              <Popup>Location for Chart 1</Popup>
            </Marker>
          </MapContainer>
        </Box>

        {/* Second Pie Chart with Map */}
        <Box className="chart-map-container">
        <PieChart width={250} height={250} className="pie-chart">
    <Pie
      data={data2}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      label
    >
      {data2.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
          <MapContainer center={location2} zoom={10} className="map-container">
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          <Marker position={location2}>
            <Popup>Location for Chart 2</Popup>
          </Marker>
        </MapContainer>
        </Box>

        {/* Alert Box */}
        <Box className="alert-box">
          <h3>Alert</h3>
          <p>High Voltage</p>
          <p>High Current</p>
        </Box>
      </Box>

      {/* Dialog for Selected Status */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Details for {selectedStatus}</DialogTitle>
        <DialogContent>
          {/* List for Selected Communication Status */}
          <List>
            <ListItem>Device 1 - Status: {selectedStatus}</ListItem>
            <ListItem>Device 2 - Status: {selectedStatus}</ListItem>
            <ListItem>Device 3 - Status: {selectedStatus}</ListItem>
          </List>

          {/* Line Chart */}
          <LineChart width={400} height={200} data={lineChartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Footer Section */}
      <Box className="footer">
        <Typography variant="body2" color="textSecondary">
          <Link href="https://www.vajraiot.com" target="_blank" rel="noopener noreferrer" color="primary">
            Powered By Vajra IoT Pvt. Ltd.
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
