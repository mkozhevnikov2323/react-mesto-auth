import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { api } from "../utils/api";
import * as Auth from './Auth';
import "../index.css";
import Header from "./Header";
import MyProfile from "./MyProfile";
import Footer from "./Footer";
import DeletePopup from "./DeletePopup";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  let [cards, setCards] = useState([]);
  let [currentUser, setCurrentUser] = useState({});
  let [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  let [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  let [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  let [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  let [selectedCard, setSelectedCard] = useState({});
  let [selectedCardToDelete, setSelectedCardToDelete] = useState({});
  let [showLoading, setShowLoading] = useState(false);
  let [isInfoTooltip, setIsInfoTooltip] = useState(false);
  let [loggedIn, setLoggedIn] = useState(false);
  let [noMistake, setNoMistake] = useState(false);
  let [userEmail, setUserEmail] = useState('');
  let history = useHistory();

  useEffect(() => {
    api.getUserInfo()
      .then((userInfoFromServer) => {
        setCurrentUser(userInfoFromServer);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleRegSubmit(login){
    Auth.register({
      password:login.password,
      email:login.email,
  })
    .then(() => {
      setNoMistake(true)
      setIsInfoTooltip(true)
    })
    .then((res) => {
      history.push('/login');
    })
    .catch((err) => {
      setIsInfoTooltip(true)
      setNoMistake(false)
      console.log(err)
    })
  }

  function handleLogin(password, email){
    Auth.authorize(password, email)
      .then ((token) => {
        Auth.getContent(token)
          .then(() => {
            setUserEmail(email)
            setLoggedIn(true)
            history.push('/my-profile')
          })
      .catch((err) => {
        console.log(err)
    })
  })}

  function signOut(){
    localStorage.removeItem('jwt');
    setLoggedIn(false)
    setUserEmail("")
    history.push('/login');
  }

  function tokenCheck() {
      const jwt = localStorage.getItem('jwt');
    if (jwt){
      Auth.getContent(jwt).then((res) => {
        if (res){
          setLoggedIn({
            loggedIn: true,
          }, () => {
            history.push("/my-profile");
          });
        }
      });
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setShowLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item !== card));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCardToDelete(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({});
    setSelectedCardToDelete({});
    setIsInfoTooltip(false);
  }

  function handleUpdateUser(userData) {
    setShowLoading(true);
    api
      .setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setShowLoading(true);
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setShowLoading(true);
    api
      .setNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }

  return (
    <Switch>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          {/* <Header />
          <MyProfile
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDeleteButton={handleDeleteCardClick}
            cards={cards}
          /> */}
          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            onSignOut={signOut}
          />
          <Route path="/sign-up"></Route>
          <Route path="/sign-in"></Route>
          <Route>
            {loggedIn ? (
              <Redirect to="/my-profile" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/register">
            <Register onRegister={handleRegSubmit} />
          </Route>
          <ProtectedRoute
            path="/my-profile"
            loggedIn={loggedIn}
            component={MyProfile}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDeleteButton={handleDeleteCardClick}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            showLoading={showLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            showLoading={showLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            showLoading={showLoading}
          />
          <DeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            showLoading={showLoading}
            card={selectedCardToDelete}
          />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltip}
            noMistake={noMistake}
          />
        </div>
      </CurrentUserContext.Provider>
    </Switch>
  );
}

export default App;
