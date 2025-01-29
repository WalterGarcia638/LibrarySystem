using LibrarySystem.Model;

namespace LibrarySystem.Repository.IRepository
{
    public interface IUserRepository
    {
        ICollection<Users> GetUsers();
        Users GetUser(int id);
        bool UpdateUser(Users user);
        bool DeleteUser(Users user);
        bool Save();
    }
}
