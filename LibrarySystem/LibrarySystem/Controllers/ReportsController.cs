using LibrarySystem.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibrarySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportRepository _reportRepo;

        public ReportsController(IReportRepository reportRepo)
        {
            _reportRepo = reportRepo;
        }

        [HttpGet("loans")]
        public IActionResult GetLoansByPeriod([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            if (start == default || end == default)
            {
                return BadRequest(new { message = "Debe proporcionar fechas válidas (start, end)." });
            }

            var loans = _reportRepo.GetLoansByPeriod(start, end);
            return Ok(loans);
        }

        [HttpGet("pending-fines")]
        public IActionResult GetUsersWithPendingFines()
        {
            var users = _reportRepo.GetUsersWithPendingFines();
            return Ok(users);
        }
    }
}