import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import { data as dataImport } from './data';
import {typeAttributes as allTypeAttributes} from './typeAttributes';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

function App() {
  const [openEditingSidebar, setOpenEditingSidebar] = useState(false);
  const toggleEditingSidebar = () => {
    setOpenEditingSidebar(!openEditingSidebar)
  };
  const [editingField, setEditingField] = useState();
  const [typeAttributes, setTypeAttributes] = useState([]);
  const [data, setData] = useState(dataImport)

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <AppContext.Provider value={
          { data, 
            setData,
            openEditingSidebar, 
            setOpenEditingSidebar, 
            typeAttributes,
            setTypeAttributes,
            toggleEditingSidebar, 
            editingField, 
            setEditingField,
            allTypeAttributes 
          }}>
          <MainContent/>
          <SubmitPanel />
          <EditingSidebar />
        </AppContext.Provider>
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

function SubmitPanel() {
  return (
    <div className="submit-panel">
      <button className="submit-button">Submit</button>
    </div>
  );
}

function EditingSidebar() {
  const { data, setData, typeAttributes, editingField, setEditingField, openEditingSidebar, toggleEditingSidebar } = useContext(AppContext);

  function onChange(e, key) {
    function setNestedObjectValues(targetObj, path, value) {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const lastObj = keys.reduce((acc, key) => {
        if (!acc[key] || typeof acc[key] !== 'object') {
          acc[key] = {};
        }
        return acc[key];
      }, targetObj);
      lastObj[lastKey] = value; 
      return {...targetObj}; 
    }
    const newEditingField = setNestedObjectValues(editingField, key, e.target.value);
    setEditingField(newEditingField);
    setData({
      ...data,
      fields:{
        ...data.fields,
        [editingField.id]:{
          ...newEditingField
        }
      }
    });
  }
  

  function onChangeMandatory(e) {
    const newEditingField = {...editingField};
    newEditingField.mandatory = e.target.checked;
    setEditingField(newEditingField); 

    setData({
      ...data,
      fields:{
        ...data.fields,
        [editingField.id]:{
          ...newEditingField
        }
      }
    });
  }

  return (
    <div className={openEditingSidebar ? 'editing-sidebar open' : 'editing-sidebar'}>
      <ul>
        {editingField && (
          <div>
            {editingField.id}
            <div className='display-flex-column'>
              <label className='editing-label'>Question text</label>
              <input 
                value={editingField.question.question_text}
                onChange={(e) => onChange(e, 'question.question_text')}
              />
            </div>
            <div className='display-flex-column'>
              <label className='editing-label'>Name (system-only)</label>
              <input 
                className='read-only-style'
                value={editingField.question.name}
                readOnly={true}
              />
            </div>
          </div>
        )}
        {typeAttributes.includes('type') && (
          <div className='display-flex-column'>
            <label className='editing-label'>Type</label>
            <input 
              value={editingField.type}
              onChange={(e) => onChange(e, 'type')}
            />
          </div>
        )}
        {typeAttributes.includes('mandatory') && (
          <div className='display-flex-column'>
            <label className='editing-label'>Mandatory</label>
            <input 
              checked={editingField.mandatory}
              type='checkbox'
              onChange={(e) => onChangeMandatory(e)}
            />
          </div>
        )}
        {typeAttributes.includes('annotation.show_help') && (
          <div className='display-flex-column'>
            <label className='editing-label'>Show help</label>
            <input 
              checked={editingField.annotation.show_help}
              type='checkbox'
              onChange={(e) => onChangeMandatory(e)}
            />
          </div>
        )}
        {typeAttributes.includes('annotation.always_expanded') 
          && editingField.annotation.show_help && (
          <div className='display-flex-column'>
            <label className='editing-label'>Always expanded</label>
            <input 
              checked={editingField.annotation.always_expanded}
              type='checkbox'
              onChange={(e) => onChangeMandatory(e)}
            />
          </div>
        )}
        {typeAttributes.includes('annotation.help_tag') 
          && editingField.annotation.show_help && (
          <div className='display-flex-column'>
            <label className='editing-label'>Help tag</label>
            <input 
              value={editingField.annotation.help_tag}
              onChange={(e) => onChange(e, 'annotation.help_tag')}
            />
          </div>
        )}
        {typeAttributes.includes('annotation.comments_for_developers') && (
          <div className='display-flex-column'>
            <label className='editing-label'>Comments for developers</label>
            <input 
              value={editingField.comments_for_developers}
              onChange={(e) => onChange(e, 'annotation.comments_for_developers')}
            />
          </div>
        )}
        {typeAttributes.includes('annotation.impacts_reporting') && (
          <div className='display-flex-column'>
            <label className='editing-label'>Impacts reporting</label>
            <input 
              value={editingField.impacts_reporting}
              onChange={(e) => onChange(e, 'annotation.impacts_reporting')}
            />
          </div>
        )}
        {typeAttributes.includes('annotation.active') && (
          <div className='display-flex-column'>
            <label className='editing-label'>Active</label>
            <input 
              value={editingField.active}
              onChange={(e) => onChange(e, 'annotation.active')}
            />
          </div>
        )}
        {typeAttributes.includes('annotation.fields_to_include') && (
          <div className='display-flex-column'>
            <label className='editing-label'>Fields to include: (by Name)</label>
            <input 
              value={editingField.fields_to_include}
              onChange={(e) => onChange(e, 'annotation.fields_to_include')}
            />
          </div>
        )}
        <button onClick={toggleEditingSidebar}>Close</button>
      </ul>
    </div>
  );
}

function MainContent() {
  const { data, setData } = useContext(AppContext);

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
      const newGroupsOrder = Array.from(data.groupsOrder);
      newGroupsOrder.splice(result.source.index, 1);
      newGroupsOrder.splice(result.destination.index, 0, result.draggableId);

      setData({
        ...data,
        groupsOrder: newGroupsOrder
      });
    }
    
    if (result.type === 'field') {
      const homeGroup = data.groups[source.droppableId];
      const foreignGroup = data.groups[destination.droppableId];
  
      if(homeGroup !== foreignGroup){
        const sourceGroup = data.groups[source.droppableId];
        const newSourceFieldIds = Array.from(sourceGroup.fieldIds);
        newSourceFieldIds.splice(source.index, 1);
    
        const newSourceGroup = {
          ...sourceGroup,
          fieldIds: newSourceFieldIds
        };

        const destinationGroup = data.groups[destination.droppableId];
        const newDestinationFieldIds = Array.from(destinationGroup.fieldIds);
        newDestinationFieldIds.splice(destination.index, 0, draggableId);

        const newDestinationGroup = {
          ...destinationGroup,
          fieldIds: newDestinationFieldIds
        };
    
        setData({
          ...data,
          groups: {
            ...data.groups,
            [newSourceGroup.id]: newSourceGroup,
            [newDestinationGroup.id]: newDestinationGroup
          }
        });
      }
  
      if (homeGroup === foreignGroup) {
        const newFieldIds = Array.from(homeGroup.fieldIds);
        newFieldIds.splice(source.index, 1);
        newFieldIds.splice(destination.index, 0, draggableId);
  
        const newGroup = {
          ...homeGroup,
          fieldIds: newFieldIds,
        };
  
        setData({
          ...data,
          groups: {
            ...data.groups,
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
              <GroupList provided={provided} data={data} />
            )}
          </Droppable>
        </ DragDropContext>
      </div>
    </div>
  );
}

function GroupList({provided, data}) {
  return (<div 
    ref={provided.innerRef}
    {...provided.droppableProps}>
    {data.groupsOrder.map((groupId, index) => {
      return (

        <Draggable key={`dc-${groupId}`} draggableId={groupId} index={index}>
          {(provided) => (
            <div             
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >
              <GroupContainer  groups={data.groups} groupId={groupId} fields={data.fields}/>
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
  return <div className='purple-border'>
    <p className='purple-text'>{group.id}</p>
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
        return <Field key={field.id} field={field} index={index} />;
      })}
      {provided.placeholder}
  </div>)
}

function Field({field, index}) {
  const {
    data, 
    setData, 
    editingField, 
    setEditingField, 
    typeAttributes,
    setTypeAttributes,
    openEditingSidebar, 
    setOpenEditingSidebar, 
    toggleEditingSidebar,
    allTypeAttributes
  } = useContext(AppContext);
  const fieldClass = field.type_specifications.variable_width === '100%' ? 'full-width' : 'half-width';

  function handleOnClick(e){
    e.preventDefault();
    console.log(field)
    console.log(allTypeAttributes[field.type.replaceAll(' ', '_').toLowerCase()]);
    setTypeAttributes(allTypeAttributes[field.type.replaceAll(' ', '_').toLowerCase()]);
    if(editingField == field){
      toggleEditingSidebar();
    } else {
      setEditingField(field);
      setOpenEditingSidebar(true);
    }
  }

  // Handle for CheckBox as the template below doesn't suit the required layout for this type
  if(field.type == 'CheckBox'){
    return (
      <Draggable draggableId={field.id} index={index}>
        {(provided) => (
          <div 
            className={`field-container display-flex ${fieldClass}`}            
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <input type='checkbox' />
            <p className={`p-label ${field.mandatory ? 'required' : ''}`} onClick={handleOnClick} >{field.question.question_text}</p>
          </div>
        )}
      </ Draggable>
    );
  }

  return (
      <Draggable draggableId={field.id} index={index}>
        {(provided) => (
          <div             
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`field-container ${fieldClass}`}
          onClick={handleOnClick}
          >
            <label className={`field-label ${field.mandatory? 'required' : ''}`}>
              {field.question.question_text}
              {field.annotation.show_help ? 
                  <p className='help-tag'>{field.annotation.help_tag}</p> : ''
              }
            </label>
            <Input field={field}/>
          </div>
        )}
      </ Draggable>
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
          {field.question_choices.map((choice, i) => {
            return (
              <option key={`qc${i}`} value={choice}>{choice}</option>
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
