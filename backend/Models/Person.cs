using System.Text.Json.Serialization;

namespace ExpenseTracker.Models
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }

        [JsonIgnore]
        public List<Transaction> Transactions { get; set; } = new();
    }
}