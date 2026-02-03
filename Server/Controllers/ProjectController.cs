using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("project")]
public class ProjectController : ControllerBase
{
    private readonly DataService _data;
    public ProjectController(DataService data) => _data = data;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _data.GetProjectsAsync());
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Project p)
    {
        // Supabase handles ID generation (SERIAL)
        var success = await _data.CreateAsync(p);
        return Ok(new { result = success });
    }
}
