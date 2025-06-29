using Biblioteca.Core.Models;
using Microsoft.Extensions.Configuration;
using Biblioteca.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();
app.UseStaticFiles();

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Database db = new Database(connectionString);

try
{
    using var conn = db.GetConnection();
    conn.Open();
    Console.WriteLine("Connessione riuscita.");
}
catch (Exception ex)
{
    Console.WriteLine("Errore di connesione: " + ex.Message);
}

app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);

app.Run();