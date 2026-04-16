using ExpenseTracker.Models;

namespace ExpenseTracker.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category> CreateAsync(Category category);
        Task DeleteAsync(int id);
    }
}
