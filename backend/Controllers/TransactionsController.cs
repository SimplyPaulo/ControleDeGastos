using ExpenseTracker.Data;
using ExpenseTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        // Listagem de transações (com os dados de Pessoa e Categoria incluídos)
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transactions = await _context.Transactions
                .Include(t => t.Person)
                .Include(t => t.Category)
                .ToListAsync();
                
            return Ok(transactions);
        }

        // Criação de Transação com validações de idade e categoria (obrigatorio)
        [HttpPost]
        public async Task<IActionResult> Create(Transaction transaction)
        {
            if (transaction.Amount <= 0)
                return BadRequest("O valor da transação deve ser positivo.");

            var person = await _context.People.FindAsync(transaction.PersonId);
            if (person == null) return NotFound("Pessoa não encontrada.");

            if (person.Age < 18 && transaction.Type == TransactionType.Income)
                return BadRequest("Menores de idade só podem registrar despesas.");

            var category = await _context.Categories.FindAsync(transaction.CategoryId);
            if (category == null) return NotFound("Categoria não encontrada.");

            bool isInvalidCategory = 
                (transaction.Type == TransactionType.Expense && category.Purpose == CategoryPurpose.Income) ||
                (transaction.Type == TransactionType.Income && category.Purpose == CategoryPurpose.Expense);

            if (isInvalidCategory)
                return BadRequest("A categoria escolhida não é compatível com o tipo de transação.");

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }

        // Excluir transação (adicional)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null) return NotFound("Transação não encontrada.");

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
    }
}