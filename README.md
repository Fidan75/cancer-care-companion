# CancerCare Companion

An educational and supportive mobile app prototype designed to help people affected by cancer access general information and organize their healthcare journey.

## Features

- AI educational companion
- Cancer information library
- Medical dictionary
- Appointment planner
- Questions for doctors
- Wellbeing diary
- Medical report education

## Technology Stack

- React Native
- Expo
- TypeScript
- Python
- FastAPI
- Google Gemini API
- AsyncStorage

## Setup

### Frontend

Install dependencies and start the application:

```bash
npm install
npx expo start
```

### Backend

Navigate to the backend folder:

```bash
cd backend
```

Create and activate a Python virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the dependencies:

```bash
pip install fastapi uvicorn python-dotenv google-genai
```

Create a file named `.env` inside the `backend` folder and add your own Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

Start the backend:

```bash
uvicorn main:app --reload --port 8000
```

## Disclaimer

CancerCare Companion is an educational prototype. It does not provide medical diagnosis or treatment recommendations and is not a substitute for qualified healthcare professionals.

The application has not been clinically validated.

## Project Status

This project is currently under development.