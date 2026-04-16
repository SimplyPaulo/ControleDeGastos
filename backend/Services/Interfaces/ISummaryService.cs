namespace ExpenseTracker.Services.Interfaces
{
    public interface ISummaryService
    {
        Task<object> GetTotalsByUserAsync();
        Task<object> GetTotalsByCategoryAsync();
    }
}
