import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/features/userSlice";
import { clearCart } from "../redux/features/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userState);
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    navigate("/");
    dispatch(logoutUser());
    dispatch(clearCart());
    queryClient.removeQueries();
  };
  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end ">
        {!user ? (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <p>Hello {user.displayName}</p>
            <button onClick={handleLogout} className="btn btn-sm bg-sky-500">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
