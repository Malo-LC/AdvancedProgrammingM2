class User {
  constructor(id, firstName, lastName, mail, userType) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userType = userType;
  }

  isAdmin() {
    return this.userType === "admin";
  }

  isStudent() {
    return this.userType === "student";
  }
}

export default User;
