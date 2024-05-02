import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import cloneDeep from 'lodash/cloneDeep';
import './App.css';
import { data as dataImport } from './data';
import { uniqueAttributes, allTypeAttributes, defaultAttributes, booleanTypeAttributes, allDefaultObjects } from './typeAttributes';
import { createContext, useContext, useState, useEffect } from 'react';
import { convertSnakeToTitle, convertTitleToSnake} from './utils'

const AppContext = createContext();

function App() {
  const [data, setData] = useState(dataImport);
  const [openEditingSidebar, setOpenEditingSidebar] = useState(false);
  const toggleEditingSidebar = () => {
    setOpenEditingSidebar(!openEditingSidebar)
  };
  const [editingField, setEditingField] = useState();
  const [editingPane, setEditingPane] = useState('');
  const [hideEditingTools, setHideEditingTools] = useState(false)
  const [typeAttributes, setTypeAttributes] = useState([]);
  const [flash, setFlash] = useState(false);

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
        allDefaultObjects,
        flash,
        setFlash,
        hideEditingTools,
        setHideEditingTools
      }}>
    <div className="App">
      <div className='main-container'>
        <TopBar />
        <Header />
        <div className="headerless-container">
          <MainContent />
          <SubmitPanel />
          <EditingSidebar />
        </div>
      </div>
    </div>
  </AppContext.Provider>
  );
}

function TopBar() {
  const {hideEditingTools, setHideEditingTools} = useContext(AppContext);
  return (
    <div className="top-bar">
      <div className='inner-top-bar'>
        <div className='top-bar-categories'>
          <div className="top-bar-category">
            <h3>Project</h3>
            <div className='top-bar-buttons'>
              <button className='btn-a-small side-margin-5'>Open</button>
              <button className='btn-a-small side-margin-5'>Save</button>
            </div>
          </div>
          <div className='vertical-split'/>
          <div className="top-bar-category">
            <h3>View</h3>
            <div className='top-bar-buttons'>
              <button className='btn-a-small side-margin-5'>Key Requirements</button>
              <button className='btn-a-small side-margin-5'>Portal</button>
              <button className='btn-a-small side-margin-5'>Case</button>
              <button className='btn-a-small side-margin-5'>Deleted Data</button>
            </div>
          </div> 
          <div className='vertical-split'/>
          <div className="top-bar-category">
            <h3>Visibility</h3>
            <div className='top-bar-buttons'>
              <button className='btn-a-small side-margin-5'onClick={() => setHideEditingTools(!hideEditingTools)}>
                {hideEditingTools ? 'Show Editing Tools' : 'Hide Editing Tools'}
              </button>
            </div>
          </div> 
          <div className='vertical-split'/>
          <div className="top-bar-category">
            <h3>Layouts</h3>
              <div className='top-bar-buttons'>
                <select className='side-margin-5'>
                  <option>Layout 1</option>
                  <option>Layout 2</option>
                </select>
                <button className='btn-a-small side-margin-10'>Save Layout</button>
              </div>
          </div>
          <div className='vertical-split'/>
          <div className="top-bar-category">
            <h3>Versioning</h3>
              <div className='top-bar-buttons'>
                <select className='side-margin-5'>
                  <option>Version 1</option>
                  <option>Version 2</option>
                </select>
                <button className='btn-a-small side-margin-5'>Save New Version</button>
                <button className='btn-a-small side-margin-5'>Save New Iteration</button>
                <button className='btn-a-small side-margin-5'>Delete...</button>
              </div>
          </div>
          <div className='vertical-split'/>
          <div className="top-bar-category">
            <h3>Export Diff</h3>
            <div className='top-bar-buttons'>              
              <select className='side-margin-5'>
                <option>Version 1</option>
                <option>Version 2</option>
              </select>
              <select className='side-margin-5'>
                <option>Version 1</option>
                <option>Version 2</option>
              </select>
              <button className='btn-a-small side-margin-5'>Export</button>
            </div>
          </div> 
        </div>
      </div>
    </div>
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
        <EditingSidebarForFormDetails /> : editingPane === 'group' ?
        <EditingSidebarForGroups /> : null
      }
    </>
  );
}

