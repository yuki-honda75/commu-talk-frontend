import {Link} from "react-router-dom";

const Hobby = (props) => {
    return (
        <div className="h-50">
            <div className="row">
                { 
                    props.hobby.map((item) => {
                        return (
                            <div className="p-2 col-3" key={item.hobbyId}>
                                <Link to={'/community/hobby/' + item.hobbyId}  className="card card-body text-decoration-none bg-light" onClick={() => props.setCommunityHobby(null)}>
                                    <h4 className="card-title text-center">{item.name}</h4>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Hobby;