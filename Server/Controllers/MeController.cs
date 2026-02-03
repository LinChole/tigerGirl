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
    public async Task<IActionResult> Get()
    {
        if (!int.TryParse(Request.Cookies["uid"], out int uid))
        {
            return Unauthorized();
        }

        var users = await _data.GetUsersAsync();
        var u = users.FirstOrDefault(x => x.Id == uid);
        if (u == null) return NotFound();
        return Ok(new {
            u.Id,
            u.Name,
            u.Email,
            u.Phone,
            u.Role
        });
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] User u)
    {
        if (!int.TryParse(Request.Cookies["uid"], out int uid))
        {
            return Unauthorized();
        }

        var users = await _data.GetUsersAsync();
        var existing = users.FirstOrDefault(x => x.Id == uid);
        if (existing != null)
        {
            existing.Name = u.Name;
            existing.Phone = u.Phone;
            existing.Email = u.Email;
            var success = await _data.UpdateUserAsync(existing);
            return Ok(new { result = success });
        }
        return Ok(new { result = false, ErrorMsg = "User not found" });
    }
}
