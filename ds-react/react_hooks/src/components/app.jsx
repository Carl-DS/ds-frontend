import React, { useState, useContext, useReducer, useEffect } from "react";

const myReducer = (state, action) => {
  switch (action.type) {
    case "countUp":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export default function App() {
  // useState()
  // const [buttonText, setButtonText] = useState("Click me, please");

  // function handleClick() {
  //   return setButtonText("Thanks, you did");
  // }

  // return <button onClick={handleClick}>{buttonText}</button>;

  // useContext()
  // const AppContext = React.createContext({});

  // const Navbar = () => {
  //   const {username} = useContext(AppContext)

  //   return (
  //     <div className="navbar">
  //       <p>AwesomeSite</p>
  //       <p>{username}</p>
  //     </div>
  //   )
  // }

  // const Messages = () => {
  //   const { username } = useContext(AppContext)

  //   return (
  //     <div className="messages">
  //       <h1>Messages</h1>
  //       <p>1 message for {username}</p>
  //       <p className="message">useContext is awesome!</p>
  //     </div>
  //   )
  // }

  // return (
  //   <AppContext.Provider value={{username: "superawesome"}}>
  //     <div className="App">
  //       <Navbar />
  //       <Messages />
  //     </div>
  //   </AppContext.Provider>
  // );

  // useReducer(reducer, initialState)
  // const [state, dispatch] = useReducer(myReducer, {count: 0})
  // return (
  //   <div className="App">
  //     <button onClick={()=>dispatch({type: "countUp"})}>+1</button>
  //     <p>Count:{state.count}</p>
  //   </div>
  // )

  // // useEffect
  // const Person = ({personId}) => {
  //   const [loading, setLoading] = useState(true)
  //   const [person, setPerson] = useState({})

  //   useEffect(() => {
  //     setLoading(true)
  //     fetch(`https://api.github.com/search/users?q=${personId}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         setLoading(false)
  //         setPerson(data.items[0])
  //       })
  //   }, [personId])

  //   if (loading) {
  //     return <span>loading...</span>
  //   }

  //   return <div>
  //     <p>You're viewing: {person.login}</p>
  //   </div>
  // }

  // return (
  //   <div>
  //     <Person personId={"Carl-DS"} />
  //   </div>
  // )

  // 自定义 hooks
  const usePerson = ({ personId }) => {
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({});

    useEffect(() => {
      setLoading(true);
      fetch(`https://api.github.com/search/users?q=${personId}`)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setPerson(data.items[0]);
        });
    }, [personId]);
    return [loading, person];
  };
  const Person = ({ personId }) => {
    const [loading, person] = usePerson({personId});
    if (loading) {
      return <span>loading...</span>;
    }

    return (
      <div>
        <p>You're viewing: {person.login}</p>
      </div>
    );
  };

  return (
    <div>
      <Person personId={"Carl-DS"} />
    </div>
  );
}
