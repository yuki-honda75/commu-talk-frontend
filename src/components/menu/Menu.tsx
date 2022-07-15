import React, { useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

import { useAuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase';

import Image from '../../img/facebook_cover_photo_1.png';
// import Search from './Search';

const Menu = (props: any) => {
  const history = useHistory();
  const { user }: any = useAuthContext();
  let userName = '';

  if (user !== null) {
    userName = user.email.split('@')[0];
  }
  const handleLogout = () => {
    auth.signOut();
    props.setProfile({ ...props.profile, get: null });
    history.push('/login');
  };

  

  //ユーザー情報がなければログイン画面、プロフィールがなければ作成画面へ
  if (!user) {
    return <Redirect to="/login" />;
  } else {
    return (
      <nav
        className="d-flex flex-column flex-shrink-0 border p-0 bg-white bg-gradient"
        style={{ height: '100vh' }}
      >
        <Link to="/">
          <img src={Image} className="w-100"></img>
        </Link>
        <ul className="nav nav-pills d-flex flex-column mb-auto p-0">
          <div></div>
          {/* <Search /> */}
          <li className="nav-item">
            <Link className="text-dark nav-link text-decoration-none" to="/">
              トップ
            </Link>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className="text-dark nav-link"
              onClick={props.openModalCommunity}
            >
              コミュニティをつくる
            </a>
          </li>
        </ul>
        <div className="border-top pt-2 nav-item d-flex align-items-center justify-content-center mb-1">
          <img
            className="rounded-circle"
            src={`${process.env.PUBLIC_URL}/img/001.png`}
            height={50}
            width={50}
          />

          <DropdownButton
            drop="end"
            variant="white"
            title={props.profile.get ? props.profile.get.name : userName}
          >
            <DropdownItem onClick={handleLogout}>ログアウト</DropdownItem>
            <DropdownItem onClick={props.openProfileModal}>
              プロフィール
            </DropdownItem>
          </DropdownButton>
        </div>
      </nav>
    );
  }
};

export default Menu;
