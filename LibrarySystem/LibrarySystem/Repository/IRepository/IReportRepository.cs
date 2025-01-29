using LibrarySystem.Model;

namespace LibrarySystem.Repository.IRepository
{
    public interface IReportRepository
    {
        ICollection<Loan> GetLoansByPeriod(DateTime start, DateTime end);
        ICollection<Users> GetUsersWithPendingFines();
    }
}

