import { Draggable } from 'react-beautiful-dnd';
import { useContext, useState } from 'react';
import { AppContext } from '../../../App';
import { Input } from './Input';

export function Field({ field, index }) {
  const {
    editingField,
    setEditingField,
    editingPane,
    setEditingPane,
    setTypeAttributes,
    openEditingSidebar,
    setOpenEditingSidebar,
    toggleEditingSidebar,
    allTypeAttributes,
    setFlash,
  } = useContext(AppContext);
  const [helpClicked, setHelpClicked] = useState(false);
  const fieldClass =
    field.type_specifications.variable_width === '100%'
      ? 'full-width'
      : 'half-width'; // TODO fix prop undefined

  function handleOnClick(e) {
    e.preventDefault();

    if (openEditingSidebar) {
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
      }, 500);
    }

    setTypeAttributes(
      allTypeAttributes[field.type.replaceAll(' ', '_').toLowerCase()]
    );

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
      {field.type == 'checkbox' ? (
        <Draggable draggableId={field.id} index={index}>
          {(provided) => (
            <div
              className={`field-container display-flex ${fieldClass}`}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <input type="checkbox" />
              <p
                className={`p-label ${field.mandatory ? 'required' : ''}`}
                onClick={handleOnClick}
              >
                {field.question.question_text}
              </p>
            </div>
          )}
        </Draggable>
      ) : (
        <Draggable draggableId={field.id} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={`field-container ${fieldClass}`}
              onClick={handleOnClick}
            >
              <label
                className={`field-label ${field.mandatory ? 'required' : ''}`}
              >
                {field.question.question_text}
                {field.annotation.show_help && (
                  <div className="help-icon" onClick={handleHelpClick}>
                    ?
                  </div>
                )}
                {field.annotation.show_help &&
                (helpClicked || field.annotation.always_expanded) ? (
                  <p className="help-tag">{field.annotation.help_tag}</p>
                ) : (
                  ''
                )}
              </label>
              <Input field={field} />
            </div>
          )}
        </Draggable>
      )}
    </>
  );
}
