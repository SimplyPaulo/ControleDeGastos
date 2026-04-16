# Expense Tracker Fullstack

Personal finance management application built with a .NET backend and a React frontend. The system allows users to track income and expenses, manage categories, and visualize financial summaries through a dashboard.

## Project Structure

- **backend/**: ASP.NET Core Web API with Entity Framework Core and SQLite.
- **frontend/**: React application built with Vite, TypeScript, and Ant Design.

## Core Features

- User management with cascading deletes.
- Category management with logic to prevent deletion if linked to transactions.
- Transaction tracking (Income/Expense).

- Business rules: Users under 18 years old can only register expenses.
- Automated database migration and seeding for initial demonstration.
- Responsive design with Dark Mode support.

## Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js (version 18 or higher)
- npm

### Running the Application

The project is configured to work out-of-the-box using default local ports (5285 for Backend and 5173 for Frontend). No manual configuration is required for local execution.

1. **Start the Backend**:
   ```bash
   cd backend
   dotnet run
   ```
   The database will be automatically created and seeded on the first run.

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.


---
<br>
<br>

**Developed by Paulo Alexandre Medeiro - [LinkedIn](https://www.linkedin.com/in/pauloamedeiro/)**