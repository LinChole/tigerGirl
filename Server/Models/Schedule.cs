using Postgrest.Attributes;
using Postgrest.Models;

namespace Server.Models;

[Table("schedules")]
public class Schedule : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }
    
    [Column("user_id")]
    public int UserId { get; set; }
    
    [Column("service")]
    public string Service { get; set; } = string.Empty;
    
    [Column("date")]
    public string Date { get; set; } = string.Empty;
    
    [Column("status")]
    public int Status { get; set; } // 0: Pending

    public string ErrorMsg { get; set; } = string.Empty; // For response
}
