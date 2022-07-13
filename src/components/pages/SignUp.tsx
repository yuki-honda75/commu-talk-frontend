import React from "react";
import { ChangeEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {auth} from "../../firebase"

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (email === "" || password === "") {
           return setError("入力は必須です");
        } else if (password.length < 8 || password.length > 16) {
           return setError("パスワードは８文字以上、１６文字以内で入力してください")
        }
        try {
            setLoading(true);
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("そのメールアドレスはすでに使われています");
        }
        history.push("/createprofile")
    };
    const handleChangeEmail = (e: any) => {
        setEmail(e.currentTarget.value);
    };
    const handleChangePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    };

    //ローディング画面
    if (loading) {
        return <p>loading...</p>
    }
    
    return (
        <div className="top p-5">
            <div className="container card p-5" style={{width: 500}}>
                <h1 className="">ユーザー登録</h1>
                {error && <p style={{color: 'red'}}>{error}</p>}
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
                        <button className="btn btn-primary">登録</button>
                    </div>
                    <div>
                        ログインは<Link to={"/login"}>こちら</Link>から
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;