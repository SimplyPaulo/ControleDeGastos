using ExpenseTracker.Data;
using ExpenseTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PeopleController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _context.People.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create(Person person)
        {
            _context.People.Add(person);
            await _context.SaveChangesAsync();
            return Ok(person);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Person person)
        {
            if (id != person.Id) return BadRequest("IDs não conferem.");
            
            _context.Entry(person).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var person = await _context.People.FindAsync(id);
            if (person == null) return NotFound("Pessoa não encontrada.");

            _context.People.Remove(person);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}