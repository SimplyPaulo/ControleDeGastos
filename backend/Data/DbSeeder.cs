using ExpenseTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Data
{
    public static class DbSeeder
    {
        public static void Seed(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();

                // Ensure the database exists and migrations are applied
                context.Database.Migrate();

                // Seed Users if empty
                if (!context.Users.Any())
                {
                    var recruiter = new User
                    {
                        Name = "Recrutador",
                        Age = 30
                    };
                    context.Users.Add(recruiter);
                    context.SaveChanges();
                }

                // Seed Categories if empty
                if (!context.Categories.Any())
                {
                    context.Categories.AddRange(
                        new Category { Description = "Alimentação", Purpose = CategoryPurpose.Expense },
                        new Category { Description = "Salário", Purpose = CategoryPurpose.Income },
                        new Category { Description = "Transporte", Purpose = CategoryPurpose.Expense },
                        new Category { Description = "Lazer", Purpose = CategoryPurpose.Expense }
                    );
                    context.SaveChanges();
                }

                // Seed initial Transaction if empty
                if (!context.Transactions.Any())
                {
                    var user = context.Users.FirstOrDefault(u => u.Name == "Recrutador");
                    var catSalary = context.Categories.FirstOrDefault(c => c.Description == "Salário");
                    var catFood = context.Categories.FirstOrDefault(c => c.Description == "Alimentação");

                    if (user != null && catSalary != null && catFood != null)
                    {
                        context.Transactions.AddRange(
                            new Transaction 
                            { 
                                Description = "Salário", 
                                Amount = 5000.00m, 
                                Type = TransactionType.Income,
                                UserId = user.Id,
                                CategoryId = catSalary.Id
                            },
                            new Transaction 
                            { 
                                Description = "Mercado", 
                                Amount = 450.00m, 
                                Type = TransactionType.Expense,
                                UserId = user.Id,
                                CategoryId = catFood.Id
                            }
                        );
                        context.SaveChanges();
                    }
                }
            }
        }
    }
}
