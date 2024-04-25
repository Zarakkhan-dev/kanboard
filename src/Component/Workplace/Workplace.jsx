import React, { useState } from 'react'
import "./workplace.css"
const Workplace = ({ SetWorkplaceName, workplace, SetWorkplace, SetIndexNumber }) => {
  const [addBoardClass, SetAddBoardclass] = useState("");
  const [Text, SetText] = useState("");
  const Submission = async(event) => {
    event.preventDefault();
    if (Text === "") {
      alert("Enter The field");
    }
    else {
      SetWorkplaceName(() => {
        return Text
      });
      if(workplace.length ===0){
        SetWorkplace(() => {
          return [
            {
              WorkplaceName: Text,
              WorkplaceTodo: [],
            }
          ]
        })
      }
      else{
        SetWorkplace((previous) => {
          return [
            ...previous,
            {
              WorkplaceName: Text,
              WorkplaceTodo: [],
            }
          ]
        })
      }
    }
    SetText("");
  }
  return (
    <>
      <section className='flex flex-col '>
        <div className="Board-Adding ">
          <section className='Section-Board-add relative'>
            <Template SetAddBoardclass={SetAddBoardclass} />
            <Add_Board_Form Submission={Submission} addBoardClass={addBoardClass} SetText={SetText} Text={Text} SetAddBoardclass={SetAddBoardclass} />
          </section>
        </div>
        <ul className='workplace-name flex flex-col p-1 gap-3 text-center h-[80vh] mx-1 mb-3'>
        {workplace.slice(1).map((item, index) => {
      
            return (
              <li
                key={index}
               onClick={() => SetIndexNumber(index + 1)}
                className='w-[22vh] hover:bg-slate-500 p-1 text-black font-bold cursor-pointer flex justify-center mx-1'
              >
                {item.WorkplaceName}
              </li>
            );
        })}
      </ul>
      </section>
    </>
  )
}

export default Workplace


const Template = ({ SetAddBoardclass }) => {
  return (
    <>
      <div className="Add-workplace  mx-4 my-5 p-2 rounded-lg bg-slate-400 hover:bg-slate-200 cursor-pointer" onClick={() => SetAddBoardclass("True")}>
        <h1 className='flex items-center justify-between'> Your Board  <i className="fa-solid fa-plus"></i></h1>
      </div>
    </>
  )
}

const Add_Board_Form = ({ Submission, SetText, Text, addBoardClass, SetAddBoardclass }) => {
  const hander = () => {
    SetAddBoardclass("");
    SetText("");
  }
  return (

    <>
      <form onSubmit={Submission} className={`form-Board-add flex flex-col items-start gap-3 ${addBoardClass === "" ? "" : "Active-Board-Add"}`}>
        <input type="text" name="" id="" placeholder='Add workplace' className=' p-1 rounded text-base   outline-[#378CE7] w-full' onChange={(event) => SetText(event.target.value)} value={Text} />
        <div className="Button-add flex gap-3 items-center ">
          <button type='submit' className='bg-[#378CE7] py-1 px-2 text-white text-base rounded hover:opacity-80'>Add workplace</button>
          <i className="fa-solid fa-xmark hover:bg-[#EEEDEB] py-2 px-2  cursor-pointer" onClick={hander}></i>
        </div>
      </form>
    </>
  )
}