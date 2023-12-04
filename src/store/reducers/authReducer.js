import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
const customerToken = localStorage.getItem("userToken");

function verifyToken(keyName) { // xác thực token của người dùng
  const storage = localStorage.getItem(keyName);
  if (storage) {
    const decodeToken = jwtDecode(storage);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) { // nếu ngày tạo lớn hơn ngày hết hạn thì xóa, nếu không thì vẫn lưu
      localStorage.removeItem(keyName);
      return null;
    } else {
      return storage;
    }
  } else {
    return null;
  }
}
const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    adminToken: verifyToken("admin-token"),
    userToken: verifyToken("userToken"),
    user: customerToken ? jwtDecode(customerToken) : null, // nếu token của user là customertoken thì giải mã, không thì trả lại null
  },
  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
    },
    logout: (state, { payload }) => { // đăng xuất thì xóa payload của admin lẫn người dùng
      localStorage.removeItem(payload);
      if (payload === "admin-token") {
        state.adminToken = null;
      } else if (payload === "userToken") {
        state.userToken = null;
        state.user = null;
      }
    },
  },
});
export const { setAdminToken, setUserToken, logout } = authReducer.actions;
export default authReducer.reducer;
