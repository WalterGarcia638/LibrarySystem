using System.ComponentModel.DataAnnotations;

namespace LibrarySystem.Model
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Title { get; set; }

        [Required]
        [MaxLength(100)]
        public string Author { get; set; }

        [Required]
        [MaxLength(13)]
        public string ISBN { get; set; }

        [MaxLength(50)]
        public string Genre { get; set; }

        public int Year { get; set; }
        public int Quantity { get; set; }
        public int TotalCopies { get; set; }
        public int AvailableCopies { get; set; }
    }
}
