namespace LibrarySystem.Model.DTO.Loan
{
    public class CreateLoanDTO
    {
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateTime LoanDate { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
