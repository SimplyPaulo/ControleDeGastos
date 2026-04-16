using ExpenseTracker.Data;
using ExpenseTracker.Models;
using ExpenseTracker.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Services
{
    public class SummaryService : ISummaryService
    {
        private readonly AppDbContext _context;

        public SummaryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<object> GetTotalsByUserAsync()
        {
            var users = await _context.Users.Include(p => p.Transactions).ToListAsync();

            var summary = users.Select(p => new
            {
                p.Id,
                Name = p.Name,
                TotalIncome = p.Transactions.Where(t => t.Type == TransactionType.Income).Sum(t => t.Amount),
                TotalExpense = p.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(t => t.Amount),
                Balance = p.Transactions.Where(t => t.Type == TransactionType.Income).Sum(t => t.Amount) - 
                          p.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(t => t.Amount)
            }).ToList();

            var overallIncome = summary.Sum(r => r.TotalIncome);
            var overallExpense = summary.Sum(r => r.TotalExpense);
            var netBalance = overallIncome - overallExpense;

            return new { Details = summary, Overall = new { Income = overallIncome, Expense = overallExpense, Balance = netBalance } };
        }

        public async Task<object> GetTotalsByCategoryAsync()
        {
            var categories = await _context.Categories.ToListAsync();
            var transactions = await _context.Transactions.ToListAsync();

            var summary = categories.Select(c => new
            {
                c.Id,
                Name = c.Description,
                TotalIncome = transactions.Where(t => t.CategoryId == c.Id && t.Type == TransactionType.Income).Sum(t => t.Amount),
                TotalExpense = transactions.Where(t => t.CategoryId == c.Id && t.Type == TransactionType.Expense).Sum(t => t.Amount),
                Balance = transactions.Where(t => t.CategoryId == c.Id && t.Type == TransactionType.Income).Sum(t => t.Amount) - 
                          transactions.Where(t => t.CategoryId == c.Id && t.Type == TransactionType.Expense).Sum(t => t.Amount)
            }).ToList();

            var overallIncome = summary.Sum(r => r.TotalIncome);
            var overallExpense = summary.Sum(r => r.TotalExpense);
            var netBalance = overallIncome - overallExpense;

            return new { Details = summary, Overall = new { Income = overallIncome, Expense = overallExpense, Balance = netBalance } };
        }
    }
}
