import React, { useEffect, useState } from 'react'
import Workplace from '../Workplace/Workplace'
import Card from '../Card/Card'
import axios from 'axios'
import "./sidebar.css"
const Sidebar = () => {
  const [IndexNumber, SetIndexNumber] = useState(0);
  const [menu_icon,update_menuicon] = useState(0);
  const [workplace, SetWorkplace] = useState([{
    WorkplaceName: "",
    WorkplaceTodo: [],
  }])
  const [WorkplaceName, SetWorkplaceName] = useState("");
useEffect(()=>{
 async function APICALL(){
  if(workplace.length ===1){
    const response = await axios.get("http://localhost:3000/kandboardfetching");
    console.log(response.data)
    if(response.status === 201){
      SetWorkplace(response.data)
    }
   else{
    alert("error occur in database ")
   }
  }
  else{
    const response = await axios.post("http://localhost:3000/kandboard",{workplace});

    if(response.status ===201){
     
    }
    else{
      alert("error occur in database")
    }
  }
}
APICALL();
},[SetWorkplace ,workplace])
const handler =()=>{
  if(menu_icon ===0){
    update_menuicon(1)
  }
  else{
    update_menuicon(0)
  }
}
  return (
    <>
      <div className="menu-icon ">
          <i className="fa-solid fa-bars fa-lg" onClick={handler}></i>
          </div>
      <div className="Sidebar flex w-screen ">
        <div className={`Workplace-Bar  bg-slate-300  m-4 rounded-xl  w-[33vh] ${menu_icon === 0? "active_menu" :"" }`}>
          <Workplace SetWorkplaceName={SetWorkplaceName} workplace={workplace} SetWorkplace={SetWorkplace} SetIndexNumber={SetIndexNumber}  />
        </div>
        <div className="CardForm  bg-slate-300 m-4 rounded-xl p-8 overflow-x-auto  ">
          {IndexNumber === 0 ? "" : <Card SetWorkplace={SetWorkplace} workplace={workplace[IndexNumber].WorkplaceTodo} IndexNumber={IndexNumber} />}
        </div>
      </div>
    </>
  )
}

export default Sidebar