function EditingSidebarForFormDetails() {
  const {data, openEditingSidebar, setOpenEditingSidebar, hideEditingTools} = useContext(AppContext);

  return (
    <div className={openEditingSidebar && !hideEditingTools ? 'editing-sidebar open-large' : 'editing-sidebar'}>
      <div className={'white-inner-box'}>
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

function EditingSidebarForGroups() {
  const {data, setData, editingField, openEditingSidebar, setOpenEditingSidebar, hideEditingTools, flash} = useContext(AppContext);

  function handleTitleChange(e){
    setData({
      ...data,
      groups: {
        ...data.groups,
        [data.groups[editingField.id].id]: {
          ...data.groups[editingField.id],
          title: e.target.value
        }
      }
    });
  }


  return (
    
    <div className={openEditingSidebar && !hideEditingTools ? 'editing-sidebar open' : 'editing-sidebar'}>
      <div className={`white-inner-box ${flash ? 'flash-animation' : ''}`}>
        <div className='editing-fields-div'>
          <p>{editingField.id}</p>
          <div className='display-flex-column'>
            <label className='editing-label'>Title</label>
            <input
              className='editing-field-input'
              value={data.groups[editingField.id].title}
              onChange={(e) => handleTitleChange(e)}
            />
          </div>
          <div className='display-flex-column'>
            <label className='editing-label'>Column Count</label>
            <select>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <button className='btn-a' onClick={() => setOpenEditingSidebar(false)}>Close</button>
        </div>
      </div>
    </div>
  )
}

function EditingSidebarForFields() {
  const { data, setData, typeAttributes, editingField, setEditingField, openEditingSidebar, hideEditingTools, toggleEditingSidebar, allDefaultObjects, flash } = useContext(AppContext);
  
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

  function onChangeShowHelp(e){
    const newEditingField = { ...editingField,
      annotation: {
        ...editingField.annotation,
        show_help: e.target.checked
      }
    };
    setEditingField({...newEditingField});

    setData({
      ...data,
      fields: {
        ...data.fields,
        [newEditingField.id]: {
          ...newEditingField
        }
      }
    });
  }

  function onChangeAlwaysExpanded(e){
    const newEditingField = { ...editingField,
      annotation: {
        ...editingField.annotation,
        always_expanded: e.target.checked
      }
    };
    setEditingField({...newEditingField});

    setData({
      ...data,
      fields: {
        ...data.fields,
        [newEditingField.id]: {
          ...newEditingField
        }
      }
    });
  }

  function onChangeActive(e) {
    const newEditingField = { ...editingField,
      active: e.target.checked
    };
    setEditingField({...newEditingField});

    setData({
      ...data,
      fields: {
        ...data.fields,
        [newEditingField.id]: {
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
    <div className={openEditingSidebar && !hideEditingTools ? 'editing-sidebar open' : 'editing-sidebar'}>
      <div className={`white-inner-box ${flash ? 'flash-animation' : ''}`}>
        {editingField && (
          <div className='editing-fields-div'>
            <div className='display-flex-column'>
              <label className='editing-label'>Name (system-only)</label>
              <input
                className='read-only-style editing-field-input'
                value={editingField.question.name}
                readOnly={true}
              />
            </div>
            <div className='display-flex-column'>
              <label className='editing-label'>Question text</label>
              <input
                className='editing-field-input'
                value={editingField.question.question_text}
                onChange={(e) => onChange(e, 'question.question_text')}
              />
            </div>
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
                  onChange={(e) => onChangeShowHelp(e)}
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
                    onChange={(e) => onChangeAlwaysExpanded(e)}
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
            {typeAttributes.includes('annotation.fields_to_include') && (
              <div className='display-flex-column'>
                <label className='editing-label'>Fields to include: (by Name)</label>
                <input
                  value={editingField.fields_to_include}
                  onChange={(e) => onChange(e, 'annotation.fields_to_include')}
                  />
              </div>
            )}
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
            {typeAttributes.includes('active') && (
              <div className='display-flex'>
                <input
                    className='editing-field-input'
                    checked={editingField.active}
                    type='checkbox'
                    onChange={(e) => onChangeActive(e)}
                    />
                <label className='editing-label'>Active</label>
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
  return (
    <div
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
    </div>
  )
}

function GroupContainer({ groups, groupId, fields }) {
  const group = groups[groupId]
  const fieldsOfGroup = group.fieldIds.map(fieldId => fields[fieldId]);
  return <Group key={group.id} group={group} fields={fieldsOfGroup} />;
}

function Group({ group, fields }) {
  const {data, setData, editingField, setEditingField, editingPane, setEditingPane, hideEditingTools, setTypeAttributes, openEditingSidebar, setOpenEditingSidebar, setFlash, allDefaultObjects} = useContext(AppContext)
  const [clickedAddButton, setClickedAddButton] = useState(false);

  function handleTypeClick(e) {
    setClickedAddButton(false);
    newField(e.target.value);
  }

  function handleSelectType(e) {
    setClickedAddButton(false);
    newField(e.target.value);
  }

  function handleAddGroup(group, e) {
    const insertAtIndex = data.groupsOrder.indexOf(group.id);

    let newGroupIdNum = 0;
    let newGroupIdStr = '';
    Object.keys(data.groups).forEach((group, i) => {
      if(data.groups[group].id.replace('group-', '') > newGroupIdNum){
        newGroupIdNum = Number(data.groups[group].id.replace('group-', ''));
      }
      newGroupIdStr = `group-${newGroupIdNum + 1}`
    });

    const newGroup= {
        id: newGroupIdStr,
        column_count: 1,
        title: '',
        fieldIds: []
    };

    const newGroupsOrder = [...data.groupsOrder];
    newGroupsOrder.splice(insertAtIndex + 1, 0, newGroupIdStr);
    
    setData({
      ...data,
      groups: {
        ...data.groups,
        [newGroup.id]: {...newGroup},
      },
      groupsOrder: newGroupsOrder
    });
  }

  function handleEditGroupClick(groupId, e) {
    if(openEditingSidebar){
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
      }, 500)
    }


    if(editingPane === 'group' && editingField.id === groupId && openEditingSidebar){
      setOpenEditingSidebar(false);
    } else{
      setEditingPane('group');
      setEditingField(data.groups[groupId]);
      setOpenEditingSidebar(true)
    }
  }

  function newField(type) {
    const typeSnakeCase = type.toLowerCase().split(' ').join('_');
    let highestIndex = 0;
    Object.keys(data.fields).forEach(id => {
      const numericId = Number(id.replace('field-', '')) + 1;
      if(numericId > highestIndex){
        highestIndex = numericId;
      }
    });
    const newFieldId = `field-${highestIndex}`
    const newField = cloneDeep(allDefaultObjects[typeSnakeCase]);
    newField.id = newFieldId;

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

  return (
  <div className={hideEditingTools ? 'hidden-container' : 'group-container'}>
    {!hideEditingTools && (
      <p className='purple-text' onClick={() => handleEditGroupClick(group.id)}>{group.id}</p>
    )}
    <Droppable droppableId={group.id} type='field'>
      {(provided) => (
        <>
          {group.title.length > 0 ? <p className='group-title'>{group.title}</p> : null}
          <FieldList provided={provided} fields={fields} />
          <div>
            {!hideEditingTools && (
              <>
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
                <button className='btn-a-wide' onClick={() => handleAddGroup(group)}> Add Group</button>
              </> 
            )}
          </div>
        </>
      )}
    </Droppable>
  </div>)
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
    allTypeAttributes,
    setFlash
  } = useContext(AppContext);
  const [helpClicked, setHelpClicked] = useState(false);
  const fieldClass = field.type_specifications.variable_width === '100%' ? 'full-width' : 'half-width';// TODO fix prop undefined
  
  function handleOnClick(e) {
    e.preventDefault();

    if(openEditingSidebar){
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
      }, 500)
    }

    setTypeAttributes(allTypeAttributes[field.type.replaceAll(' ', '_').toLowerCase()]);

    if (editingField == field && editingPane === 'field') {
      toggleEditingSidebar();
    } else {
      setEditingPane('field');
      setEditingField(field);
      setOpenEditingSidebar(true);
    }
  }

  function handleHelpClick(e) {
    e.stopPropagation();
    setHelpClicked(!helpClicked);
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
                {field.annotation.show_help && (
                  <div className='help-icon' onClick={handleHelpClick}>?</div>
                )}
                {field.annotation.show_help && (helpClicked || field.annotation.always_expanded) ?
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
