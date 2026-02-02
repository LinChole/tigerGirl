using Server.Models;

namespace Server.Services;

public class DataService
{
    public List<User> Users { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
    public List<SubProject> SubProjects { get; set; } = new();
    public List<Schedule> Schedules { get; set; } = new();
    public List<ProjectTime> AvailableTimes { get; set; } = new();
    
    public DataService()
    {
        // Seed Users
        Users.Add(new User { Id = 1, Name = "Admin", Email = "admin@test.com", Role = "G", Password = "123" });
        Users.Add(new User { Id = 2, Name = "User1", Email = "user@test.com", Role = "C", Password = "123", Phone="0912345678" });

        // Seed Projects
        Projects.Add(new Project { Id = 1, Name = "美睫嫁接", HasChildren = true });
        Projects.Add(new Project { Id = 2, Name = "自然霧眉", HasChildren = false, Price = 5000, Duration = 120 });

        // Seed SubProjects
        SubProjects.Add(new SubProject { Id = 1, ProjectId = 1, Name = "6D 100根", Price = 1200, Duration = 120 });
        SubProjects.Add(new SubProject { Id = 2, ProjectId = 1, Name = "5D 100根", Price = 1100, Duration = 120 });

        // Seed Times (Mock next few days)
        var now = DateTime.Now.Date;
        AvailableTimes.Add(new ProjectTime { DateTime = now.AddDays(1).AddHours(10).ToString("yyyy-MM-dd HH:mm") });
        AvailableTimes.Add(new ProjectTime { DateTime = now.AddDays(1).AddHours(14).ToString("yyyy-MM-dd HH:mm") });
        AvailableTimes.Add(new ProjectTime { DateTime = now.AddDays(2).AddHours(10).ToString("yyyy-MM-dd HH:mm") });
    }
}
