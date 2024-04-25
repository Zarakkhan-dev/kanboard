import React from 'react'
import { useState } from 'react';
const AddForm = ({ Submission, SetText, text }) => {
    const [Addclass, SetAddClass] = useState("");

    const handler=()=>{
        SetAddClass("");
        SetText("");
    }
    return (
        < >

            {Addclass === "" ?
            <h1 className='pr-[9vh] bg-[#EEEEEE] py-2 px-3  rounded-2xl cursor-pointer w-[300px]' onClick={()=>SetAddClass("true")}><i className="fa-solid fa-plus"></i> Add Another List </h1> :
                <form onSubmit={Submission} className='bg-[#F6F5F5] p-3 flex flex-col  gap-2 rounded-2xl'>
                    <input type="text" name="" className='outline-[#0c66e4] py-1 px-1 ' id="" placeholder='Enter the list bar' value={text} onChange={(e) => SetText(e.target.value)} />
                    <div className="Button-addlist flex items-center justify-between">
                    <button className='bg-[#0c66e4] text-white font-medium px-3 py-1' > Add List</button> 
                    <i className="fa-solid fa-xmark  hover:bg-[#B5C0D0]  px-2 py-2 hover:text-white cursor-pointer" onClick={handler}></i>
                    </div>
                </form>

  }
        </>
    )
}

export default AddForm
