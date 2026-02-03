using Postgrest.Attributes;
using Postgrest.Models;

namespace Server.Models;

[Table("users")]
public class User : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }
    
    [Column("name")]
    public string Name { get; set; } = string.Empty;
    
    [Column("email")]
    public string Email { get; set; } = string.Empty;
    
    [Column("phone")]
    public string Phone { get; set; } = string.Empty;
    
    [Column("role")]
    public string Role { get; set; } = "C"; // "C" for Client, "G" for Admin
    
    [Column("password")]
    public string Password { get; set; } = string.Empty;
}
