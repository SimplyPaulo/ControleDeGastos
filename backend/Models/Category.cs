namespace ExpenseTracker.Models
{
    public enum CategoryPurpose { Expense, Income, Both }

    public class Category
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public CategoryPurpose Purpose { get; set; }
    }
}