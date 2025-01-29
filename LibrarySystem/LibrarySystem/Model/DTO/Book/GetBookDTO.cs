﻿namespace LibrarySystem.Model.DTO.Book
{
    public class GetBookDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN { get; set; }
        public string Genre { get; set; }
        public int Year { get; set; }
        public int Quantity { get; set; }
        public int TotalCopies { get; set; }
    }
}
