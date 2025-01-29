﻿namespace LibrarySystem.Model
{
    public class Loan
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateTime LoanDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime? ActualReturnDate { get; set; }
        public double Fine { get; set; }

        // Relaciones
        public Users User { get; set; }
        public Book Book { get; set; }
    }
}
