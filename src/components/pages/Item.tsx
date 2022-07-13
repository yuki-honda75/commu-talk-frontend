import React from "react";
import { useEffect,useState } from "react";
import {BrowserRouter,Switch,Route,Link,NavLink, useHistory} from "react-router-dom";
import axios from "axios";

import Hobby from "./Hobby";
import Menu from "../menu/Menu";

const Item = (props: any) => {
    //コミュニティ一覧
    const [joined, setJoined] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCommunity = async () => {
      axios.get("/communityapi/get?userId=" + props.userId)
      .then(res => {
        setJoined(res.data.joined);
        setRecommended(res.data.recommended);
        setLoading(false);
      }).catch((e) => {
  
      }).finally(() => {
      })
    }

    //マウント時の実行
    useEffect(() => {
        getCommunity();
    },[])

    //ローディング画面
    if (loading) {
        return <p>loading...</p>
    }

    return (
        <div className="item h-100 scroll p-3">

            <h2 className="fst-italic border-bottom p-2 mb-0">参加中のコミュニティ</h2>
            <div className="h-50 scroll">
                    {joined.length
                        ? <ul className="row row-cols-4 p-3">
                        { 
                            joined.map((item: any) => {
                                return (
                                    <li className="p-2" key={item.comId}>
                                        <NavLink to={"/talk/" + item.comId + "/" + item.name} className="card card-body text-decoration-none bg-light">
                                            <h4 className="card-title text-primary border-bottom">{item.name}</h4>
                                            <p className="text-secondary">趣味カテゴリ：{item.category.hobby.name}</p>
                                            <p className="text-secondary">{item.category.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            })
                        }
                        </ul>
                        : <h2>参加中のコミュニティはありません</h2>
                    }
            </div>

            <h2 className="fst-italic border-top border-bottom p-2 mb-0">あなたへのおすすめ</h2>
            <div className="h-50 scroll">
                    {recommended.length
                        ? <div className="row row-cols-4 p-3">
                        {
                            recommended.map((item: any) => {
                                return (
                                    <div className="p-2" key={item.comId}>
                                        <NavLink to={"/talk/" + item.comId + "/" + item.name} className="card card-body text-decoration-none bg-light">
                                            <h4 className="card-title text-primary border-bottom">{item.name}</h4>
                                            <p className="text-secondary">趣味カテゴリ：{item.category.hobby.name}</p>
                                            <p className="text-secondary">{item.category.name}</p>
                                        </NavLink>
                                    </div>
                                );
                            })
                        }
                        </div>
                        : <h4 className="mt-2">おすすめはありません。プロフィールで趣味をたくさん登録するとおすすめが増えます。</h4>
                    }
            </div>
            <h2 className="fst-italic border-top border-bottom p-2">趣味から探す</h2>
            <Hobby hobby={props.hobby} setCommunityHobby={props.setCommunityHobby}/>
        </div>
    );
};

export default Item;