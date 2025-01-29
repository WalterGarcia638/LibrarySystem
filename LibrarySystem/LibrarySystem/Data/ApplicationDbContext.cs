using LibrarySystem.Model;
using Microsoft.EntityFrameworkCore;

namespace LibrarySystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<Loan> Loan { get; set; }
    }
}
