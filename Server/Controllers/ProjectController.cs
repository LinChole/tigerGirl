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
    public IActionResult Get()
    {
        return Ok(_data.Projects);
    }
    
    [HttpPost]
    public IActionResult Create([FromBody] Project p)
    {
        p.Id = _data.Projects.Count + 1;
        _data.Projects.Add(p);
        return Ok(new { result = true });
    }
}
