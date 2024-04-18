import './App.css';
import {fields, groups} from './data';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <MainContent fields={fields} groups={groups}/>
        <Sidebar />
      </div>
    </div>
  );
}

function Header() {
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
      <div className='header-three'>
        <p>Home &nbsp;&nbsp;&nbsp;&nbsp;▶&nbsp;&nbsp;&nbsp;&nbsp; Category &nbsp;&nbsp;&nbsp;&nbsp;▶&nbsp;&nbsp;&nbsp;&nbsp; SubCategory &nbsp;&nbsp;&nbsp;&nbsp;▶&nbsp;&nbsp;&nbsp;&nbsp; This Form</p>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button>⌕</button>
        </div>
      </div>
    </>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <button className="submit-button">Submit</button>
    </div>
  );
}

function MainContent({fields, groups}) {
  return (
    <div className="main-content">
      <div className='main-content-header'>
        <h1>Form Name</h1>
        <p>Description of the form here...</p>
      </div>
      <div className='form-instructions'>
        <p>Instructions on how to fill out the form</p>
      </div>
      <div className='form-fields'>
        <p className='required'>Indicates required</p>
        <Groups fields={fields} groups={groups}/>
      </div>
    </div>
  );
}

function Groups({fields, groups}) {
  return (
    <div>
      {groups.map((group, i) => {
        const fieldsInGroup = fields.filter(field => group.fields.includes(Number(field.id)));
        return (
          <Fields fields={fieldsInGroup} groups={groups}/>
        )
      })}
    </div>
  )
}

function Fields({fields})  {
  return (
    <div>
      {fields.map((field) => {
        if(field.active === true){
          return <Field key={field.id} field={field}/>
        }
      })}
    </div>
  ); 
}

function Field({field}) {
  const fieldClass = field.type_specifications.variable_width === '100%' ? 'full-width' : 'half-width';


  // Handle for CheckBox as the template below doesn't suit the required layout for this type
  if(field.type == 'CheckBox'){
    return (
      <div className={`field-container ${fieldClass}`}>
        <input type='checkbox'/>
        <p className='p-label'>{field.question.name}</p>
      </div>

    );
  }

  return (
    <div className={`field-container ${fieldClass}`}>
      <label className='field-label'>
        {field.question.name}
        {field.annotation.show_help ? 
            <p className='help-tag'>{field.annotation.help_tag}</p> : null
        }
      </label>
      <Input field={field}/>
    </div>
  )
}

function Input({field}) {
  switch(field.type){
    case 'Single Line Text':
      return <input type='text' className='full-width field-input'/>;
    case 'Multiple Choice':
      return (
        <>
          {field.question_choices.map((choice) => {
            return (
              <>
                <input type="radio" className='full-width field-input' id={field.id + choice} name={field.id + choice} value={choice} />
                <label for={field.id + choice}>{choice}</label>
              </>
            )})
          }
        </>
      )
    case 'CheckBox':
      return <input type='checkbox' className='full-width field-input'/>;
    case 'Date':
      return <input type='date' className='full-width field-input'/>;
    case 'Multi Line Text':
      return <textarea/>;
    case 'Select Box':
      return (
        <select className='full-width field-input'>
          {field.question_choices.map((choice) => {
            return (
              <option value={choice}>{choice}</option>
            )})
          }
        </select>
      )
    case 'Reference':
      return (
        <select className='full-width field-input'>
          {['option 1', 'option 2', 'option 3'].map((choice) => { // Dummy values are used in leiu of a reference api call
            return (
              <option value={choice}>{choice}</option>
            )})
          }
        </select>
      ) 
    case 'Yes / No':
      return (
        <>
          <input type='radio' id={field.id + 'yes'} name={field.id + 'yes'} value={'Yes'} />
          <label for={field.id + 'yes'}>Yes</label>  
          <input type='radio' id={field.id + 'no'} name={field.id + 'no'} value={'no'} />
          <label for={field.id + 'no'}>No</label> 
        </>
      ) 
    case 'Rich Text Label':
      return <p className='full-width field-input'>{field.question.rich_text}</p>;
    default:
      break;
  }


}

export default App;
