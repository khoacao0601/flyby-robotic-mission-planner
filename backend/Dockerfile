# Copyright (c) 2026 Khoa Cao. All rights reserved.

# 1. Use official lightweight Python image based on Debian Linux
FROM python:3.11-slim

# 2. Set environment variables to optimize Python within Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Set working directory inside container
WORKDIR /app

# 4. Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the backend application source code
COPY . .

# 6. Expose API port
EXPOSE 8000

# 7. Start FastAPI server using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]