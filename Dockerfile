# Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend requirements file and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application code and the model
COPY ./backend/app ./app
# Make sure to move your .pkl file into the models/ directory before building
COPY ./models /app/models

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
# We add the --host 0.0.0.0 to make it accessible from outside the container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--app-dir", "/app"]
