import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

const Community = (props: any) => {
    const handleChange = (e: any) => {
        props.setPostCommunity({...props.postCommunity,[e.target.name]: e.target.value});
    };
    return (
        <div>
            <Modal show={props.communityModal} onHide={props.closeModal}>
            <div className="modal-content">
                <ModalHeader closeButton>
                    <ModalTitle>コミュニティ作成</ModalTitle>
                </ModalHeader>
                <form>
                    <ModalBody>
                        {props.message.context.fail ? <p>{props.message.context.fail}</p> : <span></span>}
                        <label className="me-2 form-label" htmlFor="name">コミュニティ名</label>
                        <span className="form-text text-danger">{props.validation.community.name}</span>
                        <input className="mb-3 form-control" id="name" type="text" name="name" onChange={handleChange}></input>
                        <label className="me-2 form-label" htmlFor="hobbyId">趣味</label>
                        <span className="form-text text-danger">{props.validation.community.hobbyId}</span>
                        <select className="mb-3 form-control" id="hobbyId" name="hobbyId" onChange={handleChange}>
                            <option disabled selected>---選択してください---</option>
                            {
                                props.hobby.map((item: any) => {
                                    return (
                                        <option key={item.hobbyId} value={item.hobbyId}>{item.name}</option>
                                        );
                                    })
                                }
                        </select>
                        <label className="me-2 form-label" htmlFor="category">カテゴリ</label>
                        <span className="form-text text-danger">{props.validation.community.category}</span><br></br>
                        <input className="form-control" id="category" type="text" name="category" onChange={handleChange}></input><br></br>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" onClick={props.createCommunity}>作成</Button>
                    </ModalFooter>
                </form>
            </div>
            </Modal>
        </div>
    );
};

export default Community;