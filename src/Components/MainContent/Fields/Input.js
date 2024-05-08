export function Input({ field }) {
  switch (field.type) {
    case 'single_line_text':
      return <input type="text" className="full-width field-input" />;
    case 'multiple_choice':
      return (
        <>
          {field.question_choices.map((choice) => {
            return (
              <>
                <input
                  type="radio"
                  className="full-width field-input"
                  id={field.id + choice}
                  name={field.id + choice}
                  value={choice}
                />
                <label for={field.id + choice}>{choice}</label>
              </>
            );
          })}
        </>
      );
    case 'checkbox':
      return <input type="checkbox" className="full-width field-input" />;
    case 'date':
      return <input type="date" className="full-width field-input" />;
    case 'multi_line_text':
      return <textarea />;
    case 'select_box':
      return (
        <select className="full-width field-input">
          {Object.keys(field.question_choices).length > 0 ? (
            Object.keys(field.question_choices).map((key, i) => (
              <option key={`qc${i}`} value={field.question_choices[key].value}>
                {field.question_choices[key].value}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
      );
    case 'reference':
      return (
        <select className="full-width field-input">
          {['option 1', 'option 2', 'option 3'].map((choice) => {
            return <option value={choice}>{choice}</option>;
          })}
        </select>
      );
    case 'yes_no':
      return (
        <>
          <input
            type="radio"
            id={field.id + 'yes'}
            name={field.id + 'yes'}
            value={'Yes'}
          />
          <label for={field.id + 'yes'}>Yes</label>
          <input
            type="radio"
            id={field.id + 'no'}
            name={field.id + 'no'}
            value={'no'}
          />
          <label for={field.id + 'no'}>No</label>
        </>
      );
    case 'rich_text_label':
      return (
        <p className="full-width field-input">{field.question.rich_text}</p>
      );
    default:
      break;
  }
}
