import { Draggable } from 'react-beautiful-dnd';
import { GroupContainer } from './GroupContainer';

export function GroupList({ provided, data }) {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      {data.groupsOrder.map((groupId, index) => {
        return (
          <Draggable key={`dc-${groupId}`} draggableId={groupId} index={index}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <GroupContainer
                  groups={data.groups}
                  groupId={groupId}
                  fields={data.fields}
                />
              </div>
            )}
          </Draggable>
        );
      })}
      {provided.placeholder}
    </div>
  );
}
