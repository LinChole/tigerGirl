using Server.Models;
using Postgrest.Models;

namespace Server.Services;

public class DataService
{
    private readonly Supabase.Client _client;

    public DataService(Supabase.Client client)
    {
        _client = client;
    }

    public async Task<List<User>> GetUsersAsync()
    {
        var response = await _client.From<User>().Get();
        return response.Models;
    }

    public async Task<List<Project>> GetProjectsAsync()
    {
        var response = await _client.From<Project>().Get();
        return response.Models;
    }

    public async Task<List<SubProject>> GetSubProjectsAsync()
    {
        var response = await _client.From<SubProject>().Get();
        return response.Models;
    }

    public async Task<List<Schedule>> GetSchedulesAsync()
    {
        var response = await _client.From<Schedule>().Get();
        return response.Models;
    }

    public async Task<List<ProjectTime>> GetAvailableTimesAsync()
    {
        var response = await _client.From<ProjectTime>().Get();
        return response.Models;
    }

    public async Task<bool> UpdateUserAsync(User user)
    {
        var response = await _client.From<User>().Update(user);
        return response.Models.Count > 0;
    }

    public async Task<bool> CreateAsync<T>(T model) where T : BaseModel, new()
    {
        var response = await _client.From<T>().Insert(model);
        return response.Models.Count > 0;
    }

    public async Task<bool> UpdateAsync<T>(T model) where T : BaseModel, new()
    {
        var response = await _client.From<T>().Update(model);
        return response.Models.Count > 0;
    }

    public async Task<bool> DeleteAsync<T>(T model) where T : BaseModel, new()
    {
        await _client.From<T>().Delete(model);
        return true;
    }

    public async Task<User?> GetUserByEmailAndPasswordAsync(string email, string password)
    {
        var response = await _client.From<User>()
            .Filter("email", Postgrest.Constants.Operator.Equals, email)
            .Filter("password", Postgrest.Constants.Operator.Equals, password)
            .Single();
        return response;
    }
}
