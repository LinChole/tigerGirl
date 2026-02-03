using Postgrest.Attributes;
using Postgrest.Models;

namespace Server.Models;

[Table("available_times")]
public class ProjectTime : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("date_time")]
    public string DateTime { get; set; } = string.Empty;
    
    [Column("selected")]
    public bool Selected { get; set; }
}
