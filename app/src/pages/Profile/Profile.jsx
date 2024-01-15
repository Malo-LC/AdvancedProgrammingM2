function Profile() {
  return (
    <div className="h-screen">
      <div className="profile-page">
        <h1>Mon Profile</h1>
        <div>
          <img id="profile-image"></img>
          <h2 id="firstname"></h2>
          <h2 id="lastname"></h2>
        </div>
        <div>
          <p id="email"></p>
          <p id="phone"></p>
          <p id="address"></p>
          <p id="year"></p>
          <p id="major"></p>
          <p id="class"></p>
        </div>
      </div>
    </div>
  )
}

export default Profile;