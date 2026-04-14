using System.Text.Json.Serialization;

namespace ExpenseTracker.Models
{
    public enum TransactionType { Expense, Income }

    public class Transaction
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        
        public int CategoryId { get; set; }
        [JsonIgnore]
        public Category? Category { get; set; }

        public int PersonId { get; set; }
        [JsonIgnore]
        public Person? Person { get; set; }
    }
}