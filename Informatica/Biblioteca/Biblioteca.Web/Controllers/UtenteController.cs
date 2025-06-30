using Biblioteca.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.Web.Controllers
{
    public class UtenteController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly UtenteRepository _repoUtente;

        public UtenteController(IConfiguration configuration)
        {
            _configuration = configuration;
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            _repoUtente = new UtenteRepository(connectionString);
        }

        public IActionResult Index()
        {
            ViewBag.Title = "Utenti";
            return View(_repoUtente.GetAll());
        }
    }
}
