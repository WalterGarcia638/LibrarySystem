using LibrarySystem.Model;

namespace LibrarySystem.Repository.IRepository
{
    public interface IAuthRepository
    {
        Users GetUserByUsername(string username);
        bool UserExists(string username);
        void CreateUser(Users user);
        Users ValidateUser(string username, string password);
        string GenerateJwtToken(Users user);
        bool Save();
    }
}
