using LibrarySystem.Model;

namespace LibrarySystem.Repository.IRepository
{
    public interface IReportRepository
    {
        /// <summary>
        /// Obtiene préstamos dentro de un rango de fechas (LoanDate).
        /// </summary>
        /// <param name="start">Fecha inicial</param>
        /// <param name="end">Fecha final</param>
        /// <returns>Lista de préstamos</returns>
        ICollection<Loan> GetLoansByPeriod(DateTime start, DateTime end);

        /// <summary>
        /// Obtiene usuarios que tengan multa pendiente (Fine > 0) en alguno de sus préstamos.
        /// </summary>
        /// <returns>Lista de usuarios</returns>
        ICollection<Users> GetUsersWithPendingFines();
    }
}

