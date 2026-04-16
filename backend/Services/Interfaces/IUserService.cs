using ExpenseTracker.Models;

namespace ExpenseTracker.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> CreateAsync(User user);
        Task UpdateAsync(int id, User user);
        Task DeleteAsync(int id);
    }
}
