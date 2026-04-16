using ExpenseTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Character limit for text fields
            modelBuilder.Entity<User>().Property(p => p.Name).HasMaxLength(200);
            modelBuilder.Entity<Category>().Property(c => c.Description).HasMaxLength(400);
            modelBuilder.Entity<Transaction>().Property(t => t.Description).HasMaxLength(400);

            // Cascade delete: If a user is deleted, all their transactions must be removed.
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(p => p.Transactions)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}