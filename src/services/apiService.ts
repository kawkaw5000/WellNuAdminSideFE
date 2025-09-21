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
