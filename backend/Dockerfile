FROM python:3.14.2-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Work directory
WORKDIR /app/myproject

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY ./myproject .

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "myproject.wsgi:application"]