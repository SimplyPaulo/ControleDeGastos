using ExpenseTracker.Data;
using ExpenseTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SummaryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SummaryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("People")]
        public async Task<IActionResult> GetTotalsByPerson()
        {
            // Traz as pessoas e suas transações para a memória do C# primeiro
            var people = await _context.People.Include(p => p.Transactions).ToListAsync();

            // Faz o cálculo na memória, evitando a limitação do SQLite com decimais
            var summary = people.Select(p => new
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

            return Ok(new { Details = summary, Overall = new { Income = overallIncome, Expense = overallExpense, Balance = netBalance } });
        }

        [HttpGet("Categories")]
        public async Task<IActionResult> GetTotalsByCategory()
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

            return Ok(new { Details = summary, Overall = new { Income = overallIncome, Expense = overallExpense, Balance = netBalance } });
        }
    }
}