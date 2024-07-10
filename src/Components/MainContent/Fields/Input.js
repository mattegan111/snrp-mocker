import { useContext } from 'react';
import { AppContext } from '../../../App';

export function Input({ field }) {
  const {inputValues, setInputValues} = useContext(AppContext);

  function handleOnChange(e, type, key) {
    switch (type) {
      case 'default':
        setInputValues({
          ...inputValues,
          [field.id]: e.target.value
        });
        break;
      case 'multiple_choice':
        setInputValues({
          ...inputValues,
          [field.id]: {
            [key]: e.target.checked
          }
        });
        break;
      case 'checkbox':
        setInputValues({
          ...inputValues,
          [field.id]: e.target.checked
        });
        break;
      default:
        break;
    }
  }

  switch (field.type) {
    case 'single_line_text':
      return <input type="text" name={field.id} className="full-width field-input" value={inputValues[field.id] || ''} onChange={(e) => handleOnChange(e, 'default')}/>;
    case 'multiple_choice':
      return (
        <div className="full-width field-input">
          {Object.keys(field.question_choices).length > 0 ? (
            Object.keys(field.question_choices).map((key, i) => (
              <>
                <input 
                  key={`qc${i}`} 
                  type="radio" 
                  name={field.id} 
                  value={field.question_choices[key]}
                  checked={inputValues[field.id]?.[key]} 
                  onChange={(e) => handleOnChange(e, 'multiple_choice', key)}
                />
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
      return <input type="checkbox" className="" checked={inputValues[field.id]} onChange={(e) => handleOnChange(e, 'checkbox')}/>;
    case 'date':
      return <input type="date" className="full-width field-input" value={inputValues[field.id] || ''} onChange={(e) => handleOnChange(e, 'default')}/>;
    case 'multi_line_text':
      return <textarea className="full-width field-input" name={field.id} value={inputValues[field.id] || ''} onChange={(e) => handleOnChange(e, 'default')}/>;
    case 'select_box':
    case 'reference':
      return (
        <select className="full-width field-input" value={inputValues[field.id] || ''} onChange={(e) => handleOnChange(e, 'default')}>
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
