using FoodGappBackend_WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using static FoodGappBackend_WebAPI.Utils.Utilities;

namespace FoodGappBackend_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : BaseController
    {
        private readonly IConfiguration _configuration;

        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Hardcoded admin credentials for frontend use
        private const string HardcodedAdminUsername = "admin";
        private const string HardcodedAdminPassword = "123";

        // Admin login (hardcoded for frontend)
        [HttpPost("login")]
        public IActionResult AdminLogin([FromBody] AdminLoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { error = "Username and Password are required." });

            if (request.Username == HardcodedAdminUsername && request.Password == HardcodedAdminPassword)
            {
                return Ok(new
                {
                    message = "Admin login successful",
                    adminId = 0,
                    adminName = "Admin",
                    role = "Admin"
                });
            }

            // Fallback to DB-based admin login (optional)
            var user = _userMgr.GetUserByEmail(request.Username);
            if (user == null)
                return BadRequest(new { error = "Invalid admin credentials" });

            if (_userMgr.SignIn(request.Username, request.Password, ref ErrorMessage) != ErrorCode.Success)
                return BadRequest(new { error = "Invalid admin credentials" });

            var userRole = _userMgr.GetUsersRoleByUserId(user.UserId);
            if (userRole == null)
                return BadRequest(new { error = "User role not found" });

            var roleName = _userMgr.GetRoleNameByRoleId(userRole.RoleId);
            if (roleName == null || string.IsNullOrEmpty(roleName.RoleName) || !roleName.RoleName.Equals("Admin", StringComparison.OrdinalIgnoreCase))
                return BadRequest(new { error = "Access denied. Admin privileges required." });

            return Ok(new
            {
                message = "Admin login successful",
                adminId = user.UserId,
                adminName = $"{user.FirstName} {user.LastName}".Trim(),
                role = roleName.RoleName
            });
        }

        // Get all users with their roles and status
        [HttpGet("users")]
        public IActionResult GetAllUsers([FromQuery] string? search = null)
        {
            try
            {
                var users = _userMgr.GetAllUsers();

                if (users == null || !users.Any())
                    return Ok(new { users = new List<object>(), total = 0 });

                var userList = users.Select(user =>
                {
                    var userRole = _userMgr.GetUsersRoleByUserId(user.UserId);
                    var roleName = userRole != null ? _userMgr.GetRoleNameByRoleId(userRole.RoleId)?.RoleName ?? "User" : "User";
                    return new
                    {
                        id = user.UserId,
                        name = $"{user.FirstName} {user.LastName}".Trim(),
                        email = user.Email,
                        role = roleName,
                        status = user.IsActive == true ? "Active" : "Inactive",
                        dateCreated = "N/A",
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        isActive = user.IsActive ?? false
                    };
                }).ToList();

                if (!string.IsNullOrWhiteSpace(search))
                {
                    userList = userList.Where(u =>
                        (u.name != null && u.name.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                        (u.email != null && u.email.Contains(search, StringComparison.OrdinalIgnoreCase))
                    ).ToList();
                }

                return Ok(new { users = userList, total = userList.Count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while fetching users", details = ex.Message });
            }
        }

        // Get user count statistics
        [HttpGet("users/stats")]
        public IActionResult GetUserStats()
        {
            try
            {
                var allUsers = _userMgr.GetAllUsers();

                if (allUsers == null)
                    return Ok(new { total = 0, active = 0, inactive = 0 });

                var total = allUsers.Count();
                var active = allUsers.Count(u => u.IsActive == true);
                var inactive = total - active;

                return Ok(new { total, active, inactive });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while fetching user statistics", details = ex.Message });
            }
        }

        // Toggle user status (Active/Inactive)
        [HttpPatch("users/{userId}/toggle-status")]
        public IActionResult ToggleUserStatus(int userId)
        {
            try
            {
                var user = _userMgr.GetUserById(userId);
                if (user == null)
                    return NotFound(new { error = "User not found" });

                user.IsActive = !(user.IsActive ?? false);

                if (_userMgr.UpdateUser(user, ref ErrorMessage) != ErrorCode.Success)
                    return BadRequest(new { error = "Failed to update user status", details = ErrorMessage });

                return Ok(new
                {
                    message = $"User status updated to {(user.IsActive == true ? "Active" : "Inactive")}",
                    userId = user.UserId,
                    isActive = user.IsActive,
                    status = user.IsActive == true ? "Active" : "Inactive"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while updating user status", details = ex.Message });
            }
        }

        // Update user status explicitly
        [HttpPatch("users/{userId}/status")]
        public IActionResult UpdateUserStatus(int userId, [FromBody] UpdateUserStatusRequest request)
        {
            try
            {
                var user = _userMgr.GetUserById(userId);
                if (user == null)
                    return NotFound(new { error = "User not found" });

                user.IsActive = request.IsActive;

                if (_userMgr.UpdateUser(user, ref ErrorMessage) != ErrorCode.Success)
                    return BadRequest(new { error = "Failed to update user status", details = ErrorMessage });

                return Ok(new
                {
                    message = $"User status updated to {(user.IsActive == true ? "Active" : "Inactive")}",
                    userId = user.UserId,
                    isActive = user.IsActive,
                    status = user.IsActive == true ? "Active" : "Inactive"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while updating user status", details = ex.Message });
            }
        }

        // Get user details by ID
        [HttpGet("users/{userId}")]
        public IActionResult GetUserById(int userId)
        {
            try
            {
                var user = _userMgr.GetUserById(userId);
                if (user == null)
                    return NotFound(new { error = "User not found" });

                var userRole = _userMgr.GetUsersRoleByUserId(user.UserId);
                var roleName = userRole != null ? _userMgr.GetRoleNameByRoleId(userRole.RoleId)?.RoleName ?? "User" : "User";

                return Ok(new
                {
                    id = user.UserId,
                    name = $"{user.FirstName} {user.LastName}".Trim(),
                    email = user.Email,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    role = roleName,
                    status = user.IsActive == true ? "Active" : "Inactive",
                    isActive = user.IsActive ?? false,
                    dateCreated = "N/A",
                    age = user.Age,
                    weight = user.Weight,
                    height = user.Height,
                    userLevel = user.UserLevel ?? 1,
                    userCurrentExperience = user.UserCurrentExperience ?? 0
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while fetching user details", details = ex.Message });
            }
        }

        // Get users by role
        [HttpGet("users/by-role/{roleName}")]
        public IActionResult GetUsersByRole(string roleName)
        {
            try
            {
                var roles = _roleRepo.GetAll();
                if (roles == null)
                    return NotFound(new { error = "Role not found" });

                var role = roles.FirstOrDefault(r => r.RoleName != null && r.RoleName.Equals(roleName, StringComparison.OrdinalIgnoreCase));
                if (role == null)
                    return NotFound(new { error = "Role not found" });

                var userRoles = _userRoleRepo.GetAll().Where(ur => ur.RoleId == role.RoleId).ToList();
                var users = new List<object>();

                foreach (var userRole in userRoles)
                {
                    if (userRole.UserId == null) continue;
                    var user = _userMgr.GetUserById(userRole.UserId.Value);
                    if (user != null)
                    {
                        users.Add(new
                        {
                            id = user.UserId,
                            name = $"{user.FirstName} {user.LastName}".Trim(),
                            email = user.Email,
                            role = roleName,
                            status = user.IsActive == true ? "Active" : "Inactive",
                            dateCreated = "N/A",
                            isActive = user.IsActive ?? false
                        });
                    }
                }

                return Ok(new { users, total = users.Count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while fetching users by role", details = ex.Message });
            }
        }

        // GET: /api/admin/food-logs
        [HttpGet("food-logs")]
        public IActionResult GetAllFoodLogs()
        {
            var foodLogs = _db.FoodLogs
                .Select(fl => new
                {
                    id = fl.FoodLogId,
                    foodName = fl.Food != null ? fl.Food.FoodName : "",
                    foodCategoryId = fl.FoodCategoryId,
                    categoryName = fl.FoodCategory != null ? fl.FoodCategory.FoodCategoryName : ""
                })
                .ToList();

            return Ok(new { foodLogs });
        }

        // GET: /api/admin/nutrient-logs
        [HttpGet("nutrient-logs")]
        public IActionResult GetAllNutrientLogs()
        {
            // Materialize first to avoid CS8198
            var logs = _db.NutrientLogs.ToList();
            var nutrientLogs = logs
                .Select(nl => new
                {
                    id = nl.NutrientLogId,
                    userId = nl.UserId,
                    foodCategoryId = nl.FoodCategoryId,
                    foodId = nl.FoodId,
                    calories = ParseDouble(nl.Calories),
                    protein = ParseDouble(nl.Protein),
                    fat = ParseDouble(nl.Fat),
                    carbs = ParseDouble(nl.Carbs),
                    updatedAt = nl.UpdatedAt.HasValue ? nl.UpdatedAt.Value.ToString("o") : null
                })
                .ToList();

            return Ok(new { nutrientLogs });
        }

        // GET: /api/admin/daily-intake-logs
        [HttpGet("daily-intake-logs")]
        public IActionResult GetAllDailyIntakeLogs()
        {
            var dailyIntakeLogs = _db.DailyIntakes
                .Select(di => new
                {
                    id = di.DailyIntakeId,
                    userId = di.UserId,
                    calorieIntake = di.CalorieIntake,
                    updatedAt = di.UpdatedAt.HasValue ? di.UpdatedAt.Value.ToString("o") : null
                })
                .ToList();

            return Ok(new { dailyIntakeLogs });
        }

        // Helper for parsing numbers safely
        private static double ParseDouble(string? value)
        {
            if (string.IsNullOrWhiteSpace(value)) return 0;
            return double.TryParse(value, out var result) ? result : 0;
        }
    }

    // Request models
    public class UpdateUserStatusRequest
    {
        public bool IsActive { get; set; }
    }

    public class AdminLoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}