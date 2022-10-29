if (!isAuthenticated) {
    return (
      <div className="container">
        <nav>
          <h2 className="logo">
            1<span>UP</span>
          </h2>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/mainboard">Store</NavLink>
            </li>
            <li>
              <NavLink>Service</NavLink>
            </li>
          </ul>
          <div className="dropdown">
            <button className="dropbtn">
              <img src={profilePicture} className="profilePic" alt="..." />
            </button>
            {isAuthenticated?
                <div className="dropdown-content">
              <NavLink to="/profile">Profile</NavLink>
              <a onClick={logoutHandle}>Logout</a>
              <NavLink to="/wishlist">Wishlist</NavLink>
              <NavLink to="/cart">Cart</NavLink>
            </div>:<div className="dropdown-content">
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/wishlist">Wishlist</NavLink>
              <NavLink to="/cart">Cart</NavLink>
            </div>}
          </div>
          {/* <NavLink className="cartButton" to="/cart">
        Cart
      </NavLink> */}
          {/* <button type="button">Cart</button> */}
        </nav>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className="container">
        <nav>
          <h2 className="logo">
            1<span>UP</span>
          </h2>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/mainboard">Store</NavLink>
            </li>
            <li>
              <NavLink>Service</NavLink>
            </li>
          </ul>
          <div className="dropdown">
            <button className="dropbtn">
              <img src={profilePicture} className="profilePic" alt="..." />
            </button>
            <div className="dropdown-content">
              <NavLink to="/profile">Profile</NavLink>
              <a onClick={logoutHandle}>Logout</a>
              <NavLink to="/wishlist">Wishlist</NavLink>
              <NavLink to="/cart">Cart</NavLink>
            </div>
          </div>
          {/* <NavLink className="cartButton" to="/cart">
    Cart
  </NavLink> */}
          {/* <button type="button">Cart</button> */}
        </nav>
        <Outlet />
      </div>
    );
  }
};