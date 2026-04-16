using ExpenseTracker.Data;
using ExpenseTracker.Models;
using ExpenseTracker.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transaction>> GetAllAsync()
        {
            return await _context.Transactions
                .Include(t => t.User)
                .Include(t => t.Category)
                .ToListAsync();
        }

        public async Task<Transaction> CreateAsync(Transaction transaction)
        {
            if (transaction.Amount <= 0)
            {
                throw new ArgumentException("O valor da transação deve ser positivo.");
            }

            var user = await _context.Users.FindAsync(transaction.UserId);
            if (user == null)
            {
                throw new KeyNotFoundException("Usuário não encontrado.");
            }

            if (user.Age < 18 && transaction.Type == TransactionType.Income)
            {
                throw new ArgumentException("Menores de idade só podem registrar despesas.");
            }

            var category = await _context.Categories.FindAsync(transaction.CategoryId);
            if (category == null)
            {
                throw new KeyNotFoundException("Categoria não encontrada.");
            }

            bool isInvalidCategory = 
                (transaction.Type == TransactionType.Expense && category.Purpose == CategoryPurpose.Income) ||
                (transaction.Type == TransactionType.Income && category.Purpose == CategoryPurpose.Expense);

            if (isInvalidCategory)
            {
                throw new ArgumentException("A categoria escolhida não é compatível com o tipo de transação.");
            }

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return transaction;
        }

        public async Task DeleteAsync(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                throw new KeyNotFoundException("Transação não encontrada.");
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
        }
    }
}
