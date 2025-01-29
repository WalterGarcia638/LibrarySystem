using LibrarySystem.Model;

namespace LibrarySystem.Repository.IRepository
{
    public interface ILoanRepository
    {
        ICollection<Loan> GetLoans();
        Loan GetLoanById(int id);
        bool CreateLoan(Loan loan);
        bool UpdateLoan(Loan loan);
        bool DeleteLoan(Loan loan);
        double CalculateFine(DateTime returnDate, DateTime actualReturnDate);
        bool RegisterReturn(int loanId);
        double CalculateFine(DateTime returnDate, DateTime actualReturnDate, double finePerDay);
        bool Save();
    }
}
