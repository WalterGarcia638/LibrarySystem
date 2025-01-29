using AutoMapper;
using LibrarySystem.Model.DTO.Loan;
using LibrarySystem.Model;
using LibrarySystem.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace LibrarySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly ILoanRepository _loanRepository;
        private readonly IMapper _mapper;

        public LoanController(ILoanRepository loanRepository, IMapper mapper)
        {
            _loanRepository = loanRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetLoans()
        {
            var loans = _loanRepository.GetLoans();
            var loanDTOs = _mapper.Map<ICollection<GetLoanDTO>>(loans);

            return Ok(loanDTOs);
        }

        [HttpGet("{id:int}", Name = "GetLoanById")]
        public IActionResult GetLoanById(int id)
        {
            var loan = _loanRepository.GetLoanById(id);

            if (loan == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<GetLoanDTO>(loan));
        }

        [HttpPost]
        public IActionResult CreateLoan([FromBody] CreateLoanDTO loanDTO)
        {
            if (loanDTO == null)
                return BadRequest();

            var loan = _mapper.Map<Loan>(loanDTO);

            var created = _loanRepository.CreateLoan(loan);

            if (!created)
            {
                // Puede que no exista el libro o no haya copias disponibles
                return BadRequest(new { message = "No se pudo crear el préstamo (libro no existe o sin copias)." });
            }

            // Si todo sale bien
            return Ok(new { message = "Préstamo creado con éxito.", loanId = loan.Id });
        }

        [HttpPost("return/{loanId:int}")]
        public IActionResult RegisterReturn(int loanId)
        {
            var success = _loanRepository.RegisterReturn(loanId);
            if (!success)
            {
                return BadRequest(new { message = "No se pudo registrar la devolución (préstamo inexistente o ya devuelto)." });
            }

            var loan = _loanRepository.GetLoanById(loanId);
            return Ok(new
            {
                message = "Devolución registrada exitosamente.",
                fine = loan?.Fine
            });
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateLoan(int id, [FromBody] Loan loan)
        {
            if (loan == null || id != loan.Id)
            {
                return BadRequest(ModelState);
            }

            if (!_loanRepository.UpdateLoan(loan))
            {
                ModelState.AddModelError("", "Error updating the loan");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteLoan(int id)
        {
            var loan = _loanRepository.GetLoanById(id);

            if (loan == null)
            {
                return NotFound();
            }

            if (!_loanRepository.DeleteLoan(loan))
            {
                ModelState.AddModelError("", "Error deleting the loan");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}