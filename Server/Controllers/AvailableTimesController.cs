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
    public IActionResult Get()
    {
        return Ok(_data.AvailableTimes);
    }
}
