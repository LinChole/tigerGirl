using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly DataService _data;
    public LoginController(DataService data) => _data = data;

    [HttpPost]
    public IActionResult Login([FromBody] LoginRequest req)
    {
        var user = _data.Users.FirstOrDefault(u => u.Email == req.Email && u.Password == req.Password);
        if (user != null)
        {
            return Ok(new { result = true, role = user.Role, uid = user.Id });
        }
        return Ok(new { result = false, ErrorMsg = "帳號或密碼錯誤" });
    }

    public class LoginRequest 
    { 
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
