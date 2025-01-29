using LibrarySystem.Data;
using LibrarySystem.Model;
using LibrarySystem.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace LibrarySystem.Repository
{
    public class LoanRepository : ILoanRepository
    {
        private readonly ApplicationDbContext _db;

        public LoanRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public ICollection<Loan> GetLoans()
        {
            return _db.Loan
                .Include(l => l.Book)
                .Include(l => l.User)
                .OrderBy(l => l.Id)
                .ToList();
        }

        public Loan GetLoanById(int id)
        {
            return _db.Loan
                .Include(l => l.Book)
                .Include(l => l.User)
                .FirstOrDefault(l => l.Id == id);
        }

        public bool CreateLoan(Loan loan)
        {
            // Verificar si el libro existe y está disponible
            var book = _db.Book.FirstOrDefault(b => b.Id == loan.BookId);
            if (book == null)
            {
                // El libro no existe
                return false;
            }

            if (book.AvailableCopies <= 0)
            {
                // No hay copias disponibles para prestar
                return false;
            }

            // Reservar una copia
            book.AvailableCopies -= 1;
            _db.Book.Update(book);

            // Registrar el préstamo
            _db.Loan.Add(loan);

            return Save();
        }

        public bool UpdateLoan(Loan loan)
        {
            _db.Loan.Update(loan);
            return Save();
        }

        public bool DeleteLoan(Loan loan)
        {
            _db.Loan.Remove(loan);
            return Save();
        }

        public double CalculateFine(DateTime returnDate, DateTime actualReturnDate)
        {
            var daysLate = (actualReturnDate - returnDate).Days;

            if (daysLate > 0)
            {
                return daysLate * 1.0; // Ejemplo: $1 por día de retraso
            }

            return 0;
        }

        public bool RegisterReturn(int loanId)
        {
            var loan = GetLoanById(loanId);
            if (loan == null)
                return false;

            // Verificar que no se haya devuelto antes
            if (loan.ActualReturnDate != null)
            {
                // Ya se devolvió; no podemos registrarlo de nuevo
                return false;
            }

            // Fecha real de devolución = ahora
            loan.ActualReturnDate = DateTime.Now;

            // Calcular multa si hay retraso
            if (loan.ActualReturnDate > loan.ReturnDate)
            {
                loan.Fine = CalculateFine(loan.ReturnDate, loan.ActualReturnDate.Value, 5.0);
            }

            // Devolver la copia al inventario
            if (loan.Book != null)
            {
                loan.Book.AvailableCopies += 1;
                _db.Book.Update(loan.Book);
            }

            // Guardar cambios del préstamo
            _db.Loan.Update(loan);

            return Save();
        }

        public double CalculateFine(DateTime returnDate, DateTime actualReturnDate, double finePerDay)
        {
            var daysLate = (actualReturnDate - returnDate).Days;
            return (daysLate > 0) ? daysLate * finePerDay : 0;
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0;
        }
    }
}