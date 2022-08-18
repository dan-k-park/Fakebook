import axios from "axios";
import { useRef } from "react";

const styles = {
  section: "flex-[1] flex flex-col justify-center",
  input:
    "h-[50px] rounded-lg border border-solid border-gray-400 text-[18px] pl-[20px] focus:outline-none",
};

export const Login = () => {
  const username = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        username: username!.current!.value,
        password: password!.current!.value,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-[70%] h-[70%] flex">
        <div className={styles.section}>
          <h3 className="text-[50px] font-[800] text-sky-500 mb-[10px]">
            Fakebook
          </h3>
          <span className="text-[24px]">Connect with those around you</span>
        </div>
        <div className={styles.section}>
          <form
            onSubmit={handleClick}
            className="h-[300px] p-[20px] bg-white rounded-lg flex flex-col justify-between gap-y-[10px]"
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
            <button
              type="submit"
              className="h-[50px] rounded-lg border-none bg-sky-500 hover:bg-sky-400 text-white text-[20px] font-[500] cursor-pointer focus:outline-none"
            >
              Log In
            </button>
            <span className="text-center cursor-pointer text-sky-500 hover:text-sky-400">
              Forgot Password?
            </span>
            <button className="w-[60%] h-[50px] self-center rounded-lg border-none bg-green-500 hover:bg-green-400 text-white text-[20px] font-[500] cursor-pointer">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
