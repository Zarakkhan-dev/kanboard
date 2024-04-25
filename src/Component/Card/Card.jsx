import React, { useEffect, useState } from 'react'
import AddForm from './AddForm';
import TaskListAdd from './TaskListAdd';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const Card = ({ SetWorkplace, workplace, IndexNumber }) => {

  const [allcard, SetCard] = useState([{ id: "", name: "", data: [{ id: "", todoname: "" }] }]);
  const [text, SetText] = useState();

  const Submission = (event) => {
    event.preventDefault();
    if (text === "") {
      alert('Enter The List Name');
    }
    else {
      const newCard = {
        id: generateRandomId(),
        name: text,
        data: [{ id: "", todoname: "" }]
      };
      SetCard((prevCards) => [...prevCards, newCard]);
      SetWorkplace((previous) => {
        const updatedWorkplace = [...previous];
        updatedWorkplace[IndexNumber].WorkplaceTodo = [...previous[IndexNumber].WorkplaceTodo, newCard];
        return updatedWorkplace;
      });
    }
    SetText('');
  }
  useEffect(() => {
   SetCard([]);
   SetCard(workplace);
  }, [IndexNumber]);
  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    const reorderedallcard = [...allcard];
    if (type === "group") {
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedCard] = reorderedallcard.splice(sourceIndex, 1);
      reorderedallcard.splice(destinationIndex, 0, removedCard);
    } else {
      const sourceCardIndex = reorderedallcard.findIndex(card => card.id === source.droppableId);
      const destinationCardIndex = reorderedallcard.findIndex(card => card.id === destination.droppableId);
      const sourceIndex = source.index ;
      const destinationIndex = destination.index;
      const sourceData = reorderedallcard[sourceCardIndex].data;
      const destinationData = reorderedallcard[destinationCardIndex].data;
      const [movedItem] = sourceData.splice(sourceIndex, 1);
      destinationData.splice(destinationIndex, 0, movedItem);
      reorderedallcard[sourceCardIndex] = { ...reorderedallcard[sourceCardIndex], data: sourceData };
      reorderedallcard[destinationCardIndex] = { ...reorderedallcard[destinationCardIndex], data: destinationData };
    }
    SetCard(reorderedallcard);
    SetWorkplace(previous => {
      const updatedWorkplace = [...previous]; // Create a copy of the workplace array
      updatedWorkplace[IndexNumber].WorkplaceTodo = reorderedallcard; // Update the WorkplaceTodo property
      return updatedWorkplace; // Return the updated array
    });
  };


  return (
    <>            
    <div className="card flex items-start gap-3 ">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <Droppable droppableId="ROOT" direction="horizontal" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="flex gap-4 relative ">
                {
                  allcard.map((items, index) => (
                    <Draggable
                      draggableId={items.id}
                      index={index}
                      key={items.id}
                    >
                      {(provided) => (
                        <div
                          className=""
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div {...provided.dragHandleProps} className="">
                            <TaskList {...items} SetCard={SetCard} index_items={index} SetWorkplace={SetWorkplace} IndexNumber={IndexNumber} allcard={allcard} />
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      <AddForm Submission={Submission} SetText={SetText} text={text} />
    </div>
    </>
  )
}
const TaskList = ({ SetCard, index_items, SetWorkplace, IndexNumber, allcard, name, id, data }) => {
  const [text, setText] = useState("");
  const [showEditclass, setShowEditClass] = useState("");
  const [editTodoclass, setEditTodoClass] = useState("")
  const submission = (event) => {
    event.preventDefault();
    if (text === "") {
      alert("Invalid Adding list")
    } else {
      const updatedList = [...data, { id: generateRandomId(), todoname: text }];
      const updatedAllCard = [...allcard];
      updatedAllCard[index_items].data = updatedList;
      SetCard(updatedAllCard);
      SetWorkplace(previous => {
        const updatedWorkplace = [...previous];
        updatedWorkplace[IndexNumber].WorkplaceTodo = updatedAllCard;
        return updatedWorkplace;
      });
    }
    setText("");
  }
  const EditorTextEditor = () => {
    setShowEditClass("true");
  }
  const EditorTodoEditor =(id)=>{
    setEditTodoClass(id)
  }
  return (
    <>
      <div className="Card-List bg-white p-4 flex flex-col gap-3 rounded-xl w-[30vh] cursor-default items-start justify-start" >
        <Droppable droppableId={id} direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="card-my w-full">
              <div className="">
                <h3 onClick={EditorTextEditor} className={`${showEditclass === "" ? "" : "hidden"}`}>{name}</h3>
                <div className={`${showEditclass === "" ? "hidden" : ""}`}>
                  <EditList  name={name} setShowEditClass={setShowEditClass} allcard={allcard} SetCard={SetCard} id={id} SetWorkplace={SetWorkplace} IndexNumber ={IndexNumber }/>
                </div>
              </div>
              <div className="mt-2 flex flex-col">
                { 
                data.slice(1).map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                      <div
                        className="w-full"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div className={`p-1 rounded-lg mb-3 ${editTodoclass === item.id ? "" : "hidden"}`}>
                          <EditTodo  name={item.todoname} setEditTodoClass={setEditTodoClass} allcard={allcard} SetCard={SetCard} id={id} index ={item.id} SetWorkplace={SetWorkplace} IndexNumber ={IndexNumber } />
                        </div>
                        <h4 className={` bg-slate-300 p-1 rounded-lg mb-3 cursor-default w-full ${editTodoclass === item.id ? "hidden" : ""}`}  onClick={()=>EditorTodoEditor(item.id)}>{item.todoname}</h4>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>

            </div>
          )}
        </Droppable>
        <TaskListAdd submission={submission} Text={text} SetText={setText} />
      </div>
    </>

  )
}
function generateRandomId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
const EditList = ({ name, setShowEditClass, allcard, SetCard, id,SetWorkplace,IndexNumber  }) => {
  const [text, setText] = useState(name)
  const EditTask = (event) => {
    event.preventDefault();
    setShowEditClass("");
    const updatedList = allcard.map(item => {
      if (item.id === id) {
        return { ...item, name: text };
      }
      return item;
    });
    SetCard(updatedList)
    SetWorkplace(previous => {
      const updatedWorkplace = [...previous];
      updatedWorkplace[IndexNumber].WorkplaceTodo = updatedList;
      return updatedWorkplace;
    });
  }
  return (
    <>
      <form onSubmit={EditTask}>
        <input type="text" name="" id="" className='w-full px-2 py-1 outline-none border border-1 border-[#0c66e4] rounded-xl' value={text} onChange={(e) => setText(e.target.value)} />
      </form>
    </>
  )
}
const EditTodo = ({ name, setEditTodoClass, allcard, SetCard, id,index,SetWorkplace,IndexNumber  }) => {
  const [text, setText] = useState(name)
  const EditTask = (event) => {
    event.preventDefault();
    const updatedAllCard = allcard.map(card => {
      if (card.id === id) {
        const updatedTasks = card.data.map(task => {
          if (task.id === index) {
            return { ...task, todoname: text };
          }
          return task;
        });
        return { ...card, data: updatedTasks };
      }
      return card;
    });

    SetCard(updatedAllCard);
    SetWorkplace(previous => {
      const updatedWorkplace = [...previous];
      updatedWorkplace[IndexNumber].WorkplaceTodo = updatedAllCard;
      return updatedWorkplace;
    });
    setEditTodoClass("");
   
  }
  return (
    <>
      <form onSubmit={EditTask}>
        <input type="text" name="" id="" className='w-full px-2 py-1 outline-none border border-1 border-[#0c66e4] rounded-xl' value={text} onChange={(e) => setText(e.target.value)} />
      </form>
    </>
  )
}

export default Card