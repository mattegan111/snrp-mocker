import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import { data } from './data';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <MainContent data={data}/>
        <Sidebar />
      </div>
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="header">
        <div className="logo">Logo</div>
        <div className="header-right">
          <p>My Lists</p>
          <p>Tours</p>
          <p>● UserName</p>
        </div>
      </div>
      <div className='header-two'>
        <p>Tech Support Portal</p>
        <p className='selected-tab'>Customer Service Gateway</p>
      </div>
      <div className='header-three'>
        <p>Home &nbsp;&nbsp;&nbsp;&nbsp;▶&nbsp;&nbsp;&nbsp;&nbsp; Category &nbsp;&nbsp;&nbsp;&nbsp;▶&nbsp;&nbsp;&nbsp;&nbsp; SubCategory &nbsp;&nbsp;&nbsp;&nbsp;▶&nbsp;&nbsp;&nbsp;&nbsp; This Form</p>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button>⌕</button>
        </div>
      </div>
    </>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <button className="submit-button">Submit</button>
    </div>
  );
}

function MainContent({data}) {
  const [state, setState] = useState(data);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    
    if (result.type === 'group') {
      console.log(result)
      console.log('group type')

      const newGroupsOrder = Array.from(state.groupsOrder);
      newGroupsOrder.splice(result.source.index, 1);
      newGroupsOrder.splice(result.destination.index, 0, result.draggableId);

      setState({
        ...state,
        groupsOrder: newGroupsOrder
      });
    }
    
    if (result.type === 'field') {
      const homeGroup = state.groups[source.droppableId];
      const foreignGroup = state.groups[destination.droppableId];
  
      if(homeGroup !== foreignGroup){
        console.log('homeGroup !== foreignGroup')

        const sourceGroup = state.groups[source.droppableId];
        const newSourceFieldIds = Array.from(sourceGroup.fieldIds);
        newSourceFieldIds.splice(source.index, 1);
    
        const newSourceGroup = {
          ...sourceGroup,
          fieldIds: newSourceFieldIds
        };

        const destinationGroup = state.groups[destination.droppableId];
        const newDestinationFieldIds = Array.from(destinationGroup.fieldIds);
        newDestinationFieldIds.splice(destination.index, 0, draggableId);

        const newDestinationGroup = {
          ...destinationGroup,
          fieldIds: newDestinationFieldIds
        };
    
        setState({
          ...state,
          groups: {
            ...state.groups,
            [newSourceGroup.id]: newSourceGroup,
            [newDestinationGroup.id]: newDestinationGroup
          }
        });
      }
  
      if (homeGroup === foreignGroup) {
        console.log('homeGroup === foreignGroup')
        const newFieldIds = Array.from(homeGroup.fieldIds);
        newFieldIds.splice(source.index, 1);
        newFieldIds.splice(destination.index, 0, draggableId);
  
        const newGroup = {
          ...homeGroup,
          fieldIds: newFieldIds,
        };
  
        setState({
          ...state,
          groups: {
            ...state.groups,
            [newGroup.id]: newGroup,
          },
        });
      }
    }
  }

  return (
    <div className="main-content">
      <div className='main-content-header'>
        <h1>Form Name</h1>
        <p>Description of the form here...</p>
      </div>
      <div className='form-instructions'>
        <p>Instructions on how to fill out the form</p>
      </div>
      <div className='form-fields'>
        <p className='required'>Indicates required</p>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-groups' type='group'>
            {(provided) => (
              <GroupList provided={provided} state={state} />
            )}
          </Droppable>
        </ DragDropContext>
      </div>
    </div>
  );
}

function GroupList({provided, state}) {
  return (<div 
    ref={provided.innerRef}
    {...provided.droppableProps}>
    {state.groupsOrder.map((groupId, index) => {
      return (

        <Draggable key={`dc-${groupId}`} draggableId={groupId} index={index}>
          {(provided) => (
            <div             
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >
              <GroupContainer  groups={state.groups} groupId={groupId} fields={state.fields}/>
            </div>
          )}
        </ Draggable>
      )
    })}
    {provided.placeholder}
  </div>)
}

function GroupContainer({groups, groupId, fields}) {
  const group = groups[groupId]
  const fieldsOfGroup = group.fieldIds.map(fieldId => fields[fieldId]);
  return <Group key={group.id} group={group} fields={fieldsOfGroup} />;
}

function Group({group, fields}) {
  return <div>
    {group.id}
    <Droppable droppableId={group.id} type='field'>
      {(provided) => (
        <FieldList provided={provided} fields={fields} />
      )}
    </Droppable>
  </div>
}

function FieldList({fields, provided}) {
  return (<div 
    ref={provided.innerRef}
    {...provided.droppableProps}>
      {fields.map((field, index) => {
        console.log('FIELD')
        console.log(field)
        return <Field key={field.id} field={field} index={index} />;
      })}
      {provided.placeholder}
  </div>)
}

function Field({field, index}) {
  const fieldClass = field.type_specifications.variable_width === '100%' ? 'full-width' : 'half-width';
  const isRequired = field.mandatory;

  // Handle for CheckBox as the template below doesn't suit the required layout for this type
  if(field.type == 'CheckBox'){
    return (
      <Draggable draggableId={field.id} index={index}>
        {(provided) => (
          <div 
          className={`field-container ${fieldClass}`}            
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          >
            <input type='checkbox'/>
            <p className={`p-label ${isRequired? 'required' : null}`}>{field.question.name}</p>
          </div>
        )}
      </ Draggable>
    );
  }

  return (
    <div>
      <Draggable draggableId={field.id} index={index}>
        {(provided) => (
          <div             
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`field-container ${fieldClass}`}
          >
            <label className={`field-label ${isRequired? 'required' : null}`}>
              {field.question.name}
              {field.annotation.show_help ? 
                  <p className='help-tag'>{field.annotation.help_tag}</p> : null
              }
            </label>
            <Input field={field}/>
          </div>
      )}
      </ Draggable>
    </div>
  );
}

function Input({field}) {
  switch(field.type){
    case 'Single Line Text':
      return <input type='text' className='full-width field-input'/>;
    case 'Multiple Choice':
      return (
        <>
          {field.question_choices.map((choice) => {
            return (
              <>
                <input type="radio" className='full-width field-input' id={field.id + choice} name={field.id + choice} value={choice} />
                <label for={field.id + choice}>{choice}</label>
              </>
            )})
          }
        </>
      )
    case 'CheckBox':
      return <input type='checkbox' className='full-width field-input'/>;
    case 'Date':
      return <input type='date' className='full-width field-input'/>;
    case 'Multi Line Text':
      return <textarea/>;
    case 'Select Box':
      return (
        <select className='full-width field-input'>
          {field.question_choices.map((choice) => {
            return (
              <option value={choice}>{choice}</option>
            )})
          }
        </select>
      )
    case 'Reference':
      return (
        <select className='full-width field-input'>
          {['option 1', 'option 2', 'option 3'].map((choice) => { // Dummy values are used in leiu of a reference api call
            return (
              <option value={choice}>{choice}</option>
            )})
          }
        </select>
      ) 
    case 'Yes / No':
      return (
        <>
          <input type='radio' id={field.id + 'yes'} name={field.id + 'yes'} value={'Yes'} />
          <label for={field.id + 'yes'}>Yes</label>  
          <input type='radio' id={field.id + 'no'} name={field.id + 'no'} value={'no'} />
          <label for={field.id + 'no'}>No</label> 
        </>
      ) 
    case 'Rich Text Label':
      return <p className='full-width field-input'>{field.question.rich_text}</p>;
    default:
      break;
  }
}

export default App;
