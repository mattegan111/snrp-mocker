import { useContext } from 'react';
import { AppContext } from '../../../App';

export function Input({ field }) {
  const {inputValues, setInputValues} = useContext(AppContext);

  function handleOnChange(e) {
    setInputValues({
      ...inputValues,
      [field.id]: [e.target.value]
    });
  }

  switch (field.type) {
    case 'single_line_text':
      return <input type="text" name={field.id} className="full-width field-input" value={inputValues[field.id] || ''} onChange={handleOnChange}/>;
    case 'multiple_choice':
      return (
        <div className="full-width field-input">
          {Object.keys(field.question_choices).length > 0 ? (
            Object.keys(field.question_choices).map((key, i) => (
              <>
                <input key={`qc${i}`} type="radio" name={field.id} value={field.question_choices[key].value} />
                <label>{field.question_choices[key].value}</label>
                {field.choice_direction === 'down' ? (<br/>) : (<></>)}
              </>
            ))
          ) : (
            <></>
          )}
        </div>
      );
    case 'checkbox':
      return <input type="checkbox" className="full-width field-input" />;
    case 'date':
      return <input type="date" className="full-width field-input" />;
    case 'multi_line_text':
      return <textarea className="full-width field-input" name={field.id} value={inputValues[field.id] || ''} onChange={handleOnChange}/>;
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
    default:
      break;
  }
}
