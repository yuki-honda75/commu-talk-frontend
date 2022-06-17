import { useEffect } from "react";
import { NavLink,useParams } from "react-router-dom";

const HobbyCommunity = (props) => {
    const hobbyId = useParams().hobbyId;

    //マウント時の実行
    useEffect(() => {
            props.getCommunityHobby(hobbyId)
    },[])

    if (props.communityHobby) {
        return (
            <div className="item h-100 scroll p-3">
                {props.communityHobby.length
                    ? <div className="row row-cols-4 p-3">
                    {
                        props.communityHobby.map((item) => {
                            return (
                                <div className="p-2" key={item.comId}>
                                    <NavLink to={"/talk/" + item.comId + "/" + item.name} className="card card-body bg-light text-decoration-none">
                                        <h4 className="card-title text-primary border-bottom">{item.name}</h4>
                                        <p className="text-secondary">趣味カテゴリ：{item.category.hobby.name}</p>
                                        <p className="text-secondary">{item.category.name}</p>
                                    </NavLink>
                                </div>
                            );
                        })
                    }
                    </div>
                    : <h4>まだコミュニティが作られていません</h4>
                }
            </div>
        );
    }
};

export default HobbyCommunity;