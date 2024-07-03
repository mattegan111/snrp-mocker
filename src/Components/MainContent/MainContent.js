import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { GroupList } from './Groups/GroupList';

export function MainContent() {
  const {
    data,
    editingPane,
    setEditingPane,
    openEditingSidebar,
    setOpenEditingSidebar,
  } = useContext(AppContext);

  function handleOnClick() {
    if ((editingPane !== 'form' && openEditingSidebar) || !openEditingSidebar) {
      setOpenEditingSidebar(true);
    } else {
      setOpenEditingSidebar(false);
    }
    setEditingPane('form');
  }

  return (
    <div className="main-content">
      <div className="main-content-header" onClick={handleOnClick}>
        <h1>{data.form.title}</h1>
        <p>{data.form.description}</p>
      </div>
      <div className="form-instructions" onClick={handleOnClick}>
        <p>{data.form.instructions}</p>
      </div>
      <FormFields view={'portal'}/>
    </div>
  );
}

export function FormFields({view}) {
  const {
    data,
    setData,
  } = useContext(AppContext);

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
        groupsOrder: newGroupsOrder,
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
          fieldIds: newSourceFieldIds,
        };

        const destinationGroup = data.groups[destination.droppableId];
        const newDestinationFieldIds = Array.from(destinationGroup.fieldIds);
        newDestinationFieldIds.splice(destination.index, 0, draggableId);

        const newDestinationGroup = {
          ...destinationGroup,
          fieldIds: newDestinationFieldIds,
        };

        setData({
          ...data,
          groups: {
            ...data.groups,
            [newSourceGroup.id]: newSourceGroup,
            [newDestinationGroup.id]: newDestinationGroup,
          },
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
  
  return(
    <div className="form-fields">
      {view === 'portal' ? 
        <p className="required">Indicates required</p> 
      : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-groups" type="group">
          {(provided) => <GroupList provided={provided} data={data} />}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
