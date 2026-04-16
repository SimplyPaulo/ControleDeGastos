using ExpenseTracker.Models;

namespace ExpenseTracker.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<IEnumerable<Transaction>> GetAllAsync();
        Task<Transaction> CreateAsync(Transaction transaction);
        Task DeleteAsync(int id);
    }
}
