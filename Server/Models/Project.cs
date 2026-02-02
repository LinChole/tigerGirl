namespace Server.Models;

public class SubProject
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Duration { get; set; }
}

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool HasChildren { get; set; }
    public decimal Price { get; set; }
    public int Duration { get; set; }
    // Intentionally simple structure matching frontend expectations
}
