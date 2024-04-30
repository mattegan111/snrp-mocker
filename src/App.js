import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import cloneDeep from 'lodash/cloneDeep';
import './App.css';
import { data as dataImport } from './data';
import { uniqueAttributes, allTypeAttributes, defaultAttributes, booleanTypeAttributes, allDefaultObjects } from './typeAttributes';
import { createContext, useContext, useState } from 'react';
import { convertSnakeToTitle, convertTitleToSnake} from './utils'

const AppContext = createContext();

function App() {
  const [openEditingSidebar, setOpenEditingSidebar] = useState(false);
  const toggleEditingSidebar = () => {
    setOpenEditingSidebar(!openEditingSidebar)
  };
  const [editingField, setEditingField] = useState();
  const [editingPane, setEditingPane] = useState('');
  const [typeAttributes, setTypeAttributes] = useState([]);
  const [data, setData] = useState(dataImport);

  return (
    <AppContext.Provider value={
      {
        data,
        setData,
        openEditingSidebar,
        setOpenEditingSidebar,
        typeAttributes,
        setTypeAttributes,
        toggleEditingSidebar,
        editingField,
        setEditingField,
        editingPane,
        setEditingPane,
        allTypeAttributes,
        uniqueAttributes,
        defaultAttributes,
        booleanTypeAttributes,
        allDefaultObjects
      }}>
    <div className="App">
      <Header />
      <div className="main-container">
        <MainContent />
        <SubmitPanel />
        <EditingSidebar />
      </div>
    </div>
  </AppContext.Provider>
  );
}

function Header() {
  const {data, editingPane, setEditingPane, openEditingSidebar, setOpenEditingSidebar} = useContext(AppContext);

  function handleOnClick(){
    if(editingPane === 'field' && openEditingSidebar || !openEditingSidebar){
      setOpenEditingSidebar(true);
    } else{
      setOpenEditingSidebar(false);
    }
    setEditingPane('form');
  }

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
      <div className='header-three' onClick={handleOnClick}>
        <p className='header-category'>Home &nbsp;&nbsp;&nbsp;&nbsp;▶</p>
        {data.form.categories.split(',').map(category => (
          <p className='header-category'>{category} &nbsp;&nbsp;&nbsp;&nbsp;▶</p>
        ))}
        <p className='header-category'>{data.form.title}</p>
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
  const {editingPane} = useContext(AppContext);

  return ( 
    <>
      {editingPane === 'field' ? 
        <EditingSidebarForFields /> : editingPane === 'form' ?
        <EditingSidebarForFormDetails /> : null
      }
    </>
  );
}

function EditingSidebarForFormDetails() {
  const {data, openEditingSidebar, setOpenEditingSidebar} = useContext(AppContext);

  return (
    <div className={openEditingSidebar ? 'editing-sidebar open-large' : 'editing-sidebar'}>
      <div className='white-inner-box'>
        <div className='editing-fields-div'>
          {
            Object.keys(data.form).map(objKey => (
              <FormDetailsField objKey={objKey}/>
            ))
          }
          <button className='btn-a' onClick={() => setOpenEditingSidebar(false)}>Close</button>
        </div>
      </div>
    </div>
  )
}

function FormDetailsField({objKey}) {
  const {data, setData} = useContext(AppContext);

  function onChange(e, objKey) {
    setData({
      ...data,
      form: {
        ...data.form,
        [objKey]: e.target.value
      }
    });
  }

  return(
    <div className='display-flex-column'>
    <label className='editing-label'>{convertSnakeToTitle(objKey)}</label>
    <input
      className='editing-field-input'
      value={data.form[objKey]}
      onChange={(e) => onChange(e, objKey)}
    />
  </div>
  )
}

