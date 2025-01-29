namespace LibrarySystem.Model.DTO.Loan
{
    public class GetLoanDTO
    {
        public int Id { get; set; }
        public string BookTitle { get; set; }
        public string UserName { get; set; }
        public DateTime LoanDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime? ActualReturnDate { get; set; }
        public double Fine { get; set; }
    }
}
