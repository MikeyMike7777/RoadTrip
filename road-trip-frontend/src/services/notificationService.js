import React, {useState, useReducer, useContext, createContext} from 'react';
import {v4} from "uuid";
import Notification from "../components/Notification/Notification"

const NotificationContext = createContext();

const NotificationService = (props) => {// test.test@test.test, 1234
    const[state,dispatch] = useReducer((state,action) =>
    {
        switch(action.type)
        {
            case "ADD_NOTIFICATION":
                return [...state, {...action.payload}];
            case "REMOVE_NOTIFICATION":
                return state.filter(e1 => e1.id !== action.id)
            default:
                return state;
        }
    },[]);

    console.log("props.children logged");
    console.log(props);

    return(
      <NotificationContext.Provider value={dispatch}>
          <div className={"notification-wrapper"}>
              {state?.map( (note) => {
                        return <Notification dispatch={dispatch} key={note.id}{...note} />
                    })
              }
          </div>
          {props?.children}
      </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    const dispatch = useContext(NotificationContext);

    return (props) => {
        dispatch({
            type:"ADD_NOTIFICATION",
            payload:{
                id: v4(),
                ...props
            }
        })
    }
}

export default NotificationService;

