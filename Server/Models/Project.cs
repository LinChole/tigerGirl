using Postgrest.Attributes;
using Postgrest.Models;

namespace Server.Models;

[Table("sub_projects")]
public class SubProject : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }
    
    [Column("project_id")]
    public int ProjectId { get; set; }
    
    [Column("name")]
    public string Name { get; set; } = string.Empty;
    
    [Column("price")]
    public decimal Price { get; set; }
    
    [Column("duration")]
    public int Duration { get; set; }
}

[Table("projects")]
public class Project : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }
    
    [Column("name")]
    public string Name { get; set; } = string.Empty;
    
    [Column("has_children")]
    public bool HasChildren { get; set; }
    
    [Column("price")]
    public decimal Price { get; set; }
    
    [Column("duration")]
    public int Duration { get; set; }
    // Intentionally simple structure matching frontend expectations
}
