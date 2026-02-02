using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("me")]
public class MeController : ControllerBase
{
    private readonly DataService _data;
    public MeController(DataService data) => _data = data;

    [HttpGet]
    public IActionResult Get()
    {
        // Mock: Return User 2 (Client). In real app, check Auth token/cookie.
        // If we implemented cookie based auth in Login, we could read it here.
        // For now, simplify for demo.
        var u = _data.Users.FirstOrDefault(x => x.Id == 2); 
        return Ok(u);
    }

    [HttpPut]
    public IActionResult Update([FromBody] User u)
    {
        // Mock: Update User 2
        var existing = _data.Users.FirstOrDefault(x => x.Id == 2); 
        if (existing != null)
        {
            existing.Name = u.Name;
            existing.Phone = u.Phone;
            existing.Email = u.Email;
            return Ok(new { result = true });
        }
        return Ok(new { result = false, ErrorMsg = "User not found" });
    }
}
