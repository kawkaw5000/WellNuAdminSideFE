// API service for making HTTP requests to the backend
// Update this URL to match your actual backend server
// Use a relative base so Vite dev proxy or production hosting can rewrite to the backend
const API_BASE_URL = '/api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  dateCreated: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  age?: number;
  weight?: number;
  height?: number;
  userLevel?: number;
  userCurrentExperience?: number;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
}

export interface ApiResponse<T> {
  users?: T[];
  total?: number;
  error?: string;
  message?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // Admin login
  async adminLogin(username: string, password: string) {
    return this.request<{ message: string; adminId: number; adminName: string; role: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  // Get all users
  async getUsers(search?: string): Promise<ApiResponse<User>> {
    const searchParam = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.request<ApiResponse<User>>(`/admin/users${searchParam}`);
  }

  // Get user statistics
  async getUserStats(): Promise<UserStats> {
    return this.request<UserStats>('/admin/users/stats');
  }

  // Toggle user status
  async toggleUserStatus(userId: number) {
    return this.request<{ message: string; userId: number; isActive: boolean; status: string }>(`/admin/users/${userId}/toggle-status`, {
      method: 'PATCH',
    });
  }

  // Update user status explicitly
  async updateUserStatus(userId: number, isActive: boolean) {
    return this.request<{ message: string; userId: number; isActive: boolean; status: string }>(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
  }

  // Explicit set active/inactive shortcut for Selenium tests
  async setUserActive(userId: number, active: boolean) {
    return this.updateUserStatus(userId, active);
  }

  // Get user by ID
  async getUserById(userId: number): Promise<User> {
    return this.request<User>(`/admin/users/${userId}`);
  }

  // Get users by role
  async getUsersByRole(roleName: string): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/admin/users/by-role/${encodeURIComponent(roleName)}`);
  }

  // Food logs
  async getFoodLogs() {
    return this.request<{ foodLogs: { id: number; foodName: string; foodCategoryId: number; categoryName: string }[] }>(
      '/admin/food-logs'
    );
  }

  // Get all food history (not just active logs)
  async getFoodHistory() {
    return this.request<{ foodHistory: { id: number; foodName: string; categoryName: string; dateAdded: string; isActive: boolean; timesLogged: number; lastLogged: string }[] }>(
      '/admin/food-history'
    );
  }

  // Get food category statistics for charts
  async getFoodCategoryStats() {
    return this.request<{ categoryStats: { categoryName: string; foodCount: number; totalLogs: number; averageCalories: number }[] }>(
      '/admin/food-categories/stats'
    );
  }

  // Get nutrient trends over time
  async getNutrientTrends() {
    return this.request<{ trends: { date: string; avgCalories: number; avgProtein: number; avgFat: number; avgCarbs: number; userCount: number }[] }>(
      '/admin/nutrient-trends'
    );
  }

  // Get user activity over time
  async getUserActivityTrends() {
    return this.request<{ activityTrends: { date: string; totalUsers: number; activeUsers: number; newRegistrations: number; dailyLogins: number }[] }>(
      '/admin/user-activity-trends'
    );
  }

  // Nutrient logs
  async getNutrientLogs() {
    return this.request<{ nutrientLogs: { id: number; userId: number; foodCategoryId: number; foodId: number; calories: number; protein: number; fat: number; carbs: number; updatedAt: string }[] }>(
      '/admin/nutrient-logs'
    );
  }

  // Daily intake logs
  async getDailyIntakeLogs() {
    return this.request<{ dailyIntakeLogs: { id: number; userId: number; calorieIntake: number; updatedAt: string }[] }>(
      '/admin/daily-intake-logs'
    );
  }
}

export const apiService = new ApiService();
