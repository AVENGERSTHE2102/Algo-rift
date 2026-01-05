# 🛰️ ARGO Float Data Explorer (SIH Prototype)

## 📌 Project Overview
**ARGO Float Data Explorer** is a prototype developed for the **Smart India Hackathon (SIH)**. It addresses the challenge of visualizing and interacting with complex oceanographic data from ARGO floats. This web-based tool provides an intuitive interface for researchers and oceanographers to filter, visualize, and analyze float data using natural language queries, 3D interactive maps, and dynamic charts.

## 🚀 Key Features

### 1. 💬 Interactive Chat Interface
-   **Natural Language Querying:** Users can type simple commands like *"Show float 10001"* or *"Show all floats"* to filter data.
-   **Contextual Responses:** The system provides feedback and guides the user on available commands.

### 2. 🌍 3D Float Trajectory Visualization
-   **CesiumJS Integration:** Leverages the power of CesiumJS to render a high-fidelity 3D globe.
-   **Vertical Profiles:** Visualizes the depth profiles of ARGO floats directly on the map.
-   **Interactive Elements:** Points on the map can be clicked to view specific data readings.

### 3. 📊 Profile Analytics (Charts)
-   **Dynamic Plotting:** visualizes key oceanographic parameters:
    -   **Temperature** vs. Depth
    -   **Salinity** vs. Depth
    -   **Oxygen** vs. Depth
-   **Interactive Switching:** Users can easily toggle between parameters to analyze different datasets.

### 4. 📥 Data Exporter
-   **Tabular View:** Displays the filtered dataset in a clean, readable table.
-   **Export Ready:** Designed to allow easy export of the currently selected data for further analysis.

## 🛠️ Technology Stack
-   **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
-   **3D Mapping Engine:** [CesiumJS](https://cesium.com/platform/cesiumjs/)
-   **Charting Library:** [Chart.js](https://www.chartjs.org/)
-   **Icons:** Emoji-based UI for simplicity and accessibility.

## 📂 Project Structure
```
AlgoRift/
├── proto/              # Main prototype directory
│   ├── index1.html     # Main entry point and UI layout
│   ├── script.js       # Core logic, Cesium/Chart config, and mock data
│   ├── style.css       # Custom styling for general layout and components
└── README.md           # Project documentation
```

## 🚀 How to Run the Prototype
Since this is a client-side prototype, no complex backend setup is required.

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/AlgoRift.git
    cd AlgoRift
    ```

2.  **Open the Application:**
    -   Navigate to the `proto` directory.
    -   Open `index1.html` in any modern web browser (Edge, Chrome, Firefox, Safari).
    -   *Note:* Ensure you have an active internet connection as the application loads **CesiumJS** and **Chart.js** via CDN.

## 🔮 Future Improvements
-   **Real-time API Integration:** Connect to live ARGO float data APIs (e.g., Coriolis, IFREMER).
-   **Advanced Filtering:** Implement deeper spatial and temporal filtering (e.g., polygon selection on the globe).
-   **User Authentication:** Allow researchers to save sessions and query history.
-   **Mobile Responsiveness:** Further optimize the UI for tablet and mobile devices.

---
*Developed for Smart India Hackathon (SIH).*
