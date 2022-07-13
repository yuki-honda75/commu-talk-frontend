import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

//プロフィール編集用のモーダル
const EditProfile = (props) => {
    
    //チェックボックス以外の値変更
    const handleChange = (e) => {
        const item = props.profile.post;
        item[e.target.name] = e.target.value;
        props.setProfile({...props.profile,post: item})
    };

    const item = props.profile.post;

    return (
        <div>
            <Modal show={props.profileModal} onHide={props.closeProfileModal}>
                <ModalHeader closeButton>
                    <ModalTitle>コミュニティ作成</ModalTitle>
                </ModalHeader>
                <form method="post">
                    <ModalBody>
                        <label className="form-label">表示名</label>
                        <span></span><br></br>
                        <input className="form-control mb-3" type="text" name="name" onChange={handleChange} value={props.profile.get.name} required></input><br></br>
                        <label className="form-label">職業</label>
                        <span></span><br></br>
                        <input className="form-control mb-3" type="text" name="profession" onChange={handleChange} value={props.profile.get.profession} required></input><br></br>
                        <label className="form-label">趣味(複数選択可)</label>
                        <span></span><br></br>
                        {/* {
                            props.hobby.map((item) => {
                                return (
                                    <div key={item.hobbyId} className="form-check form-check-inline">
                                        <input className="form-check-input" id={item.hobbyId} type="checkbox" name="hobbyId" value={item.hobbyId} onChange={handleChangeCheck}
                                        />
                                        <label className="form-check-label" htmlFor={item.hobbyId}>{item.name}</label>
                                    </div>
                                );
                            })
                        } */}
                        <br></br>
                        <button 
                        // disabled={!item.name || !item.profession || !Object.values(checkedItem).includes(true)} 
                        className="btn btn-primary" 
                        type="submit" 
                        // onClick={handleSubmit}
                        >
                            作成
                        </button>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" onClick={props.createCommunity}>作成</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default EditProfile;