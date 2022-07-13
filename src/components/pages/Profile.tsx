import React from "react";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import axios from "axios";
import { auth } from "../../firebase";

const Profile = (props: any) => {
    const history = useHistory();
    const [checkedItem, setCheckedItem] = useState({});

    const handleChange = (e: any) => {
        const item = props.profile.post;
        item[e.target.name] = e.target.value;
        props.setProfile({...props.profile,post: item})
    };
    const handleChangeCheck = (e: any) => {
        setCheckedItem({
            ...checkedItem,
            [e.target.value]: e.target.checked
        });
    };
    const item = props.profile.post;
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const dataPushArray = Object.entries(checkedItem).reduce((pre: any,[key, value])=>{
            value && pre.push(key)
            return pre
        },[]);
        item.hobbyId = dataPushArray;
        props.setProfile({...props.profile,post: item})
        axios.post("/profileapi/create", props.profile.post)
        .then((res) => {
            window.location.reload();
        }).catch(() => {
            
        }).finally(() => {

        })
    } 
    const handleLogout = () => {
        auth.signOut();
        history.push("/login");
    };
    
    //プロフィールが作られている場合はトップへ
    if (props.profile.get !== null) {
        return <Redirect to="/"/>
    }

    return (
        <div className="top p-5">
            <div className="container card p-5" style={{width: 500}}>
                <p>プロフィールを作成しましょう</p>
                <form className="mb-3">
                    <label className="form-label">表示名</label>
                    <span></span><br></br>
                    <input className="form-control mb-3" type="text" name="name" onChange={handleChange} required></input><br></br>
                    <label className="form-label">職業</label>
                    <span></span><br></br>
                    <input className="form-control mb-3" type="text" name="profession" onChange={handleChange} required></input><br></br>
                    <label className="form-label">趣味(複数選択可)</label>
                    <span></span><br></br>
                    {
                        props.hobby.map((item: any) => {
                            return (
                                <div key={item.hobbyId} className="form-check form-check-inline">
                                    <input className="form-check-input" id={item.hobbyId} type="checkbox" name="hobbyId" value={item.hobbyId} onChange={handleChangeCheck}/>
                                    <label className="form-check-label" htmlFor={item.hobbyId}>{item.name}</label>
                                </div>
                            );
                        })
                    }
                    <br></br>
                    <button disabled={!item.name || !item.profession || !Object.values(checkedItem).includes(true)} className="btn btn-primary" type="submit" onClick={handleSubmit}>作成</button>
                </form>
                <button type="submit" className="btn btn-danger" onClick={handleLogout}>ログアウト</button>
            </div>

        </div>
    );
};

export default Profile;