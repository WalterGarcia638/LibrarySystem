using AutoMapper;
using LibrarySystem.Model.DTO.Book;
using LibrarySystem.Model;
using LibrarySystem.Model.DTO.Loan;

namespace LibrarySystem.Mapper
{
    public class LibrarySystemMapper : Profile
    {
        public LibrarySystemMapper() 
        {
            CreateMap<Book, GetBookDTO>();
            CreateMap<BookDTO, Book>();

            CreateMap<Loan, GetLoanDTO>()
             .ForMember(dto => dto.BookTitle, opt => opt.MapFrom(src => src.Book.Title))
             .ForMember(dto => dto.UserName, opt => opt.MapFrom(src => src.User.Name));

            CreateMap<CreateLoanDTO, Loan>();
        }
    }
}
