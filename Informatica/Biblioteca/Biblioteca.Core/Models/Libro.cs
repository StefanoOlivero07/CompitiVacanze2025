namespace Biblioteca.Core.Models
{
    public class Libro
    {
        public int Id { get; set; }
        public string? Titolo { get; set; }
        public int IdAutore { get; set; }
        public int Anno { get; set; }
        public int IdPaese { get; set; }
        public int IdLingua { get; set; }
        public double Costolibro { get; set; }
        public int Pagine { get; set; }
    }
}
