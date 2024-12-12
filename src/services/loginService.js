const API_URL = "http://localhost:3000/api/auth";

const login = async (username, password) => {
  if (!username || !password) {
    throw new Error("Vui lòng nhập đầy đủ thông tin");
  }
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đăng nhập thất bại");
    }

    return data;
  } catch (error) {
    throw new Error(error || "Đã xảy ra lỗi. Vui lòng thử lại.");
  }
};

export { login };
