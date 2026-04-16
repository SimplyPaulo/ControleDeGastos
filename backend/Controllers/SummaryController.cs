using ExpenseTracker.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SummaryController : ControllerBase
    {
        private readonly ISummaryService _summaryService;

        public SummaryController(ISummaryService summaryService)
        {
            _summaryService = summaryService;
        }

        [HttpGet("Users")]
        public async Task<IActionResult> GetTotalsByUser()
        {
            try
            {
                var summary = await _summaryService.GetTotalsByUserAsync();
                return Ok(summary);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("Categories")]
        public async Task<IActionResult> GetTotalsByCategory()
        {
            try
            {
                var summary = await _summaryService.GetTotalsByCategoryAsync();
                return Ok(summary);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}