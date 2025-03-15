# Smart Home Energy Monitoring System

A comprehensive IoT application for monitoring and managing energy consumption in a smart home environment.

## Project Overview

This application provides a user-friendly interface for monitoring energy consumption from various smart home devices. It allows users to track usage patterns, set energy budgets, and receive alerts when consumption exceeds predefined thresholds.


## Architecture diagram
![architecture diagram](https://github.com/user-attachments/assets/f41705e8-e4ad-4c72-be8c-dd709a56723e)


### Key Features

- **Real-time Energy Monitoring**: View current and historical energy consumption data
- **Device Management**: Add, remove, and control smart devices
- **Energy Budgeting**: Set daily and monthly energy consumption targets
- **Alerts and Notifications**: Receive alerts when devices exceed energy thresholds
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works on desktop and mobile devices

## Technical Architecture

### Frontend (React)
- React for UI components
- React Router for navigation
- Recharts for data visualization
- Tailwind CSS for styling
- Lucide React for icons
- JWT for authentication

### Backend (Simulated)
- RESTful API endpoints (simulated in this demo)
- Authentication with JWT
- Data persistence (simulated)

### IoT Integration
- Device data simulation
- Real-time updates

## Design Decisions

1. **Authentication System**: Implemented JWT-based authentication for secure access to the application.
2. **Data Visualization**: Used Recharts for responsive and interactive charts to display energy consumption data.
3. **Device Management**: Created a comprehensive interface for managing smart devices with status indicators and energy usage metrics.
4. **Responsive Design**: Implemented a mobile-friendly design using Tailwind CSS.
5. **Simulated Backend**: Created a simulated backend API to demonstrate functionality without requiring actual IoT devices.

## Challenges Faced

1. **Data Simulation**: Creating realistic energy consumption patterns for demonstration purposes.
2. **Real-time Updates**: Implementing a system that simulates real-time data updates.
3. **User Experience**: Designing an intuitive interface for complex energy data.

## Future Enhancements

1. **Machine Learning Integration**: Implement predictive analytics for energy consumption forecasting.
2. **Voice Assistant Integration**: Add support for Alexa, Google Assistant, etc.
3. **Mobile Application**: Develop a dedicated mobile app for on-the-go monitoring.
4. **Advanced Reporting**: Add detailed reports and analytics features.
5. **Integration with Real IoT Devices**: Connect with actual smart home devices via their APIs.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Access the application at the provided local URL

## Demo Credentials

- **Email**: demo@example.com
- **Password**: password123

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Recharts
- React Router
- JWT Authentication
