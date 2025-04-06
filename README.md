# Healthy Skin E-commerce Platform

A modern e-commerce platform built with Django and Supabase, designed for skincare products.

## Project Status

This is a private repository maintained by Healthy Skin, a private company. This codebase contains proprietary information and is not intended for public distribution.

## Features

- Product management system
- User authentication and authorization
- Shopping cart functionality
- Order management
- Review system
- Secure file storage with Supabase
- RESTful API architecture

## Tech Stack

- **Backend**: Django 3.2.7
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **Authentication**: JWT (JSON Web Tokens)
- **API**: Django REST Framework
- **Frontend**: React (separate repository)

## Prerequisites

- Python 3.8+
- PostgreSQL
- Node.js and npm (for frontend)
- Supabase account

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/healthy-skin-v3.git
cd healthy-skin-v3
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory and add your environment variables:

```env
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True

# Supabase Database Settings
SUPABASE_DB_NAME=your-db-name
SUPABASE_DB_USER=your-db-user
SUPABASE_DB_PASSWORD=your-db-password
SUPABASE_DB_HOST=your-db-host
SUPABASE_DB_PORT=5432

# Supabase API Settings
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_STORAGE_BUCKET=healthyskin-bucket
```

5. Run migrations:

```bash
python manage.py migrate
```

6. Create a superuser:

```bash
python manage.py createsuperuser
```

7. Run the development server:

```bash
python manage.py runserver
```

## Project Structure

```
healthy-skin-v3/
├── backend/           # Django project settings
├── base/             # Main application
│   ├── models.py     # Database models
│   ├── views.py      # View logic
│   ├── urls.py       # URL routing
│   └── storage.py    # Supabase storage backend
├── frontend/         # React frontend (separate repo)
├── requirements.txt  # Python dependencies
└── .env             # Environment variables
```

## API Documentation

The API documentation is available at `/api/docs/` when running the development server.

## Development Guidelines

This repository is for internal use only. All development work should be done in feature branches and reviewed by the team before merging into the main branch.

## License

This project is proprietary software owned by Healthy Skin. All rights reserved.

## Contact

Project Link: [https://github.com/EMCarlos/healthy-skin-v3](https://github.com/EMCarlos/healthy-skin-v3)
