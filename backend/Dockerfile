# Pull official base image
FROM python:3.10-slim-bullseye

# Declare maintainers
LABEL maintainers "Miebaka Iwarri <miebaka@uobis.com>"

# Install OS dependencies
# RUN set -eux \
#     && apt-get update \
#     && apt-get install -y --no-install-recommends \
#         build-essential \
#         libssl-dev \
#         libffi-dev \
#         gcc \
#         musl-dev \
#         libpq-dev \
#         libmagic-dev\
#         bash \
#         && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 
    # \
    # PATH="/root/.local/bin:~/.local/bin:${PATH}" 

COPY requirements.txt ./

# Upgrade pip
RUN python3 -m pip install --upgrade pip

# Install deps
RUN pip install -r requirements.txt 

# Copy project files
COPY . ./

# Change entrypoint shell script permission
RUN chmod +x ./entrypoint.sh

# Set the entrypoint script as the entrypoint
ENTRYPOINT ["sh", "./entrypoint.sh"]