function EditingSidebarForFields() {
  const { data, setData, typeAttributes, editingField, setEditingField, openEditingSidebar, toggleEditingSidebar, allDefaultObjects } = useContext(AppContext);

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
      return { ...targetObj };
    }
    const newEditingField = setNestedObjectValues(editingField, key, e.target.value);
    setEditingField(newEditingField);
    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...newEditingField
        }
      }
    });
  }

  function onChangeMandatory(e) {
    const newEditingField = { ...editingField };
    newEditingField.mandatory = e.target.checked;
    setEditingField(newEditingField);

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...newEditingField
        }
      }
    });
  }

  function onTypeChange(e, key) {
    const userResp = prompt("This operation may destroy field data, such as options or help tags, and is not generally recommended. Type 'yes' below to continue anyway, or click cancel to abort.");
    if (userResp === null) return;
    if (userResp === 'yes') {

      const newTypedField = cloneDeep(allDefaultObjects[e.target.value]);
      newTypedField.id = editingField.id

      setEditingField(newTypedField);
      setData({
        ...data,
        fields: {
          ...data.fields,
          [editingField.id]: {
            ...newTypedField
          }
        }
      });
    };
  }

  function handleEditOptions(id, e) {
    const newQuestionChoices = {
      ...editingField.question_choices,
      [id]: {
        id: id,
        value: e.target.value
      }
    };

    setEditingField({
      ...editingField,
      question_choices: newQuestionChoices
    });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...editingField,
          question_choices: newQuestionChoices
        }
      }
    });
  }

  function handleOptionDelete(id, e) {
    const newQuestionChoices = { ...editingField.question_choices };
    delete newQuestionChoices[id];

    setEditingField({
      ...editingField,
      question_choices: newQuestionChoices
    });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...editingField,
          question_choices: newQuestionChoices
        }
      }
    });
  }

  return (
    <div className={openEditingSidebar ? 'editing-sidebar open' : 'editing-sidebar'}>
      <div className='white-inner-box'>
        {editingField && (
          <div className='editing-fields-div'>
            {editingField.id}
            <div className='display-flex-column'>
              <label className='editing-label'>Question text</label>
              <input
                className='editing-field-input'
                value={editingField.question.question_text}
                onChange={(e) => onChange(e, 'question.question_text')}
              />
            </div>
            <div className='display-flex-column'>
              <label className='editing-label'>Name (system-only)</label>
              <input
                className='read-only-style editing-field-input'
                value={editingField.question.name}
                readOnly={true}
              />
            </div>
            {typeAttributes.includes('type') && (
              <div className='display-flex-column'>
                <label className='editing-label'>Type</label>
                <select
                  className='editing-field-input'
                  value={editingField.type}
                  onChange={(e) => onTypeChange(e)}
                >
                  {Object.keys(allTypeAttributes).map((type, index) =>
                    <option key={`type-option-${index}`} value={type}>
                      {convertSnakeToTitle(type)}
                    </option>
                  )}
                </select>
              </div>
            )}
            {typeAttributes.includes('mandatory') && (
              <div className='display-flex'>
                <input
                  className='editing-field-input'
                  checked={editingField.mandatory}
                  type='checkbox'
                  onChange={(e) => onChangeMandatory(e)}
                />
                <label className='editing-label'>Mandatory</label>
              </div>
            )}
            {typeAttributes.includes('annotation.show_help') && (
              <div className='display-flex'>
                <input
                  className='editing-field-input'
                  checked={editingField.annotation.show_help}
                  type='checkbox'
                  onChange={(e) => onChange(e, 'annotation.show_help')}
                />
                <label className='editing-label'>Show help</label>
              </div>
            )}
            {typeAttributes.includes('annotation.always_expanded')
              && editingField.annotation.show_help && (
                <div className='display-flex'>
                  <input
                    className='editing-field-input'
                    checked={editingField.annotation.always_expanded}
                    type='checkbox'
                    onChange={(e) => onChange(e, 'annotation.always_expanded')}
                  />
                  <label className='editing-label'>Always expanded</label>
                </div>
              )}
            {typeAttributes.includes('annotation.help_tag')
              && editingField.annotation.show_help && (
                <div className='display-flex-column'>
                  <label className='editing-label'>Help tag</label>
                  <input
                    className='editing-field-input'
                    value={editingField.annotation.help_tag}
                    onChange={(e) => onChange(e, 'annotation.help_tag')}
                  />
                </div>
              )}
            {typeAttributes.includes('question_choices') && (
              <div className='display-flex-column'>
                <label className='editing-label'>Question choices</label>
                <div name='options'>
                  <div className='option-container'>
                    {Object.keys(editingField.question_choices).map((key, index) => (
                      <div key={`${editingField.id} qc ${index}`}>
                        <label className='display-block'>id: {editingField.question_choices[key].id}</label>
                        <input 
                          className='editing-field-input'
                          type='text' 
                          value={editingField.question_choices[key].value} 
                          onChange={(e) => handleEditOptions(editingField.question_choices[key].id, e)}
                        />
                        <button 
                          className='btn-a-small'
                          onClick={() => handleOptionDelete(editingField.question_choices[key].id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
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
            <button className='btn-a' onClick={toggleEditingSidebar}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function MainContent() {
  const { data, setData, editingPane, setEditingPane, openEditingSidebar, setOpenEditingSidebar } = useContext(AppContext);

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

      if (homeGroup !== foreignGroup) {
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

  function handleOnClick(){
    if(editingPane === 'field' && openEditingSidebar || !openEditingSidebar){
      setOpenEditingSidebar(true);
    } else{
      setOpenEditingSidebar(false);
    }
    setEditingPane('form');
  }

  return (
    <div className="main-content">
      <div className='main-content-header' onClick={handleOnClick}>
        <h1>{data.form.title}</h1>
        <p>{data.form.description}</p>
      </div>
      <div className='form-instructions' onClick={handleOnClick}>
        <p>{data.form.instructions}</p>
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

function GroupList({ provided, data }) {
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
              <GroupContainer groups={data.groups} groupId={groupId} fields={data.fields} />
            </div>
          )}
        </ Draggable>
      )
    })}
    {provided.placeholder}
  </div>)
}

function GroupContainer({ groups, groupId, fields }) {
  const group = groups[groupId]
  const fieldsOfGroup = group.fieldIds.map(fieldId => fields[fieldId]);
  return <Group key={group.id} group={group} fields={fieldsOfGroup} />;
}

function Group({ group, fields }) {
  const {data, setData, setEditingField, setTypeAttributes, setOpenEditingSidebar, allDefaultObjects} = useContext(AppContext)
  const [clickedAddButton, setClickedAddButton] = useState(false);

  function handleTypeClick(e) {
    setClickedAddButton(false);
    newField(e.target.value);
  }

  function handleSelectType(e) {
    setClickedAddButton(false);
    newField(e.target.value);
  }

  function newField(type) {
    const typeSnakeCase = type.toLowerCase().split(' ').join('_');
    let highestIndex = 0
    Object.keys(data.fields).forEach(id => {
      const numericId = Number(id.replace('field-', '')) + 1;
      if(numericId > highestIndex){
        highestIndex = numericId;
      }
    });
    const newFieldId = `field-${highestIndex}`
    const newField = cloneDeep(allDefaultObjects[typeSnakeCase]);
    newField.id = newFieldId;

    console.log(newField)

    setTypeAttributes(allTypeAttributes[typeSnakeCase]);
    setEditingField(newField);
    setData(prevData => ({
      ...prevData,
      fields: {
        ...prevData.fields,
        [newFieldId]: {...newField}
      },
      groups: {
        ...prevData.groups,
        [group.id]: {
          ...prevData.groups[group.id],
          fieldIds: [...prevData.groups[group.id].fieldIds, newFieldId]
        }
      }
    }));
    setOpenEditingSidebar(true);
  }

  return <div className='purple-border'>
    <p className='purple-text'>{group.id}</p>
    <Droppable droppableId={group.id} type='field'>
      {(provided) => (
        <>
          <FieldList provided={provided} fields={fields} />
          <div>
            <button className='btn-a-wide' onClick={() => {
              setClickedAddButton(!clickedAddButton)
            }}>
              Add Field
            </button>
            {clickedAddButton && (
              <>
                <button className='btn-a' onClick={handleTypeClick} value='Single Line Text'>Single Line Text</button>
                <button className='btn-a' onClick={handleTypeClick} value='Select Box'>Select Box</button>
                <button className='btn-a' onClick={handleTypeClick} value='Multiple Choice'>Multiple Choice</button>
                <button className='btn-a' onClick={handleTypeClick} value='Rich Text Label'>Rich Text Label</button>
                <button className='btn-a' onClick={handleTypeClick} value='Checkbox'>Checkbox</button>
                <div className='display-flex'>
                  <select value='' onChange={handleSelectType}>
                    <option value='' disabled selected>More field types...</option>
                    <option value='Attachment'>Attachment</option>
                    <option value='Date'>Date</option>
                    <option value='Email'>Email</option>
                    <option value='Label'>Label</option>
                    <option value='Lookup Select Box'>Lookup Select Box</option>
                    <option value='Multi Line Text'>Multi Line Text</option>
                    <option value='Reference'>Reference</option>
                    <option value='Url'>Url</option>
                    <option value='Yes No'>Yes No</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </Droppable>
  </div>
}

function FieldList({ fields, provided }) {
  return (<div
    ref={provided.innerRef}
    {...provided.droppableProps}>
    {fields.map((field, index) => {
      return <Field key={field.id} field={field} index={index} />;
    })}
    {provided.placeholder}
  </div>)
}

function Field({ field, index }) {
  const {
    data,
    setData,
    editingField,
    setEditingField,
    editingPane,
    setEditingPane,
    typeAttributes,
    setTypeAttributes,
    openEditingSidebar,
    setOpenEditingSidebar,
    toggleEditingSidebar,
    allTypeAttributes
  } = useContext(AppContext);
  const fieldClass = field.type_specifications.variable_width === '100%' ? 'full-width' : 'half-width';// TODO fix prop undefined

  function handleOnClick(e) {
    e.preventDefault();
    setTypeAttributes(allTypeAttributes[field.type.replaceAll(' ', '_').toLowerCase()]);
    if (editingField == field && editingPane === 'field') {
      toggleEditingSidebar();
    } else {
      setEditingPane('field');
      setEditingField(field);
      setOpenEditingSidebar(true);
    }
  }

  // Handle for CheckBox as the template below doesn't suit the required layout for this type
  return (
    <>
      {field.type == 'checkbox' ?
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
        :
        <Draggable draggableId={field.id} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={`field-container ${fieldClass}`}
              onClick={handleOnClick}
            >
              <label className={`field-label ${field.mandatory ? 'required' : ''}`}>
                {field.question.question_text}
                {field.annotation.show_help ?
                  <p className='help-tag'>{field.annotation.help_tag}</p> : ''
                }
              </label>
              <Input field={field} />
            </div>
          )}
        </ Draggable>
      }
    </>
  )
}

function Input({ field }) {
  console.log(field)
  switch (field.type) {
    case 'single_line_text':
      return <input type='text' className='full-width field-input' />;
    case 'multiple_choice':
      return (
        <>
          {field.question_choices.map((choice) => {
            return (
              <>
                <input type="radio" className='full-width field-input' id={field.id + choice} name={field.id + choice} value={choice} />
                <label for={field.id + choice}>{choice}</label>
              </>
            )
          })
          }
        </>
      )
    case 'checkbox':
      return <input type='checkbox' className='full-width field-input' />;
    case 'date':
      return <input type='date' className='full-width field-input' />;
    case 'multi_line_text':
      return <textarea />;
    case 'select_box':
      return (
        <select className='full-width field-input'>
          {Object.keys(field.question_choices).length > 0 ? (
            Object.keys(field.question_choices).map((key, i) => (
              <option key={`qc${i}`} value={field.question_choices[key].value}>
                {field.question_choices[key].value}
              </option>
            ))
          ) : <></>}
        </select>
      )
    case 'reference':
      return (
        <select className='full-width field-input'>
          {['option 1', 'option 2', 'option 3'].map((choice) => { // Dummy values are used in leiu of a reference api call
            return (
              <option value={choice}>{choice}</option>
            )
          })
          }
        </select>
      )
    case 'yes_no':
      return (
        <>
          <input type='radio' id={field.id + 'yes'} name={field.id + 'yes'} value={'Yes'} />
          <label for={field.id + 'yes'}>Yes</label>
          <input type='radio' id={field.id + 'no'} name={field.id + 'no'} value={'no'} />
          <label for={field.id + 'no'}>No</label>
        </>
      )
    case 'rich_text_label':
      return <p className='full-width field-input'>{field.question.rich_text}</p>;
    default:
      break;
  }
}

export default App;
