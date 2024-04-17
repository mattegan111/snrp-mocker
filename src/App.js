import './App.css';
import fields from './data';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <MainContent fields={fields}/>
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

function MainContent({fields}) {
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
        <h3>Request Detail</h3>
        <Fields fields={fields}/>
      </div>
    </div>
  );
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
  return (
    <p width={field.type_specifications.variable_width}>{field.question.name}</p>
  )
}

export default App;
