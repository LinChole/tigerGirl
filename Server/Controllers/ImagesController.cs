using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("images")]
public class ImagesController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        // Return dummy images list.
        // Frontend expects an array, likely of strings or objects with 'url'.
        // Looking at homePage.js, it just puts body.
        // Let's assume array of strings or { src: '...' }
        // For safety, return empty list.
        return Ok(new List<object>()); 
    }
}
