function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            const credentials = {
              email: email,
              password: password,
            };
          }}
        />
      </form>
    </div>
  );
}

export default Login;
