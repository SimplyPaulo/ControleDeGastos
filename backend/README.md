# Expense Tracker Backend

This is the API layer for the Expense Tracker application, developed using ASP.NET Core 8.

## Technology Stack

- **Framework**: .NET 8 
- **ORM**: Entity Framework Core
- **Database**: SQLite 
- **Documentation**: Swagger/OpenAPI

## Architecture and Key Features

- **Database Initialization**: The application automatically applies migrations and seeds initial data (User: "Recrutador", Categories, and sample Transactions) on startup if the database is empty, but you can still add more users, categories and transactions if needed.

- **Business Logic**: 
  - Cascading deletes for users and their associated transactions.
  - Validation to prevent deletion of categories that are linked to existing transactions.
  - Age-restricted transaction types (Users < 18 are limited to expenses).

## Execution

1. Restore dependencies:
   ```bash
   dotnet restore
   ```
2. Run the application:
   ```bash
   dotnet run
   ```
   The API provides a Swagger UI at `http://localhost:5285/swagger`. The database file `expense_tracker.db` is generated automatically.

## Development Notes

- **Database File**: `expense_tracker.db` is generated in the root of the backend folder.

---
<br>
<br>

**Developed by Paulo Alexandre Medeiro - [LinkedIn](https://www.linkedin.com/in/pauloamedeiro/)**