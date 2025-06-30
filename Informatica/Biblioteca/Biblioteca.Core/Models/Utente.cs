using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Biblioteca.Core.Models
{
    public class Utente
    {
        private int id;
        private DateTime dataNascita;
        private string? nome;
        private string? cognome;
        private string? email;

        public int Id { get => id; set => id = value; }
        public DateTime DataNascita { get => dataNascita; set => dataNascita = value; }
        public string? Nome { get => nome; set => nome = value; }
        public string? Cognome { get => cognome; set => cognome = value; }
        public string? Email { get => email; set => email = value; }

        public override string ToString()
        {
            return $"{Id} - {Nome} {Cognome}";
        }
    }
}
