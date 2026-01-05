#  Algo-rift: Float Chat Platform

[![SIH 2024](https://img.shields.io/badge/SIH-2024-blue.svg)](https://www.sih.gov.in/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange?logo=pwa)](https://web.dev/progressive-web-apps/)

**Algo-rift** is a state-of-the-art Progressive Web App (PWA) designed for advanced oceanographic data analysis. Developed as a prototype for the **Smart India Hackathon (SIH)**, it focuses on the visualization and interaction of **ARGO float data**, specifically tailored for the Indian Ocean region.

---

## 📌 Problem Statement
Oceanographers and researchers often struggle with visualizing complex, real-time data from ARGO floats distributed across the vast oceans. Existing tools are either too complex or lack intuitive interactive features, making it difficult to derive quick insights or export data in research-ready formats.

## 💡 The Solution: Algo-rift
Algo-rift bridges this gap by providing a modern, AI-integrated, and mobile-first platform that allows for:
- **Instant Data Access**: Real-time tracking and statistical overview of ARGO floats.
- **Geospatial Intelligence**: High-performance 2D mapping focused on the Indian Ocean.
- **AI-Driven Insights**: A natural language interface to query oceanographic metrics.
- **Seamless Data Portability**: Multi-format export system for professional research.

---

## ✨ Key Features

### 📊 Interactive Dashboard
- Real-time statistics of active floats.
- Data quality metrics and recent activity feeds.
- Quick-action buttons for common research tasks.

### 🗺️ 2D Geospatial Visualization
- Built with **Leaflet** for smooth, responsive mapping.
- Marker clustering for thousands of data points.
- Detailed popups featuring temperature, salinity, and pressure profiles.

### 🤖 AI-Powered Chat Interface
- Query ocean data using natural language.
- Receive AI-generated insights and trend analysis.
- Optimized mobile interaction for field research.

### 📂 Data Export System
- Export research data in multiple formats: **NetCDF**, **CSV**, **JSON**, and **MATLAB**.
- Advanced filtering by date, region, and data type.

### 📱 Progressive Web App (PWA)
- **Offline Mode**: Access critical data even without an active internet connection.
- **Mobile-First**: Fully responsive design with a native app-like experience on iOS and Android.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS, Shadcn/ui |
| **Mapping** | Leaflet, React-Leaflet |
| **State Management** | TanStack Query (React Query) |
| **Icons** | Lucide React |
| **PWA** | Service Workers, Web Manifest |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (Recommended)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AVENGERSTHE2102/Algo-rift.git
   cd Algo-rift
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📂 Project Structure
```text
src/
├── components/     # Reusable UI components (shadcn/ui, Layout, Maps)
├── hooks/          # Custom hooks (PWA, data fetching)
├── lib/            # Utilities and mock data generators
├── pages/          # Main application views (Dashboard, Map, Chat, Export)
└── App.tsx         # Main entry point and routing logic
```

---

## 🛠️ Development Commands
- `pnpm run dev`: Start development server.
- `pnpm run build`: Build for production.
- `pnpm run preview`: Preview the production build locally.
- `pnpm run lint`: Run ESLint check.

---

## 🔮 Future Roadmap
- [ ] Integration with real-time ARGO API endpoints.
- [ ] 3D visualization using CesiumJS.
- [ ] Advanced predictive modeling using Machine Learning.
- [ ] Multi-language support for international research teams.

---

## 🤝 Contributing
This project is an SIH prototype. Contributions and feedback are welcome! Please open an issue or submit a pull request for any enhancements.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Developed with ❤️ for Smart India Hackathon 2024.*
