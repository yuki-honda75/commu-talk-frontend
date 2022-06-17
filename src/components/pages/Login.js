import { auth } from "../../firebase";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("メールアドレス、または、パスワードが間違っています");
        }
        history.push("/");
    };
    const handleChangeEmail = (e) => {
        setEmail(e.currentTarget.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.currentTarget.value);
    };
    if (loading) {
        return <p>loading...</p>;
    }
    return (
        <div className="top p-5">
            <div className="container card p-5" style={{width: 500}}>
                <h1>ログイン</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}> 
                    <div>
                        <label className="form-label">メールアドレス</label>   
                        <input 
                            className="mb-3 form-control"
                            name="email" 
                            type="email" 
                            placeholder="email"
                            onChange={(e) => handleChangeEmail(e)}
                        ></input>
                    </div>
                        <label className="form-label">パスワード</label>        
                        <input 
                            className="mb-3 form-control"
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={(e) => handleChangePassword(e)}
                        ></input>
                    <div>
                        <button className="btn btn-primary">ログイン</button>
                    </div>
                    <div>
                        ユーザー登録は<Link to={"/signup"}>こちら</Link>から
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;