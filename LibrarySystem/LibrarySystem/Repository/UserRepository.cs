using LibrarySystem.Data;
using LibrarySystem.Model;
using LibrarySystem.Repository.IRepository;

namespace LibrarySystem.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public ICollection<Users> GetUsers()
        {
            return _db.Users
                .OrderBy(u => u.Id)
                .ToList();
        }

        public Users GetUser(int id)
        {
            return _db.Users
                .FirstOrDefault(u => u.Id == id);
        }

        public bool UpdateUser(Users user)
        {
            _db.Users.Update(user);
            return Save();
        }
        public bool DeleteUser(Users user)
        {
            _db.Users.Remove(user);
            return Save();
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0;
        }
    }
}