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
    public IActionResult Get([FromQuery] int? user)
    {
        if (user.HasValue)
        {
            var list = _data.Schedules.Where(s => s.UserId == user).ToList();
            return Ok(list);
        }
        // Admin: Return all
        return Ok(_data.Schedules);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Schedule s)
    {
        s.Id = _data.Schedules.Count + 1;
        // Logic to validate time? For now, just accept.
        _data.Schedules.Add(s);
        return Ok(new { result = true });
    }

    [HttpPut("{id}")]
    public IActionResult UpdateStatus(int id, [FromBody] Schedule update)
    {
        var s = _data.Schedules.FirstOrDefault(x => x.Id == id);
        if (s != null)
        {
            s.Status = update.Status;
            return Ok(new { result = true });
        }
        return Ok(new { result = false, ErrorMsg = "Not Found" });
    }

    [HttpDelete("{id}")]
    public IActionResult Cancel(int id)
    {
        var s = _data.Schedules.FirstOrDefault(x => x.Id == id);
        if (s != null)
        {
            _data.Schedules.Remove(s);
            return Ok(new { result = true });
        }
        return Ok(new { result = false, ErrorMsg = "Not Found" });
    }
}
