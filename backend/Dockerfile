FROM python:3.11-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "TrueNorth.wsgi:application"]