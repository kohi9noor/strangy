import { useNavigate } from "react-router-dom";

export default function SignUp({ setUsername }) {
  const navigate = useNavigate();

  function generateRandomUsername() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let username = "";
    for (let i = 0; i < 10; i++) {
      username += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setUsername(username);
    navigate("/chat");
  }

  return (
    <div
      id="signupPage"
      className=" bg-zinc-900 text-white space-y-12 py-16 text-center min-h-screen"
    >
      <h1 id="OmegelCloneHeading" className=" text-4xl font-mono">
        Strangy
      </h1>
      <button
        onClick={generateRandomUsername}
        className="signupButton px-3 py-1.5 bg-blue-400 hover:bg-blue-800 rounded-md"
      >
        Start now
      </button>
    </div>
  );
}
