class UserService {
  decodeToken() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return null;
  }

  getRole() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken.role;
    }
    return null;
  }

  getUserInfo() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      const userInfo = {
        firstname: decodedToken.firstName,
        lastname: decodedToken.lastName,
        mail: decodedToken.email,
        profilePictureUri: decodedToken.profilePicture,
      };
      return userInfo;
    }
    return null;
  }
}

const userService = new UserService();
export default userService;
