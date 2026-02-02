using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("subproject")]
public class SubProjectController : ControllerBase
{
    private readonly DataService _data;
    public SubProjectController(DataService data) => _data = data;

    [HttpGet]
    public IActionResult Get([FromQuery] int pid)
    {
        var subs = _data.SubProjects.Where(s => s.ProjectId == pid).ToList();
        return Ok(subs);
    }
}
