class UserService {
  token = null;
  decodeToken() {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    if (this.token) {
      try {
        const decodedToken = JSON.parse(atob(this.token.split(".")[1]));
        return decodedToken;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return null;
  }

  isAuthentified() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      // check if token is expired
      const expirationDate = new Date(decodedToken.exp * 1000);
      const currentDate = new Date();
      if (expirationDate < currentDate) {
        localStorage.removeItem("token");
        return false;
      }
      return true;
    }
    return false;
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
        firstname: formatFirstName(decodedToken.firstName),
        lastname: formatLastName(decodedToken.lastName),
        mail: decodedToken.email,
        profilePictureUri: decodedToken.profilePicture,
      };
      return userInfo;
    }
    return null;
  }

  getUserProfile() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      const userProfile = {
        profilePictureUri: decodedToken.profilePicture,
        firstname: formatFirstName(decodedToken.firstName),
        lastname: formatLastName(decodedToken.lastName),
        email: decodedToken.email,
        phone: decodedToken.phone,
        address: decodedToken.address,
        promotionYear: decodedToken.promotionYear,
        major: decodedToken.major,
        class: decodedToken.class,
      };
      return userProfile;
    }
    return null;
  }
}

const formatFirstName = (name) => {
  return name
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

const formatLastName = (name) => {
  return name.toUpperCase();
};

const userService = new UserService();
export default userService;
