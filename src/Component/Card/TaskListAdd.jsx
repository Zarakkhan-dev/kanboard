import React, { useState } from 'react'

const TaskListAdd = ({submission,SetText,Text}) => {
    const [AddComponent,SetComponent] = useState("");
    const handler=()=>{
      SetComponent("");
      SetText("");
    }
  return (
    <>

     {AddComponent ===""?
    <h1 className='bg-[#cbd5e1] py-1 px-3 pr-[8vh] cursor-pointer rounded-xl flex items-center gap-3 w-full ' onClick={()=>SetComponent("true")}><i className="fa-solid fa-plus"></i> Add Card</h1>:
     <form onSubmit={submission} className='flex flex-col bg-[#cbd5e1] p-3  gap-3 rounded-xl w-full'>
                <input type="text" className='outline-[#0c66e4] py-1 px-1' placeholder='Enter The List' onChange={(e)=> SetText(e.target.value)} value={Text} />
                <div className="Button flex  gap-3 ">
                <button type='Submit' className=' bg-[#0c66e4] text-white font-medium px-3 py-1'> Add list</button>
                <i className="fa-solid fa-xmark  hover:bg-[#B5C0D0]  px-2 py-2 hover:text-white cursor-pointer" onClick={handler}></i>
                </div>
            </form>
    } 
    </>
  )
}

export default TaskListAdd
