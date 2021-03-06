import logo from './logo.svg';
import '../src/css/non-responsive.css';
import './App.css';

import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Menu from './components/menu/Menu';
import Item from './components/pages/Item';
import HobbyCommunity from './components/pages/HobbyCommunity';
import Talk from './components/pages/Talk';
import Community from './components/modal/Community';
import Profile from './components/pages/Profile';

import axios from "axios";
import React, {useState, useEffect} from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import PublicRoute from './components/PublicRoute';

import { Modal, ModalBody } from 'react-bootstrap';
import EditProfile from './components/modal/EditProfile';

const App = () => {
  //ローディング
  const [loading, setLoading] = useState(true);

  //認証関連
  const {user} = useAuthContext();
  let userId = "";
  if (user !== null) {
    userId = user.uid;
  };

  //コミュニティモーダル関連
  const [communityModal, setCommunityModal] = useState(false);
  const [message, setMessage] = useState({
    context: {
      success: "",
      fail: ""
    },
    createCom: false
  });
  const openModalCommunity = () => {
    setCommunityModal(true);
  };
  const closeModal = () => {
    setCommunityModal(false);
    setMessage({
      context: {
        fail: ""
      }
    });
    setPostCommunity({
      name: "",
      category: "",
      hobbyId: ""
    });
    setValidation({
      community: {
        name: "",
        hobbyId: "",
        category: ""
      }
    });
  };

  //プロフィール関連
  const [profileModal, setProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    get: null,
    post: {
      userId: userId,
      name: "",
      profession: "",
      iconImg: "001.png",
      hobbyId: []
    }
  });
  const getProfile = () => {
    axios.get("/profileapi/get?userId=" + userId)
    .then(res => {
      setProfile({...profile,get: res.data.profile});
      setLoading(false);
    }).catch((e) => {
      window.location.reload();
    }).finally(() => {
    })
  };
  const openProfileModal = () => {
    setProfileModal(true);
  };
  const closeProfileModal = () => {
    setProfileModal(false);
  }

  //コミュニティ作成関連
  const [postCommunity, setPostCommunity] = useState({
    name: "",
    category: "",
    hobbyId: ""
  });
  const [validation, setValidation] = useState({
    community: {
      name: "",
      hobbyId: "",
      category: ""
    },
    talk: {
      context: ""
    }
  })
  const [messageModal, setMessageModal] = useState(false);
  const createCommunity = (e) => {
    e.preventDefault();
    if (postCommunity.name === "" || postCommunity.hobbyId === "" || postCommunity.category === "") {
      const item = validation.community;
      if (postCommunity.name === "") {
        item.name = "入力必須です";
      } else {
        item.name = "";
      }
      if (postCommunity.hobbyId === "") {
        item.hobbyId = "入力必須です";
      } else {
        item.hobbyId = "";
      }
      if (postCommunity.category === "") {
        item.category = "入力必須です";
      } else {
        item.category = "";
      }
      setValidation({community: item});
      return 
    }
    axios.post("/communityapi/create/", postCommunity)
    .then(res => {
      if (res.data.message) {
        setCommunityModal(false);
        setMessageModal(true);
        setTimeout(() => {
          setMessageModal(false);
        }, 1000);
        
      } else {
        setMessage({
          context: {
            fail: res.data.error
          }
        });
      }
    }).catch((e) => {
      setMessage({
        context: {
          fail: "作成できませんでした"
        }
      });
    }).finally(() => {
    })
  }

  //グループ作成関連
  const [postGroup, setPostGroup] = useState({
    name: "",
    comId: ""
  });
  const createGroup = (e) => {
    e.preventDefault();
    if (postGroup.name === "") {
        return alert("文字を入力してください");
    }
    if (window.confirm("「" + postGroup.name + "」で作成してよろしいですか？")) {
      axios.post("/talkapi/creategroup/", postGroup)
      .then(res => {
      }).catch((e) => {
      }).finally(() => {
          setPostGroup({...postGroup,name: ""});
          getGroup(postGroup.comId);
      })
    } else {

    }
  };

  //趣味一覧
  const [hobby, setHobby] = useState([]);
  const getHobby = async () => {
    axios.get("/hobbyapi/all")
    .then(res => {
      setHobby(res.data.hobbyList);
    }).catch((e) => {

    }).finally(() => {
      
    })
  }

  //趣味ごとのコミュニティ一覧
  const [communityHobby, setCommunityHobby] = useState([]);
  function getCommunityHobby(hobbyId) {
    axios.get("/communityapi/gethobby?hobbyId=" + hobbyId)
    .then(res => {
      setCommunityHobby(res.data.communityHobbyList);
    }).catch((e) => {
      
    }).finally(() => {
      
    })
  }

  //コミュニティごとのトークグループ一覧
  const [group, setGroup] = useState([]);
  function getGroup(comId) {
    axios.get("/talkapi/getgroup?comId=" + comId)
    .then(res => {
      setGroup(res.data.groupList);
    }).catch((e) => {
      
    }).finally(() => {
      
    })
  }

  //トークグループごとのトーク内容表示
  const [talks, setTalks] = useState([]);
  function getTalks(groupId) {
    axios.get("/talkapi/gettalk?groupId=" + groupId)
    .then(res => {
      setTalks(res.data.talkList);
    }).catch((e) => {
      
    }).finally(() => {
      
    })
  }

  //マウント時の実行
  useEffect(() => {
    getHobby();
    getProfile();
  },[])

  //ロード中画面
  if (loading) {
    return <p>loading...</p>;
  }

  return (
    
    <BrowserRouter>
      <div className='h-100 container-fluid row m-0 p-0'>
          <Switch>
            <React.Fragment>
              
              <PublicRoute exact path="/signup" component={SignUp}/>
              <PublicRoute path="/login" component={Login}/>
              <PublicRoute path="/createprofile">
                <Profile 
                  profile={profile} 
                  setProfile={setProfile} 
                  hobby={hobby}
                />
              </PublicRoute>
              <Route path="/">
                <div className='col-2 px-0'>
                  <Menu 
                    profile={profile} 
                    setProfile={setProfile} 
                    openModalCommunity={openModalCommunity}
                    openProfileModal={openProfileModal}/>
                </div>
              </Route>
            </React.Fragment>
          </Switch>

          <Switch>
            <React.Fragment>
              <div className='h-100 col-10 px-0'>
                {message.createCom ? <p>{message.context.success}</p> : <span></span>}
                  <Route exact path="/">
                      <Item 
                        userId={userId}
                        hobby={hobby} 
                        getCommunityHobby={getCommunityHobby} 
                        setCommunityHobby={setCommunityHobby}
                      />
                  </Route>
                  <Route exact path="/talk/:comId/:name">
                    <Talk 
                      group={group} 
                      setGroup={setGroup}
                      getGroup={(comId) => getGroup(comId)} 
                      talks={talks} 
                      getTalks={(groupId) => getTalks(groupId)} 
                      validation={validation} 
                      setValidation={setValidation} 
                      createGroup={createGroup} 
                      postGroup={postGroup}
                      setPostGroup={setPostGroup}
                    />
                  </Route>
                  <Route path="/community/hobby/:hobbyId">
                    <HobbyCommunity 
                      communityHobby={communityHobby} 
                      getCommunityHobby={(hobbyId) => getCommunityHobby(hobbyId)}
                    />
                  </Route>
              </div>
            </React.Fragment>
          </Switch>

          <Community 
            communityModal={communityModal} 
            closeModal={closeModal} 
            postCommunity={postCommunity} 
            setPostCommunity={setPostCommunity} 
            hobby={hobby} 
            createCommunity={createCommunity} 
            message={message} 
            validation={validation}/>
          {!user
            ? <div></div>
            : <EditProfile
              profile={profile}
              profileModal={profileModal}
              closeProfileModal={closeProfileModal}
            />
          }

          <Modal show={messageModal} onHide={messageModal}>
            <ModalBody>作成しました！</ModalBody>
          </Modal>
      </div>
    </BrowserRouter>
  );
}

export default App;
