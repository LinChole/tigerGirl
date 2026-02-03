using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("availableTimes")]
public class AvailableTimesController : ControllerBase
{
    private readonly DataService _data;
    public AvailableTimesController(DataService data) => _data = data;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _data.GetAvailableTimesAsync());
    }
}
