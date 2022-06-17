import { useEffect, useState } from "react";
import {HashRouter,Switch,Route,Link,NavLink,useParams} from "react-router-dom";

import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

import TalkContext from "./TalkContext";

const Talk = (props) => {
    const comId = useParams().comId;
    const name = useParams().name;
    const {user} = useAuthContext();
    const userId = user.uid;
    const [loading, setLoading] = useState(true);

    //コミュニティ参加
    const [checkCom, setCheckCom] = useState(Boolean);
    const getCheckCom = async () => {
      await axios.get("/communityapi/check?userId=" + userId + "&comId=" + comId)
      .then((res) => {
          setCheckCom(res.data);
      }).catch(

      ).finally(() => {
      })
    };
    const handleJoin = async () => {
        await axios.post("/communityapi/join?userId=" + userId + "&comId=" + comId)
        .then(res => {
            if (checkCom) {
                setCheckCom(false);
            } else {
                setCheckCom(true);
            }
        }).catch()
        .finally()
    };
    useEffect(() => {
        props.getGroup(comId);
        getCheckCom();
        setTimeout(() => {
            setLoading(false)
        },500);
    },[])

    const [postTalk, setPostTalk] = useState({
        context: "",
        groupId: "",
        userId: user.uid
    });

    const createTalk = (e) => {
        e.preventDefault();
        if (postTalk.context === "") {
            return alert("文字を入力してください");
        }
        axios.post("/talkapi/create/", postTalk)
        .then(res => {
            console.log(res.data)
        }).catch((e) => {
        }).finally(() => {
            setPostTalk({...postTalk,context: ""});
            props.getTalks(postTalk.groupId);
            console.log(postTalk);
        })
    }
    if (loading) {
        return <p>loading...</p>
    }
    return (
        <div className="row h-100">
            <HashRouter>
                <div className="talk h-100 col-3 px-0 mb-2">
                    <div>
                        <h2>{name}</h2>
                        <div className="d-flex justify-content-end mb-2">
                                {checkCom 
                                    ? <button className="btn btn-success" type="submit" onClick={handleJoin}>参加中</button> 
                                    : <button className="btn btn-info" type="submit" onClick={handleJoin}>参加する</button>
                                }
                        </div>
                    </div>
                    {checkCom &&
                        <div>
                            <div className="mb-2 border-bottom">
                                <form className="row g-0 mb-2">
                                    <div className="col-12">
                                        <input 
                                            className="form-control" 
                                            name="name" 
                                            type="text" 
                                            placeholder="新しくグループを作成する"
                                            onChange={(e) =>{
                                                props.setPostGroup({
                                                    name: e.target.value,
                                                    comId:  comId
                                                    })
                                            }
                                        }
                                        value={props.postGroup.name}></input>
                                    </div>
                                    <div className="col">
                                        <button className="col btn btn-primary" type="submit" onClick={props.createGroup}>作成</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col">
                                {props.group.length
                                    ? props.group.map((item) => {
                                        return (
                                            <NavLink to={"/context/" + item.groupId + "/" + item.name} key={item.groupId} className="card" 
                                            >
                                                {item.name}
                                            </NavLink>
                                        );
                                    })
                                    : <p>グループが見つかりません</p>

                                }
                            </div>
                        </div>
                    }
                </div>
                {checkCom &&

                    <div className="bg-light h-100 col pe-3">
                        <Switch>
                            <Route path="/context/:groupId/:name">
                                <TalkContext 
                                    talks={props.talks} 
                                    getTalks={(groupId) => props.getTalks(groupId)} 
                                    setPostTalk={setPostTalk} 
                                    postTalk={postTalk} 
                                    createTalk={createTalk}
                                />
                            </Route>
                        </Switch>
                    </div>
                }
                        </HashRouter>
        </div>
    );
};export default Talk;