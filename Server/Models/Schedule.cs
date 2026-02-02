namespace Server.Models;

public class Schedule
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Service { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public int Status { get; set; } // 0: Pending
    public string ErrorMsg { get; set; } = string.Empty; // For response
}
