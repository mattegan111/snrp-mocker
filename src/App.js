import Excel from 'exceljs';
import cloneDeep from 'lodash/cloneDeep';
import './App.css';
import { data as dataImport } from './data';
import {
  uniqueAttributes,
  allTypeAttributes,
  defaultAttributes,
  booleanTypeAttributes,
  allDefaultObjects,
} from './typeAttributes';
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  prepareFieldsForExcel,
  compareVersionObjects,
} from './Utils/xlsxProcessing';
import { convertSnakeToTitle } from './Utils/utils';
import { FormFields, MainContent } from './Components/MainContent/MainContent';

export const AppContext = createContext();

function App() {
  let latestVersionId = 1;
  let latestIterationId = 1;
  let allVersionsInit = [];

  Object.keys(dataImport.version).map((version) => {
    if (latestVersionId <= version) {
      latestVersionId = version;
    }
  });
  Object.keys(dataImport.version[latestVersionId].iteration).map(
    (iteration) => {
      if (latestIterationId <= iteration) {
        latestIterationId = iteration;
      }
    }
  );
  for (let v = 1; v <= latestVersionId; v++) {
    for (
      let i = 1;
      i <= Object.keys(dataImport.version[v].iteration).length;
      i++
    ) {
      allVersionsInit.push([`${v}`, `${i}`]);
    }
  }

  const [versionData, setVersionData] = useState(dataImport);
  const [currentVersion, setCurrentVersion] = useState([
    latestVersionId,
    latestIterationId,
  ]);
  const [isCurrentVersion, setIsCurrentVersion] = useState(true);
  const [allVersionsIterations, setAllVersionsIterations] =
    useState(allVersionsInit);

  const [data, setData] = useState(
    versionData.version[currentVersion[0]].iteration[currentVersion[1]]
  );

  const [history, setHistory] = useState([]);

  const [openEditingSidebar, setOpenEditingSidebar] = useState(false);
  const toggleEditingSidebar = () => {
    setOpenEditingSidebar(!openEditingSidebar);
  };
  const [editingField, setEditingField] = useState();
  const [editingPane, setEditingPane] = useState('');

  const [viewSelected, setViewSelected] = useState('portal');
  const [hideEditingTools, setHideEditingTools] = useState(false);
  const [typeAttributes, setTypeAttributes] = useState([]);
  const [flash, setFlash] = useState(false);

  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (
      JSON.stringify(currentVersion) ==
      JSON.stringify([...allVersionsIterations].reverse()[0])
    ) {
      setHideEditingTools(false);
      setIsCurrentVersion(true);
    } else {
      setHideEditingTools(true);
      setIsCurrentVersion(false);
    }
  }, [currentVersion]);

  useEffect(() => {
    setVersionData({
      version: {
        ...versionData.version,
        [currentVersion[0]]: {
          iteration: {
            ...versionData.version[currentVersion[0]].iteration,
            [currentVersion[1]]: {
              ...data,
            },
          },
        },
      },
    });
  }, [data]);

  useEffect(() => {
    const editingFieldClone = cloneDeep(editingField);
    if(history.length === 0){
      setHistory([editingFieldClone]);
    } else if(history.length > 0){
      setHistory([...history, editingFieldClone]);
    }
  }, [editingField])
  

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      setData(
        versionData.version[currentVersion[0]].iteration[currentVersion[1]]
      );
    } else {
      isMounted.current = true;
    }
  }, [currentVersion]);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        versionData,
        setVersionData,
        history,
        setHistory,
        currentVersion,
        setCurrentVersion,
        isCurrentVersion,
        setIsCurrentVersion,
        allVersionsIterations,
        setAllVersionsIterations,
        openEditingSidebar,
        setOpenEditingSidebar,
        typeAttributes,
        setTypeAttributes,
        toggleEditingSidebar,
        editingField,
        setEditingField,
        editingPane,
        setEditingPane,
        allTypeAttributes,
        uniqueAttributes,
        defaultAttributes,
        booleanTypeAttributes,
        allDefaultObjects,
        flash,
        setFlash,
        hideEditingTools,
        setHideEditingTools,
        setViewSelected,
        inputValues,
        setInputValues
      }}
    >
        <div className="App">
          <div className="main-container">
            <TopBar />
            {viewSelected == 'portal' ? 
              <>
                <Header />
                <div className="headerless-container">
                  <MainContent />
                  <SubmitPanel />
                  <EditingSidebar />
                </div>
              </>
            : viewSelected == 'case' ? 
              <>
                <CaseHeader />
                <div className='display-flex'>
                  <div className='purple-side-bar'></div>
                  <div className='case-view-main-container'>
                    <div className='display-flex grey-top-bar'>
                      <p className='side-padding-20'>Home</p>
                      <p className='side-padding-20'>CSXXXXXXX</p>
                    </div>
                    <div className='details-top-bar'>
                      <p>Details</p>
                    </div>
                    <div className='display-flex-column'>
                      <h1 className='side-padding-20'>Case Short Description</h1>
                      <div className='display-flex'>
                        <div className='display-flex-column'>
                          <p className='side-padding-20 margin-0'>Priority</p>
                          <p className='side-padding-20 margin-0'>4 - Low</p>
                        </div>
                        <div className='display-flex-column'>
                          <p className='side-padding-20 margin-0'>State</p>
                          <p className='side-padding-20 margin-0'>New</p>
                        </div>
                      </div>
                      <div className='case-tabs'>
                        <p>Details</p>
                        <p>SLAs</p>
                        <p>Tasks</p>
                        <p>Emails</p>
                        <p>Escalations</p>
                        <p>Similar Cases</p>
                        <p>Approvers</p>
                      </div>
                      <div className='details-body'>
                        <div className='case-fields'>
                          <h2 className='case-title side-padding-20'>Variables</h2>
                          <FormFields view={'case'}/>
                        </div>
                        <div className='activity-sidebar'>
                          <div className='compose'>
                            <h2>Compose</h2>
                          </div>
                          <div className='activity'>
                            <h2>Activity</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <EditingSidebar />
                  </div>
                </div>
              </>
            : null}
          </div>
        </div>

    </AppContext.Provider>
  );
}

