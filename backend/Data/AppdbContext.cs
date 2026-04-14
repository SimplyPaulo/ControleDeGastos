using ExpenseTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Person> People { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Aplicação da regra de negócio: Limite de caracteres para os campos de texto
            modelBuilder.Entity<Person>().Property(p => p.Name).HasMaxLength(200);
            modelBuilder.Entity<Category>().Property(c => c.Description).HasMaxLength(400);
            modelBuilder.Entity<Transaction>().Property(t => t.Description).HasMaxLength(400);

            // Regra: Em casos que se delete uma pessoa, todas a transações dessa pessoa deverão ser apagadas.
            // O OnDelete(DeleteBehavior.Cascade) garante isso diretamente no banco de dados.
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Person)
                .WithMany(p => p.Transactions)
                .HasForeignKey(t => t.PersonId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}