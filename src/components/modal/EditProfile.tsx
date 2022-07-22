import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

type HobbyType = {
  hobbyId: number;
  name: string;
};
//プロフィール編集用のモーダル
const EditProfile = (props: any) => {
  const firstCheckedItem = props.profile.get.hobbyId.reduce(
    (obj: {}, data: number) => ({
      ...obj,
      [data]: true,
    }),
    {}
  );
  const [checkedItem, setCheckedItem] = useState<any>(firstCheckedItem);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { user }: any = useAuthContext();
  const userId = user.uid;
  const profileByGet = props.profile.get;
  const profileForPost = props.profile.post;

  //チェックボックス以外の値変更
  const handleChange = (e: any) => {
    profileForPost[e.target.name] = e.target.value;
    props.setProfile({ ...props.profile, post: profileForPost });
    setDisabled(false);
  };
  //チェックボックスの値変更
  const handleChangeCheck = (e: any) => {
    setCheckedItem({
      ...checkedItem,
      [e.target.value]: e.target.checked,
    });
    setDisabled(false);
  };

  //更新ボタン
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const dataPushArray = Object.entries(checkedItem).reduce(
      (pre: any, [key, value]) => {
        value && pre.push(key);
        return pre;
      },
      []
    );
    profileForPost.hobbyId = dataPushArray;
    profileForPost.profileId = props.profile.get.profileId;
    props.setProfile({ ...props.profile, post: profileForPost });
    axios
      .post('/profileapi/update', props.profile.post)
      .then((res: any) => {
        alert('更新しました');
        window.location.reload();
      })
      .catch(() => {
        alert('失敗しました');
      })
      .finally(() => {});
  };

  useEffect(() => {
    props.setProfile({ ...props.profile, post: profileByGet });
  }, []);

  if (props.profile.get === null) {
    return <></>;
  }

  return (
    <div>
      <Modal show={props.profileModal} onHide={props.closeProfileModal}>
        <ModalHeader closeButton>
          <ModalTitle>コミュニティ作成</ModalTitle>
        </ModalHeader>
        <form method="post">
          <ModalBody>
            <label className="form-label">表示名</label>
            <span></span>
            <br></br>
            <input
              className="form-control mb-3"
              type="text"
              name="name"
              onChange={handleChange}
              value={props.profile.get.name}
              required
            ></input>
            <br></br>
            <label className="form-label">職業</label>
            <span></span>
            <br></br>
            <input
              className="form-control mb-3"
              type="text"
              name="profession"
              onChange={handleChange}
              value={props.profile.get.profession}
              required
            ></input>
            <br></br>
            <label className="form-label">趣味(複数選択可)</label>
            <span></span>
            <br></br>
            {props.hobby.map((item: HobbyType) => {
              return (
                <div
                  key={item.hobbyId}
                  className="form-check form-check-inline"
                >
                  <input
                    className="form-check-input"
                    id={'id' + item.hobbyId}
                    type="checkbox"
                    name="hobbyId"
                    defaultValue={item.hobbyId}
                    onChange={handleChangeCheck}
                    checked={checkedItem[item.hobbyId] && true}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={'id' + item.hobbyId}
                  >
                    {item.name}
                  </label>
                </div>
              );
            })}
            <br></br>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={disabled}
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              更新
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default EditProfile;
