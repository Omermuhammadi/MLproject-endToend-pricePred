# 📱 Mobile Price Prediction App

This is a full-stack web application that predicts the price range of a mobile phone based on its specifications. The backend is built with FastAPI and the frontend with vanilla HTML, CSS, and JavaScript.

## ✨ Features

- **Price Prediction**: Enter 20 different features of a mobile phone to get a predicted price range.
- **Clean UI**: A modern, responsive, and user-friendly interface.
- **FastAPI Backend**: A robust and fast backend server.
- **Dockerized**: Ready for containerization and deployment.

## 📁 Project Structure

```
mobile_price_project/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── model.py
│   │   ├── schemas.py
│   │   └── utils.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── models/
│   └── best_model_Logistic_Regression_20250614_170605.pkl
├── Dockerfile
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- An IDE like VS Code
- Docker (optional, for containerization)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mobile_price_project
```

### 2. Place the Model

Make sure you have the trained model file `best_model_Logistic_Regression_20250614_170605.pkl` and place it inside the `models/` directory.

### 3. Set Up the Backend

Navigate to the backend directory and install the required packages.

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### 4. Run the Backend Server

From the `backend` directory, run the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

### 5. Launch the Frontend

Simply open the `frontend/index.html` file in your web browser.

## 🐳 Running with Docker

To build and run the application using Docker, use the following commands from the project root:

```bash
# Build the Docker image
docker build -t mobile-price-app .

# Run the Docker container
docker run -p 8000:8000 mobile-price-app
```

The application will be accessible at `http://localhost:8000`.
