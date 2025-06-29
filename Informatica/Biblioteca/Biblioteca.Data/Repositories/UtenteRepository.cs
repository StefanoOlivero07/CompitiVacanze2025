using Biblioteca.Core.Models;
using Microsoft.Data.SqlClient;
using System.Data.SqlTypes;

namespace Biblioteca.Data.Repositories
{
    public class UtenteRepository
    {
        private readonly Database _db;

        public UtenteRepository(string connStr)
        {
            _db = new Database(connStr);
        }

        public List<Utente> GetAll()
        {
            var utenti = new List<Utente>();
            string query = @"SELECT * FROM Utenti";
            using var reader = _db.ExecuteReader(query);

            while (reader.Read())
            {
                var utente = new Utente();

                utenti.Add(new Utente
                {
                    Id = reader.GetInt32(0),
                    DataNascita = reader.GetDateTime(1),
                    Nome = reader.GetString(2),
                    Cognome = reader.GetString(3),
                    Email = reader.GetString(4)
                });
            }

            return utenti;
        }
    }
}