function CaseHeader() {
  return(
    <div className='flex-spread case-view-header side-padding-20'>
      <div className='display-flex'>
        <p className='margin-15'>🌐</p>
        <p className='margin-15'>All</p>
        <p className='margin-15'>Favourites</p>
        <p className='margin-15'>History</p>
        <p className='margin-15'>Workspaces</p>
      </div>
      <div>
        <button>Workspace ☆</button>
      </div>
      <div className='display-flex'>
        <div className="search-bar-sml">
          <input type="text" placeholder="⌕ Search" />
        </div>
        <p className='margin-15'>⍰</p>
        <p className='margin-15'>🔔</p>
        <p className='margin-15'>👤</p>
      </div>
    </div>
  )
}

function TopBar() {
  const {
    setData,
    versionData,
    history,
    setEditingField,
    setVersionData,
    setCurrentVersion,
    isCurrentVersion,
    allVersionsIterations,
    setAllVersionsIterations,
    hideEditingTools,
    setHideEditingTools,
    setViewSelected
  } = useContext(AppContext);

  let latestVersionId = 1;
  let latestIterationId = 1;
  let allVersions = [];
  function getLatestVersionIdAndIterationId(jsonData) {
    Object.keys(jsonData.version).map((version) => {
      if (latestVersionId <= version) {
        latestVersionId = version;
      }
    });
    Object.keys(jsonData.version[latestVersionId].iteration).map(
      (iteration) => {
        if (latestIterationId <= iteration) {
          latestIterationId = iteration;
        }
      }
    );
    for (let v = 1; v <= latestVersionId; v++) {
      for (
        let i = 1;
        i <= Object.keys(jsonData.version[v].iteration).length;
        i++
      ) {
        allVersions.push([`${v}`, `${i}`]);
      }
    }
  }

  function importProject(e) {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          getLatestVersionIdAndIterationId(jsonData);
          setVersionData(jsonData);
          setAllVersionsIterations(allVersions);
          setCurrentVersion([latestVersionId, latestIterationId]);
          setData(
            jsonData.version[latestVersionId].iteration[latestIterationId]
          );
          console.log('File successfully imported', versionData);
        } catch (error) {
          console.error('Error parsing JSON', error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error('Please upload a valid JSON file.');
    }
  }

  function exportProject(versionData) {
    const jsonStr = JSON.stringify(versionData, null, 4);

    const blob = new Blob([jsonStr], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'project-file.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async function exportToExcel() {
    const selectedOldVersion = document
      .getElementById('selectVersion1')
      .value.split(',');
    const selectedNewVersion = document
      .getElementById('selectVersion2')
      .value.split(',');

    const oldVersion =
      versionData.version[selectedOldVersion[0]].iteration[
        selectedOldVersion[1]
      ];
    const newVersion =
      versionData.version[selectedNewVersion[0]].iteration[
        selectedNewVersion[1]
      ];

    const changes = compareVersionObjects(oldVersion, newVersion);
    const preparedData = prepareFieldsForExcel(newVersion.fields);

    // Create a new workbook and a worksheet
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Fields');

    // Populate the worksheet with prepared data
    preparedData.forEach((row, rowIndex) => {
      const excelRow = worksheet.addRow(row);
      if (rowIndex !== 0 && changes.has(row[0])) {
        // Apply styles if changes exist for this row
        excelRow.eachCell((cell) => {
          cell.font = { color: { argb: 'FFFF0000' } }; // Set font color to red
        });
      }
    });

    // Write to a buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer and trigger download
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function triggerFileInput() {
    document.getElementById('prj-file-input').click();
  }

  function undo() {
    setEditingField(history[history.length - 2]);
  }

  return (
    <div className="top-bar">
      <div className="inner-top-bar">
        <div className="top-bar-categories">
          <div className="top-bar-category">
            <h3>Project</h3>
            <div className="top-bar-buttons">
              <input
                id="prj-file-input"
                className="file-input"
                type="file"
                accept=".json, .JSON"
                onChange={importProject}
              />
              <button
                className="btn-a-small side-margin-5"
                onClick={() => triggerFileInput()}
              >
                Open
              </button>
              <button
                className="btn-a-small side-margin-5"
                onClick={() => exportProject(versionData)}
              >
                Save
              </button>
            </div>
          </div>
          <div className="vertical-split" />
          <div className="top-bar-category">
            <h3>View</h3>
            <div className="top-bar-buttons">
              <button className="btn-a-small side-margin-5">
                Key Requirements
              </button>
              <button className="btn-a-small side-margin-5" onClick={() => setViewSelected('portal')}>Portal</button>
              <button className="btn-a-small side-margin-5" onClick={() => setViewSelected('case')}>Case</button>
              <button className="btn-a-small side-margin-5">
                Deleted Data
              </button>
            </div>
          </div>
          <div className="vertical-split" />
          <div className="top-bar-category">
            <h3>Visibility</h3>
            <div className="top-bar-buttons">
              {isCurrentVersion && (
                <button
                  className="btn-a-small side-margin-5"
                  onClick={() => setHideEditingTools(!hideEditingTools)}
                >
                  {hideEditingTools
                    ? 'Show Editing Tools'
                    : 'Hide Editing Tools'}
                </button>
              )}
              {!isCurrentVersion && (
                <p className="small-text">
                  Only the latest version is editable
                </p>
              )}
            </div>
          </div>
          <div className="vertical-split" />
          <div className="top-bar-category">
            <h3>Layouts</h3>
            <div className="top-bar-buttons">
              <select className="side-margin-5">
                <option>Layout 1</option>
                <option>Layout 2</option>
              </select>
              <button className="btn-a-small side-margin-10">
                Save Layout
              </button>
            </div>
          </div>
          <div className="vertical-split" />
          <div className="top-bar-category">
            <h3>History</h3>
            <div className="top-bar-buttons">
              <button 
                className="btn-a-small side-margin-10"
                onClick={undo}
              >
                Undo
              </button>
            </div>
          </div>
          <div className="vertical-split" />
          <div className="top-bar-category">
            <h3>Versioning</h3>
            <div className="top-bar-buttons">
              <select
                className="side-margin-5"
                onChange={(e) => {
                  let newVersionArr = e.target.value.split(',');
                  setCurrentVersion(newVersionArr);
                  setData(
                    versionData.version[newVersionArr[0]].iteration[
                      newVersionArr[1]
                    ]
                  );
                }}
              >
                {[...allVersionsIterations]
                  .reverse()
                  .map((versionIteration) => (
                    <option
                      selected={
                        [latestVersionId, latestIterationId] == versionIteration
                      }
                      value={versionIteration}
                    >
                      {versionIteration[0]}.{versionIteration[1]}
                    </option>
                  ))}
              </select>
              <button className="btn-a-small side-margin-5">New Version</button>
              <button className="btn-a-small side-margin-5">
                New Iteration
              </button>
              <button className="btn-a-small side-margin-5">Delete...</button>
            </div>
          </div>
          <div className="vertical-split" />
          <div className="top-bar-category">
            <h3>Export .xlsx Diff</h3>
            <div className="top-bar-buttons">
              <select id="selectVersion1" className="side-margin-5">
                {[...allVersionsIterations]
                  .reverse()
                  .map((versionIteration) => (
                    <option
                      selected={
                        [latestVersionId, latestIterationId] == versionIteration
                      }
                      value={versionIteration}
                    >
                      {versionIteration[0]}.{versionIteration[1]}
                    </option>
                  ))}
              </select>
              <select id="selectVersion2" className="side-margin-5">
                {[...allVersionsIterations]
                  .reverse()
                  .map((versionIteration) => (
                    <option
                      selected={
                        [latestVersionId, latestIterationId] == versionIteration
                      }
                      value={versionIteration}
                    >
                      {versionIteration[0]}.{versionIteration[1]}
                    </option>
                  ))}
              </select>
              <button
                onClick={exportToExcel}
                className="btn-a-small side-margin-5"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
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
    <>
      <div className="header">
        <div className="logo">Logo</div>
        <div className="header-right">
          <p>My Lists</p>
          <p>Tours</p>
          <p>● UserName</p>
        </div>
      </div>
      <div className="header-two">
        <p>Tech Support Portal</p>
        <p className="selected-tab">Customer Service Gateway</p>
      </div>
      <div className="header-three" onClick={handleOnClick}>
        <p className="header-category">Home &nbsp;&nbsp;&nbsp;&nbsp;▶</p>
        {data.form.categories.split(',').map((category) => (
          <p className="header-category">
            {category} &nbsp;&nbsp;&nbsp;&nbsp;▶
          </p>
        ))}
        <p className="header-category">{data.form.title}</p>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button>⌕</button>
        </div>
      </div>
    </>
  );
}

function SubmitPanel() {
  return (
    <div className="submit-panel">
      <button className="submit-button">Submit</button>
    </div>
  );
}

function EditingSidebar() {
  const { editingPane } = useContext(AppContext);

  return (
    <>
      {editingPane === 'field' ? (
        <EditingSidebarForFields />
      ) : editingPane === 'form' ? (
        <EditingSidebarForFormDetails />
      ) : editingPane === 'group' ? (
        <EditingSidebarForGroups />
      ) : null}
    </>
  );
}

function EditingSidebarForFormDetails() {
  const { data, openEditingSidebar, setOpenEditingSidebar, hideEditingTools } =
    useContext(AppContext);

  return (
    <div
      className={
        openEditingSidebar && !hideEditingTools
          ? 'editing-sidebar open-large'
          : 'editing-sidebar'
      }
    >
      <div className={'white-inner-box'}>
        <div className="editing-fields-div">
          {Object.keys(data.form).map((objKey) => (
            <FormDetailsField objKey={objKey} />
          ))}
          <button
            className="btn-a"
            onClick={() => setOpenEditingSidebar(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function FormDetailsField({ objKey }) {
  const { data, setData } = useContext(AppContext);

  function onChange(e, objKey) {
    setData({
      ...data,
      form: {
        ...data.form,
        [objKey]: e.target.value,
      },
    });
  }

  return (
    <div className="display-flex-column">
      <label className="editing-label">{convertSnakeToTitle(objKey)}</label>
      <input
        className="editing-field-input"
        value={data.form[objKey]}
        onChange={(e) => onChange(e, objKey)}
      />
    </div>
  );
}

function EditingSidebarForGroups() {
  const {
    data,
    setData,
    editingField,
    openEditingSidebar,
    setOpenEditingSidebar,
    hideEditingTools,
    flash,
  } = useContext(AppContext);

  function handleTitleChange(e) {
    setData({
      ...data,
      groups: {
        ...data.groups,
        [data.groups[editingField.id].id]: {
          ...data.groups[editingField.id],
          title: e.target.value,
        },
      },
    });
  }

  return (
    <div
      className={
        openEditingSidebar && !hideEditingTools
          ? 'editing-sidebar open'
          : 'editing-sidebar'
      }
    >
      <div className={`white-inner-box ${flash ? 'flash-animation' : ''}`}>
        <div className="editing-fields-div">
          <p>{editingField.id}</p>
          <div className="display-flex-column">
            <label className="editing-label">Title</label>
            <input
              className="editing-field-input"
              value={data.groups[editingField.id].title}
              onChange={(e) => handleTitleChange(e)}
            />
          </div>
          <div className="display-flex-column">
            <label className="editing-label">Column Count</label>
            <select>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <button
            className="btn-a"
            onClick={() => setOpenEditingSidebar(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function EditingSidebarForFields() {
  const {
    data,
    setData,
    typeAttributes,
    editingField,
    setEditingField,
    openEditingSidebar,
    hideEditingTools,
    toggleEditingSidebar,
    allDefaultObjects,
    flash,
  } = useContext(AppContext);

  function onChange(e, key) {
    function setNestedObjectValues(targetObj, path, value) {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const lastObj = keys.reduce((acc, key) => {
        if (!acc[key] || typeof acc[key] !== 'object') {
          acc[key] = {};
        }
        return acc[key];
      }, targetObj);
      lastObj[lastKey] = value;
      return { ...targetObj };
    }
    const newEditingField = setNestedObjectValues(
      editingField,
      key,
      e.target.value
    );
    setEditingField(newEditingField);

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...newEditingField,
        },
      },
    });
  }

  function onChangeMandatory(e) {
    const newEditingField = { ...editingField };
    newEditingField.mandatory = e.target.checked;
    setEditingField(newEditingField);

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...newEditingField,
        },
      },
    });
  }

  function onChangeShowHelp(e) {
    const newEditingField = {
      ...editingField,
      annotation: {
        ...editingField.annotation,
        show_help: e.target.checked,
      },
    };
    setEditingField({ ...newEditingField });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [newEditingField.id]: {
          ...newEditingField,
        },
      },
    });
  }

  function onChangeAlwaysExpanded(e) {
    const newEditingField = {
      ...editingField,
      annotation: {
        ...editingField.annotation,
        always_expanded: e.target.checked,
      },
    };
    setEditingField({ ...newEditingField });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [newEditingField.id]: {
          ...newEditingField,
        },
      },
    });
  }

  function onChangeActive(e) {
    const newEditingField = { ...editingField, active: e.target.checked };
    setEditingField({ ...newEditingField });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [newEditingField.id]: {
          ...newEditingField,
        },
      },
    });
  }

  function onStyleChange(e) {
    const newStyle = e.target.value;

    setEditingField({
      ...editingField,
      style: newStyle
    });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...editingField,
          style: newStyle
        },
      },
    });
  }

  function onTypeChange(e, key) {
    const userResp = prompt(
      "This operation may destroy field data, such as options or help tags, and is not generally recommended. Type 'yes' below to continue anyway, or click cancel to abort."
    );
    if (userResp === null) return;
    if (userResp === 'yes') {
      const newTypedField = cloneDeep(allDefaultObjects[e.target.value]);
      newTypedField.id = editingField.id;

      setEditingField(newTypedField);

      setData({
        ...data,
        fields: {
          ...data.fields,
          [editingField.id]: {
            ...newTypedField,
          },
        },
      });
    }
  }

  function onChoiceDirectionChange(e) {
    const newChoiceDirection = e.target.value;

    setEditingField({
      ...editingField,
      choice_direction: newChoiceDirection
    });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...editingField,
          choice_direction: newChoiceDirection
        },
      },
    });
  }

  function handleEditOptions(key, id, e) {
    const newQuestionChoices = {
      ...editingField.question_choices,
      [key]: {
        id: id,
        value: e.target.value,
      },
    };

    setEditingField({
      ...editingField,
      question_choices: newQuestionChoices,
    });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...editingField,
          question_choices: newQuestionChoices,
        },
      },
    });
  }

  function handleOptionDelete(key, e) {
    const newQuestionChoices = { ...editingField.question_choices };
    delete newQuestionChoices[key];

    setEditingField({
      ...editingField,
      question_choices: newQuestionChoices,
    });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...editingField,
          question_choices: newQuestionChoices,
        },
      },
    });
  }

  function handleOptionAdd() {
    // Create a unique placeholder option id
    let newIdNum = 1;
    while(Object.keys(editingField.question_choices).includes(`option-${newIdNum}`)){
      newIdNum++;
    }
    let id = `option-${newIdNum}`;

    // Handle adding the new option

    const newQuestionChoices = { 
      ...editingField.question_choices,  
      [id]: { id: '', value: id } // The id of the new question option is set to value when a new version/iteration is saved
    };

    setEditingField({
      ...editingField,
      question_choices: newQuestionChoices,
    });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [editingField.id]: {
          ...editingField,
          question_choices: newQuestionChoices,
        },
      },
    });
  }

  return (
    <div
      className={
        openEditingSidebar && !hideEditingTools
          ? 'editing-sidebar open'
          : 'editing-sidebar'
      }
    >
      <div className={`white-inner-box ${flash ? 'flash-animation' : ''}`}>
        {editingField && (
          <div className="editing-fields-div">
            <div className="display-flex-column">
              <label className="editing-label">Name (system-only)</label>
              <input
                className="read-only-style editing-field-input"
                value={editingField.question.name}
                readOnly={true}
              />
            </div>
            <div className="display-flex-column">
              <label className="editing-label">Question text</label>
              <input
                className="editing-field-input"
                value={editingField.question.question_text}
                onChange={(e) => onChange(e, 'question.question_text')}
              />
            </div>
            {typeAttributes.includes('question.rich_text') && (
              <div className="display-flex-column">
                <label className="editing-label">Rich text</label>
                <textarea
                  className="editing-field-input"
                  value={editingField.question.rich_text}
                  onChange={(e) => onChange(e, 'question.rich_text')}
                />
              </div>
            )}    
            {typeAttributes.includes('style') && (
              <div className="display-flex-column">
                <label className="editing-label">Style</label>
                <select
                  className="editing-field-input"
                  value={editingField.style}
                  onChange={(e) => onStyleChange(e)}
                >
                  <option key={`style-option-none  ${editingField.id}`} value=''>None</option>                    
                  <option key={`style-option-red ${editingField.id}`} value='Red'>Red</option>                    
                  <option key={`style-option-red-bold ${editingField.id}`} value='Red Bold'>Red Bold</option>
                  <option key={`style-option-green ${editingField.id}`} value='Green'>Green</option>                    
                  <option key={`style-option-green-bold ${editingField.id}`} value='Green Bold'>Green Bold</option>                    
                </select>
              </div>
            )}        
            {typeAttributes.includes('mandatory') && (
              <div className="display-flex">
                <input
                  className="editing-field-input"
                  checked={editingField.mandatory}
                  type="checkbox"
                  onChange={(e) => onChangeMandatory(e)}
                />
                <label className="editing-label">Mandatory</label>
              </div>
            )}
            {typeAttributes.includes('annotation.show_help') && (
              <div className="display-flex">
                <input
                  className="editing-field-input"
                  checked={editingField.annotation.show_help}
                  type="checkbox"
                  onChange={(e) => onChangeShowHelp(e)}
                />
                <label className="editing-label">Show help</label>
              </div>
            )}
            {typeAttributes.includes('annotation.always_expanded') &&
              editingField.annotation.show_help && (
                <div className="display-flex">
                  <input
                    className="editing-field-input"
                    checked={editingField.annotation.always_expanded}
                    type="checkbox"
                    onChange={(e) => onChangeAlwaysExpanded(e)}
                  />
                  <label className="editing-label">Always expanded</label>
                </div>
              )}
            {typeAttributes.includes('annotation.help_tag') &&
              editingField.annotation.show_help && (
                <div className="display-flex-column">
                  <label className="editing-label">Help tag</label>
                  <input
                    className="editing-field-input"
                    value={editingField.annotation.help_tag}
                    onChange={(e) => onChange(e, 'annotation.help_tag')}
                  />
                </div>
              )}
            {typeAttributes.includes('question_choices') && (
              <div className="display-flex-column">
                <label className="editing-label">Question choices</label>
                <div className="options-container">
                  {Object.keys(editingField.question_choices).map(
                    (key, index) => (
                      <div className="option-container">
                        <div key={`${editingField.id} qc ${index}`}>
                          <label className="display-block">
                            id: {editingField.question_choices[key].id}
                          </label>
                          <input
                            className="editing-field-input"
                            type="text"
                            value={editingField.question_choices[key].value}
                            onChange={(e) =>
                              handleEditOptions(
                                key,
                                editingField.question_choices[key].id,
                                e
                              )
                            }
                          />
                          <button
                            className="btn-a-small"
                            onClick={() =>
                              handleOptionDelete(key)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <button
                  className="btn-a-small"
                  onClick={() =>
                    handleOptionAdd()
                  }
                >
                  Add
                </button>
              </div>
            )}
            {typeAttributes.includes('choice_direction') && (
              <div className="display-flex-column">
                <label className="editing-label">Choice Direction</label>
                <select
                  className="editing-field-input"
                  value={editingField.choice_direction}
                  onChange={(e) => onChoiceDirectionChange(e)}
                >
                  <option key={`${editingField.id} down`} value={'down'}>
                    Down
                  </option>
                  <option key={`${editingField.id} across`} value={'across'}>
                    Across
                  </option>
                </select>
              </div>
            )}
            {typeAttributes.includes('annotation.comments_for_developers') && (
              <div className="display-flex-column">
                <label className="editing-label">Comments for developers</label>
                <input
                  value={editingField.comments_for_developers}
                  onChange={(e) =>
                    onChange(e, 'annotation.comments_for_developers')
                  }
                />
              </div>
            )}
            {typeAttributes.includes('annotation.impacts_reporting') && (
              <div className="display-flex-column">
                <label className="editing-label">Impacts reporting</label>
                <input
                  value={editingField.impacts_reporting}
                  onChange={(e) => onChange(e, 'annotation.impacts_reporting')}
                />
              </div>
            )}
            {typeAttributes.includes('annotation.fields_to_include') && (
              <div className="display-flex-column">
                <label className="editing-label">
                  Fields to include: (by Name)
                </label>
                <input
                  value={editingField.fields_to_include}
                  onChange={(e) => onChange(e, 'annotation.fields_to_include')}
                />
              </div>
            )}
            {typeAttributes.includes('type') && (
              <div className="display-flex-column">
                <label className="editing-label">Type</label>
                <select
                  className="editing-field-input"
                  value={editingField.type}
                  onChange={(e) => onTypeChange(e)}
                >
                  {Object.keys(allTypeAttributes).map((type, index) => (
                    <option key={`type-option-${index}`} value={type}>
                      {convertSnakeToTitle(type)}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {typeAttributes.includes('active') && (
              <div className="display-flex">
                <input
                  className="editing-field-input"
                  checked={editingField.active}
                  type="checkbox"
                  onChange={(e) => onChangeActive(e)}
                />
                <label className="editing-label">Active</label>
              </div>
            )}
            <button className="btn-a" onClick={toggleEditingSidebar}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
