import React, { useState, useReducer} from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routers from "./common/Routers";
import UserStore from "./contexts/UserStore";
// import { AnimatePresence } from 'framer-motion';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [session, setSession] = useState(localStorage.getItem("session") || null);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [editProfileValues, setEditProfileValues] = useState({
        contactPreferences: [],
        interests: [],
        lifestyleChoices: { drinking: '', smoking: '', diet: '', workout: ''},
        handpicked: true,
        heightAndWeight: { height: 0, weight: 0},
        selectedLocations: {country:'', state: '', city: ''},
        personalityTraits: [],
        religionAndCaste: {religion: 'none', castes: 'select'},
    });
    const [preferredReligions, setPreferredReligions] = useState([]);
    const [profilePreview, setProfilePreview] = useState(true);

    const editProfileReducers = (state, action) => {
        switch(action.type){
          case 'EDIT_PROFILE':
            return { profile: !state.profile};
          case 'EDIT_PARTNER_PREFERENCE':
            return { partner_preference: !state.partner_preference };
          case 'EDIT_PHOTOS': 
            return { photos: !state.photos };
          default:
            return state;
        }
      }

      const connectionsReducers = (state, action) => {
        switch(action.type){
            case 'SEND_CONNECTIONS':
                return { send_connections: !state.send_connections};
            case 'RECEIVED_CONNECTIONS':
                return { received_connections: !state.received_connections };
            default:
                return state;
        }
      }

      const matchesReducers = (state, action) => {
        switch(action.type){
            case 'YOUR_MATCHES':
                return {your_matches: !state.your_matches};
            case 'HANDPICKED_CHOICES':
                return {handpicked_choices: !state.handpicked_choices};
            default:
                return state;

        }
      }

      const [editTab, dispatchEditTab] = useReducer(editProfileReducers, {
        profile: true,
        partner_preference: false,
        photos: false,
      });

      const [connectionTab, dispatchConnectionTab] = useReducer(connectionsReducers, {
        send_connections: true,
        received_connections: false,
      });

      const [matchesTab, dispatchMatchesTab] = useReducer(matchesReducers, {
        your_matches: true,
        handpicked_choices: false,
      });

    return (
        <UserStore.Provider
            value={{
                theme,
                setTheme,
                session,
                setSession,
                user,
                setUser,
                errors,
                setErrors,
                profilePicture,
                setProfilePicture,
                editProfileValues,
                setEditProfileValues,
                editTab,
                dispatchEditTab,
                connectionTab,
                dispatchConnectionTab,
                preferredReligions,
                setPreferredReligions,
                profilePreview,
                setProfilePreview,
                matchesTab,
                dispatchMatchesTab
            }}
        >
            <BrowserRouter>
                    <Routers />

                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        //theme={theme}
                    />
            </BrowserRouter>
        </UserStore.Provider>
    );
}

export default App;
