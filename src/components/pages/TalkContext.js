import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const TalkContext = (props) => {
    const groupId = useParams().groupId;
    const name = useParams().name;
    const {user} = useAuthContext();
    const userId = user.uid;
    props.getTalks(groupId);
    
    return (
        <div className="h-100 bg-light p-1 d-flex flex-column">
            <h1 className="mb-0 pb-2 border-bottom">{name}</h1>
            <div className="scroll align-self-stretch">
                {props.talks
                    ? props.talks.map((item) => {
                        return (
                            <div key={item.talkId}>
                                {item.profile.userId === userId
                                    ? <div className="d-flex justify-content-end ">
                                        <div className="card mb-3 ">
                                            <p>{item.context}</p>
                                        </div>
                                    </div>
                                    : <div className="mb-2">
                                        <div>
                                            {/* <img src={`${process.env.PUBLIC_URL}/img/` + item.profile.iconImg} height="30" width="30"></img> */}
                                            <label>{item.profile.name ? item.profile.name : "user" + item.profile.userId}</label>
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            <div className="card">
                                                <p>{item.context}</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    })
                    : <p>トークがありません</p>

                }
            </div>
            <div className="mt-auto border-top pt-1">
                <form className="row g-0">
                    <div className="col-6 pr-0">
                        <input className="form-control" name="context" type="text" value={props.postTalk.context} onChange={(e) => props.setPostTalk({...props.postTalk,
                            context: e.target.value,
                            groupId: groupId
                        })}/>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" type="submit" onClick={props.createTalk}>送信</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default TalkContext;