namespace Server.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Role { get; set; } = "C"; // "C" for Client, "G" for Admin
    public string Password { get; set; } = string.Empty;
}
