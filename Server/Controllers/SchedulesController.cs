using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("schedules")]
public class SchedulesController : ControllerBase
{
    private readonly DataService _data;
    public SchedulesController(DataService data) => _data = data;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int? user)
    {
        int.TryParse(Request.Cookies["uid"], out int uid);
        string role = Request.Cookies["role"] ?? "";

        var schedules = await _data.GetSchedulesAsync();

        // If Admin (G), return all or filter by query param
        if (role.ToUpper() == "G")
        {
            if (user.HasValue)
            {
                var list = schedules.Where(s => s.UserId == user).ToList();
                return Ok(list);
            }
            return Ok(schedules);
        }

        // If Client (C) or others, only return their own
        if (uid > 0)
        {
             var list = schedules.Where(s => s.UserId == uid).ToList();
             return Ok(list);
        }

        return Unauthorized();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Schedule s)
    {
        // Logic to validate time? For now, just accept.
        var success = await _data.CreateAsync(s);
        return Ok(new { result = success });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] Schedule update)
    {
        var schedules = await _data.GetSchedulesAsync();
        var s = schedules.FirstOrDefault(x => x.Id == id);
        if (s != null)
        {
            s.Status = update.Status;
            var success = await _data.UpdateAsync(s);
            return Ok(new { result = success });
        }
        return Ok(new { result = false, ErrorMsg = "Not Found" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Cancel(int id)
    {
        var schedules = await _data.GetSchedulesAsync();
        var s = schedules.FirstOrDefault(x => x.Id == id);
        if (s != null)
        {
            await _data.DeleteAsync(s);
            return Ok(new { result = true });
        }
        return Ok(new { result = false, ErrorMsg = "Not Found" });
    }
}
