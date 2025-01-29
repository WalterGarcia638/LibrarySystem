using LibrarySystem.Data;
using LibrarySystem.Model;
using LibrarySystem.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace LibrarySystem.Repository
{
    public class ReportRepository : IReportRepository
    {
        private readonly ApplicationDbContext _db;

        public ReportRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public ICollection<Loan> GetLoansByPeriod(DateTime start, DateTime end)
        {
            return _db.Loan
                .Include(l => l.Book)
                .Include(l => l.User)
                .Where(l => l.LoanDate >= start && l.LoanDate <= end)
                .OrderBy(l => l.LoanDate)
                .ToList();
        }

        public ICollection<Users> GetUsersWithPendingFines()
        {
            var userIds = _db.Loan
                .Where(l => l.Fine > 0)
                .Select(l => l.UserId)
                .Distinct()
                .ToList();

            var users = _db.Users
                .Where(u => userIds.Contains(u.Id))
                .OrderBy(u => u.Name)
                .ToList();

            return users;
        }
    }
}