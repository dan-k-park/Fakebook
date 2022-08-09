import axios from "axios";
import { useRef } from "react";

const styles = {
  section: "flex-[1] flex flex-col content-center",
  input:
    "h-[50px] rounded-sm border-2 border-solid border-gray-400 text-[18px] pl-[20px] focus:outline-none",
};

export const Login = () => {
  const username = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      axios.post("/api/login", {
        username: username!.current!.value,
        password: password!.current!.value,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Definitely need to fix this

  return (
    <div className="w-screen h-screen bg-white flex content-center items-center">
      <div className="w-[70%] h-[70%] flex">
        <div className={styles.section}>
          <h3 className="text-[50px] font-[800] text-blue-700 mb-[10px]">
            Fakebook
          </h3>
          <span className="text-[24px]">Connect with those around you</span>
        </div>
        <div className={styles.section}>
          <form
            onSubmit={handleClick}
            className="h-[300px] p-[20px] bg-white rounded-sm flex flex-col content-between"
          >
            <input
              type="text"
              placeholder="Username"
              required
              ref={username}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              required
              minLength={6}
              ref={password}
              className={styles.input}
            />
            <button className="h-[50px] rounded-lg border-none bg-blue-700 text-white text-[20px] font-[500] cursor-pointer focus:outline-none">
              Log In
            </button>
            <span className="text-center text-blue-700">Forgot Password?</span>
            <button className="w-[60%] h-[50px] self-center rounded-lg border-none bg-green-300 text-white text-[20px] font-[500] cursor-pointer">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
