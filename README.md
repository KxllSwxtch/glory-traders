# Project Title: Car Export Platform

## Overview

This project is a platform for exporting and managing car listings sourced from [Encar.com](https://www.encar.com). It features:

- **Car Listing Management**: Data scraped from Encar.com with filtering capabilities.
- **Customs Calculator**: A calculator for estimating customs fees.
- **Informational Pages**: Static pages about the exporter and services.

## Technology Stack

### Backend

- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **Search**: Elasticsearch

### Frontend

- **Framework**: React.js
- **Styling**: TailwindCSS

### Data Parsing

- **Language**: Python
- **Libraries**: BeautifulSoup, Selenium, Requests

## Features

1. **Data Parsing**:
   - Scrapes car listings from Encar.com.
   - Handles dynamic and static content.
2. **Backend API**:
   - Exposes RESTful endpoints for car data and search functionality.
   - Manages database interactions.
3. **Frontend Interface**:
   - Allows users to browse, filter, and search cars.
   - Includes a customs calculator tool.

## Project Structure

```
project-root/
│
├── scrapers/              # Scraping module
│   ├── encar_scraper/     # Specific scraper for Encar
│   │   ├── scraper.py     # Main scraping logic
│   │   ├── settings.py    # Configuration
│   │   └── utils.py       # Helper functions
│
├── backend/               # Backend API
│   ├── app/
│   │   ├── main.py        # FastAPI entry point
│   │   ├── models.py      # Database models
│   │   ├── routers/       # API endpoints
│   │   └── database.py    # Database connection
│
├── frontend/              # React.js Frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Application pages
│   │   └── App.js         # Main React app
│
├── data/                  # Temporary storage for scraped data
│
├── docker-compose.yml     # Docker configuration
├── requirements.txt       # Python dependencies
├── package.json           # Frontend dependencies
└── README.md              # Documentation
```

## Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL
- Docker (optional for deployment)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/car-export-platform.git
   cd car-export-platform
   ```

2. Set up the Python environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

4. Set up PostgreSQL and Elasticsearch:

   - Create a PostgreSQL database.
   - Start Elasticsearch and configure the connection in `.env`.

5. Run the backend:

   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

6. Run the frontend:

   ```bash
   cd frontend
   npm start
   ```

## Usage

- **Frontend**: Access the user interface at `http://localhost:3000`.
- **Backend API**: Explore the API documentation at `http://localhost:8000/docs`.

## Contribution Guidelines

- Fork the repository and create a feature branch.
- Follow PEP8 for Python and ESLint for JavaScript.
- Submit a pull request with a detailed description.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
