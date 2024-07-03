import { Field } from './Field';

export function FieldList({ fields, provided }) {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      {fields.map((field, index) => {
        return <Field key={field.id} field={field} index={index} />;
      })}
      {provided.placeholder}
    </div>
  );
}
