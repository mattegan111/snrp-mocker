import { Droppable } from 'react-beautiful-dnd';
import cloneDeep from 'lodash/cloneDeep';
import { allTypeAttributes } from '../../../typeAttributes';
import { useContext, useState } from 'react';
import { AppContext } from '../../../App';
import { FieldList } from '../Fields/FieldList';

export function Group({ group, fields }) {
  const {
    data,
    setData,
    editingField,
    setEditingField,
    editingPane,
    setEditingPane,
    hideEditingTools,
    setTypeAttributes,
    openEditingSidebar,
    setOpenEditingSidebar,
    setFlash,
    allDefaultObjects,
  } = useContext(AppContext);
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
      if (data.groups[group].id.replace('group-', '') > newGroupIdNum) {
        newGroupIdNum = Number(data.groups[group].id.replace('group-', ''));
      }
      newGroupIdStr = `group-${newGroupIdNum + 1}`;
    });

    const newGroup = {
      id: newGroupIdStr,
      column_count: 1,
      title: '',
      fieldIds: [],
    };

    const newGroupsOrder = [...data.groupsOrder];
    newGroupsOrder.splice(insertAtIndex + 1, 0, newGroupIdStr);

    setData({
      ...data,
      groups: {
        ...data.groups,
        [newGroup.id]: { ...newGroup },
      },
      groupsOrder: newGroupsOrder,
    });
  }

  function handleEditGroupClick(groupId, e) {
    if (openEditingSidebar) {
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
      }, 500);
    }

    if (
      editingPane === 'group' &&
      editingField.id === groupId &&
      openEditingSidebar
    ) {
      setOpenEditingSidebar(false);
    } else {
      setEditingPane('group');
      setEditingField(data.groups[groupId]);
      setOpenEditingSidebar(true);
    }
  }

  function newField(type) {
    const typeSnakeCase = type.toLowerCase().split(' ').join('_');
    let highestIndex = 0;
    Object.keys(data.fields).forEach((id) => {
      const numericId = Number(id.replace('field-', '')) + 1;
      if (numericId > highestIndex) {
        highestIndex = numericId;
      }
    });
    const newFieldId = `field-${highestIndex}`;
    const newField = cloneDeep(allDefaultObjects[typeSnakeCase]);
    newField.id = newFieldId;

    setTypeAttributes(allTypeAttributes[typeSnakeCase]);
    setEditingField(newField);
    setData((prevData) => ({
      ...prevData,
      fields: {
        ...prevData.fields,
        [newFieldId]: { ...newField },
      },
      groups: {
        ...prevData.groups,
        [group.id]: {
          ...prevData.groups[group.id],
          fieldIds: [...prevData.groups[group.id].fieldIds, newFieldId],
        },
      },
    }));
    setOpenEditingSidebar(true);
  }

  return (
    <div className={hideEditingTools ? 'hidden-container' : 'group-container'}>
      {!hideEditingTools && (
        <p
          className="purple-text"
          onClick={() => handleEditGroupClick(group.id)}
        >
          {group.id}
        </p>
      )}
      <Droppable droppableId={group.id} type="field">
        {(provided) => (
          <>
            {group.title.length > 0 ? (
              <p className="group-title">{group.title}</p>
            ) : null}
            <FieldList provided={provided} fields={fields} />
            <div>
              {!hideEditingTools && (
                <>
                  <button
                    className="btn-a-wide"
                    onClick={() => {
                      setClickedAddButton(!clickedAddButton);
                    }}
                  >
                    Add Field
                  </button>
                  {clickedAddButton && (
                    <>
                      <button
                        className="btn-a"
                        onClick={handleTypeClick}
                        value="Single Line Text"
                      >                      
                        Single Line Text
                      </button>
                      <button
                        className="btn-a"
                        onClick={handleTypeClick}
                        value="Multi Line Text"
                      >
                        Multi Line Text
                      </button>
                      <button
                        className="btn-a"
                        onClick={handleTypeClick}
                        value="Select Box"
                      >
                        Select Box
                      </button>
                      <button
                        className="btn-a"
                        onClick={handleTypeClick}
                        value="Multiple Choice"
                      >
                        Multiple Choice
                      </button>
                      <button
                        className="btn-a"
                        onClick={handleTypeClick}
                        value="Rich Text Label"
                      >
                        Rich Text Label
                      </button>
                      <button
                        className="btn-a"
                        onClick={handleTypeClick}
                        value="Checkbox"
                      >
                        Checkbox
                      </button>
                      <div className="display-flex">
                        <select value="" onChange={handleSelectType}>
                          <option value="" disabled selected>
                            More field types...
                          </option>
                          <option value="Attachment">Attachment</option>
                          <option value="Date">Date</option>
                          <option value="Email">Email</option>
                          <option value="Label">Label</option>
                          <option value="Lookup Select Box">
                            Lookup Select Box
                          </option>
                          <option value="Reference">Reference</option>
                          <option value="Url">Url</option>
                          <option value="Yes No">Yes No</option>
                        </select>
                      </div>
                    </>
                  )}
                  <button
                    className="btn-a-wide"
                    onClick={() => handleAddGroup(group)}
                  >
                    {' '}
                    Add Group
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </Droppable>
    </div>
  );
}
