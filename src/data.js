export const data = {
  version: {
    1: {
      iteration: {
        1: {
          form: {
            title: 'Example Form',
            description: 'Description of the form here...',
            instructions: 'Instructions on how to fill out the form',
            categories: 'Category, Subcategory',
            purpose: 'Form Purpose',
            related_help_articles: 'related_help_articles',
            meta_tags: 'meta_tags',
            default_case_priority: '', //TODO check that this is determined at a record producer levdefault_case_priorityel
            short_description: 'short_description',
            portal_or_ingestion_channel: 'portal_or_ingestion_channel',
            portal_visibility: 'form_visibility',
            case_visibility: 'case_visibility',
            submitter_of_the_form: 'submitter_of_the_form',
            fulfiller_of_the_case: 'fulfiller_of_the_case',
            name_of_key_stakeholder: 'name_of_key_stakeholder',
            other_users: 'other_users',
          },
          fields: {
            'field-1': {
              id: 'field-1',
              map_to_field: false,
              field_to_map_to: '',
              type: 'single_line_text',
              mandatory: false,
              active: true,

              question: {
                question_text: 'First Name1',
                name: 'first_name',
                rich_text: '',
              },

              question_choices: {},

              annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: '',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
            'field-5': {
              id: 'field-5',
              map_to_field: false,
              field_to_map_to: '',
              type: 'single_line_text',
              mandatory: false,
              active: true,

              question: {
                question_text: 'Last Name',
                name: 'last_name',
                rich_text: '',
              },

              question_choices: {},

              annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: '',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
            'field-6': {
              id: 'field-6',
              map_to_field: false,
              field_to_map_to: '',
              type: 'single_line_text',
              mandatory: true,
              active: true,

              question: {
                question_text: 'Account Name',
                name: 'account_name',
                rich_text: '',
              },

              question_choices: {},

              annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: '',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
            'field-2': {
              id: 'field-2',
              map_to_field: false,
              field_to_map_to: '',
              type: 'select_box',
              mandatory: false,
              active: true,

              question: {
                question_text: 'Select Account',
                name: 'select_account',
                rich_text: 'rich text',
              },

              question_choices: {
                Cheque: { id: 'Cheque', value: 'Cheque' },
                Savings: { id: 'Savings', value: 'Savings' },
                Credit: { id: 'Credit', value: 'Credit' },
              },

              annotation: {
                show_help: true,
                always_expanded: true,
                help_tag: 'This is a help_tag annotation',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
            'field-3': {
              id: 'field-3',
              map_to_field: false,
              field_to_map_to: '',
              type: 'checkbox',
              mandatory: true,
              active: true,

              question: {
                question_text: 'I would like to tick a box',
                name: 'i_would_like_to_click_a_box',
                rich_text: '',
              },

              question_choices: {},

              annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: '',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
          },
          groups: {
            'group-1': {
              id: 'group-1',
              title: 'Request detail',
              column_count: 2,
              fieldIds: ['field-1', 'field-5', 'field-6'],
            },
            'group-2': {
              id: 'group-2',
              title: '',
              column_count: 1,
              fieldIds: ['field-2', 'field-3'],
            },
          },
          groupsOrder: ['group-1', 'group-2'],
        },
      },
    },
    2: {
      iteration: {
        1: {
          form: {
            title: 'Example Form',
            description: 'Description of the form here...',
            instructions: 'Instructions on how to fill out the form',
            categories: 'Category, Subcategory',
            purpose: 'Form Purpose',
            related_help_articles: 'related_help_articles',
            meta_tags: 'meta_tags',
            default_case_priority: '', //TODO check that this is determined at a record producer levdefault_case_priorityel
            short_description: 'short_description',
            portal_or_ingestion_channel: 'portal_or_ingestion_channel',
            portal_visibility: 'form_visibility',
            case_visibility: 'case_visibility',
            submitter_of_the_form: 'submitter_of_the_form',
            fulfiller_of_the_case: 'fulfiller_of_the_case',
            name_of_key_stakeholder: 'name_of_key_stakeholder',
            other_users: 'other_users',
          },
          fields: {
            'field-1': {
              id: 'field-1',
              map_to_field: false,
              field_to_map_to: '',
              type: 'single_line_text',
              mandatory: false,
              active: true,

              question: {
                question_text: 'First Name',
                name: 'first_name',
                rich_text: '',
              },

              question_choices: {},

              annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: '',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
            'field-5': {
              id: 'field-5',
              map_to_field: false,
              field_to_map_to: '',
              type: 'single_line_text',
              mandatory: false,
              active: true,

              question: {
                question_text: 'Last Name',
                name: 'last_name',
                rich_text: '',
              },

              question_choices: {},

              annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: '',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
            'field-6': {
              id: 'field-6',
              map_to_field: false,
              field_to_map_to: '',
              type: 'single_line_text',
              mandatory: true,
              active: true,

              question: {
                question_text: 'Account Name',
                name: 'account_name',
                rich_text: '',
              },

              question_choices: {},

              annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: '',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
            'field-2': {
              id: 'field-2',
              map_to_field: false,
              field_to_map_to: '',
              type: 'select_box',
              mandatory: false,
              active: true,

              question: {
                question_text: 'Select Account',
                name: 'select_account',
                rich_text: 'rich text',
              },

              question_choices: {
                Cheque: { id: 'Cheque', value: 'Cheque' },
                Savings: { id: 'Savings', value: 'Savings' },
                Credit: { id: 'Credit', value: 'Credit' },
              },

              annotation: {
                show_help: true,
                always_expanded: true,
                help_tag: 'This is a help_tag annotation',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
            'field-3': {
              id: 'field-3',
              map_to_field: false,
              field_to_map_to: '',
              type: 'checkbox',
              mandatory: true,
              active: true,

              question: {
                question_text: 'I would like to tick a box',
                name: 'i_would_like_to_click_a_box',
                rich_text: '',
              },

              question_choices: {},

              annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: '',
              },

              type_specifications: {
                variable_width: '100%',
              },

              comments_for_developers: '',

              impacts_reporting: false,
            },
          },
          groups: {
            'group-1': {
              id: 'group-1',
              title: 'Request detail',
              column_count: 2,
              fieldIds: ['field-1', 'field-5', 'field-6'],
            },
            'group-2': {
              id: 'group-2',
              title: '',
              column_count: 1,
              fieldIds: ['field-2', 'field-3'],
            },
          },
          groupsOrder: ['group-1', 'group-2'],
        },
      },
    },
  },
};

// export const data = {
//     version: {
//         '1':{
//             iteration:{
//                 '1':{
//                         form: {
//                             title: 'Example Form',
//                             description: 'Description of the form here...',
//                             instructions: 'Instructions on how to fill out the form',
//                             categories: 'Category, Subcategory',
//                             purpose: 'Form Purpose',
//                             related_help_articles: 'related_help_articles',
//                             meta_tags: 'meta_tags',
//                             default_case_priority: '', //TODO check that this is determined at a record producer levdefault_case_priorityel
//                             short_description: 'short_description',
//                             portal_or_ingestion_channel: 'portal_or_ingestion_channel',
//                             portal_visibility: 'form_visibility',
//                             case_visibility: 'case_visibility',
//                             submitter_of_the_form: 'submitter_of_the_form',
//                             fulfiller_of_the_case: 'fulfiller_of_the_case',
//                             name_of_key_stakeholder: 'name_of_key_stakeholder',
//                             other_users: 'other_users'
//                         },
//                         fields: {
//                             'field-1': {
//                                 id: 'field-1',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'single_line_text',
//                                 mandatory: false,
//                                 active: true,

//                                 question: {
//                                     question_text: 'First Name1',
//                                     name: 'first_name',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-5': {
//                                 id: 'field-5',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'single_line_text',
//                                 mandatory: false,
//                                 active: true,

//                                 question: {
//                                     question_text: 'Last Name',
//                                     name: 'last_name',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-6': {
//                                 id: 'field-6',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'single_line_text',
//                                 mandatory: true,
//                                 active: true,

//                                 question: {
//                                     question_text: 'Account Name',
//                                     name: 'account_name',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-2': {
//                                 id: 'field-2',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'select_box',
//                                 mandatory: false,
//                                 active: true,

//                                 question: {
//                                     question_text: 'Select Account',
//                                     name: 'select_account',
//                                     rich_text: 'rich text'
//                                 },

//                                 question_choices: {
//                                     'Cheque': {id: 'Cheque', value: 'Cheque'},
//                                     'Savings': {id: 'Savings', value: 'Savings'},
//                                     'Credit': {id: 'Credit', value: 'Credit'}
//                                 },

//                                 annotation: {
//                                     show_help: true,
//                                     always_expanded: true,
//                                     help_tag: 'This is a help_tag annotation'
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-3': {
//                                 id: 'field-3',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'checkbox',
//                                 mandatory: true,
//                                 active: true,

//                                 question: {
//                                     question_text: 'I would like to tick a box',
//                                     name: 'i_would_like_to_click_a_box',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                         },
//                         groups: {
//                             'group-1': {
//                                 id: 'group-1',
//                                 title: 'Request detail',
//                                 column_count: 2,
//                                 fieldIds: ['field-1', 'field-5', 'field-6']
//                             },
//                             'group-2': {
//                                 id: 'group-2',
//                                 title: '',
//                                 column_count: 1,
//                                 fieldIds: ['field-2', 'field-3']
//                             }
//                         },
//                         groupsOrder: ['group-1', 'group-2']

//                 }
//             }
//         },
//         '2':{
//             iteration:{
//                 '1':{
//                         form: {
//                             title: 'Example Form',
//                             description: 'Description of the form here...',
//                             instructions: 'Instructions on how to fill out the form',
//                             categories: 'Category, Subcategory',
//                             purpose: 'Form Purpose',
//                             related_help_articles: 'related_help_articles',
//                             meta_tags: 'meta_tags',
//                             default_case_priority: '', //TODO check that this is determined at a record producer levdefault_case_priorityel
//                             short_description: 'short_description',
//                             portal_or_ingestion_channel: 'portal_or_ingestion_channel',
//                             portal_visibility: 'form_visibility',
//                             case_visibility: 'case_visibility',
//                             submitter_of_the_form: 'submitter_of_the_form',
//                             fulfiller_of_the_case: 'fulfiller_of_the_case',
//                             name_of_key_stakeholder: 'name_of_key_stakeholder',
//                             other_users: 'other_users'
//                         },
//                         fields: {
//                             'field-1': {
//                                 id: 'field-1',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'single_line_text',
//                                 mandatory: false,
//                                 active: true,

//                                 question: {
//                                     question_text: 'First Name2',
//                                     name: 'first_name',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-5': {
//                                 id: 'field-5',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'single_line_text',
//                                 mandatory: false,
//                                 active: true,

//                                 question: {
//                                     question_text: 'Last Name',
//                                     name: 'last_name',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-6': {
//                                 id: 'field-6',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'single_line_text',
//                                 mandatory: true,
//                                 active: true,

//                                 question: {
//                                     question_text: 'Account Name',
//                                     name: 'account_name',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-2': {
//                                 id: 'field-2',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'select_box',
//                                 mandatory: false,
//                                 active: true,

//                                 question: {
//                                     question_text: 'Select Account',
//                                     name: 'select_account',
//                                     rich_text: 'rich text'
//                                 },

//                                 question_choices: {
//                                     'Cheque': {id: 'Cheque', value: 'Cheque'},
//                                     'Savings': {id: 'Savings', value: 'Savings'},
//                                     'Credit': {id: 'Credit', value: 'Credit'}
//                                 },

//                                 annotation: {
//                                     show_help: true,
//                                     always_expanded: true,
//                                     help_tag: 'This is a help_tag annotation'
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-3': {
//                                 id: 'field-3',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'checkbox',
//                                 mandatory: true,
//                                 active: true,

//                                 question: {
//                                     question_text: 'I would like to tick a box',
//                                     name: 'i_would_like_to_click_a_box',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                         },
//                         groups: {
//                             'group-1': {
//                                 id: 'group-1',
//                                 title: 'Request detail',
//                                 column_count: 2,
//                                 fieldIds: ['field-1', 'field-5', 'field-6']
//                             },
//                             'group-2': {
//                                 id: 'group-2',
//                                 title: '',
//                                 column_count: 1,
//                                 fieldIds: ['field-2', 'field-3']
//                             }
//                         },
//                         groupsOrder: ['group-1', 'group-2']

//                 }
//             }
//         },
//         '3':{
//             iteration:{
//                 '1':{
//                         form: {
//                             title: 'Example Form',
//                             description: 'Description of the form here...',
//                             instructions: 'Instructions on how to fill out the form',
//                             categories: 'Category, Subcategory',
//                             purpose: 'Form Purpose',
//                             related_help_articles: 'related_help_articles',
//                             meta_tags: 'meta_tags',
//                             default_case_priority: '', //TODO check that this is determined at a record producer levdefault_case_priorityel
//                             short_description: 'short_description',
//                             portal_or_ingestion_channel: 'portal_or_ingestion_channel',
//                             portal_visibility: 'form_visibility',
//                             case_visibility: 'case_visibility',
//                             submitter_of_the_form: 'submitter_of_the_form',
//                             fulfiller_of_the_case: 'fulfiller_of_the_case',
//                             name_of_key_stakeholder: 'name_of_key_stakeholder',
//                             other_users: 'other_users'
//                         },
//                         fields: {
//                             'field-1': {
//                                 id: 'field-1',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'single_line_text',
//                                 mandatory: false,
//                                 active: true,

//                                 question: {
//                                     question_text: 'First Name 3.1',
//                                     name: 'first_name',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-5': {
//                                 id: 'field-5',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'single_line_text',
//                                 mandatory: false,
//                                 active: true,

//                                 question: {
//                                     question_text: 'Last Name',
//                                     name: 'last_name',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-6': {
//                                 id: 'field-6',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'single_line_text',
//                                 mandatory: true,
//                                 active: true,

//                                 question: {
//                                     question_text: 'Account Name',
//                                     name: 'account_name',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-2': {
//                                 id: 'field-2',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'select_box',
//                                 mandatory: false,
//                                 active: true,

//                                 question: {
//                                     question_text: 'Select Account',
//                                     name: 'select_account',
//                                     rich_text: 'rich text'
//                                 },

//                                 question_choices: {
//                                     'Cheque': {id: 'Cheque', value: 'Cheque'},
//                                     'Savings': {id: 'Savings', value: 'Savings'},
//                                     'Credit': {id: 'Credit', value: 'Credit'}
//                                 },

//                                 annotation: {
//                                     show_help: true,
//                                     always_expanded: true,
//                                     help_tag: 'This is a help_tag annotation'
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                             'field-3': {
//                                 id: 'field-3',
//                                 map_to_field: false,
//                                 field_to_map_to: '',
//                                 type: 'checkbox',
//                                 mandatory: true,
//                                 active: true,

//                                 question: {
//                                     question_text: 'I would like to tick a box',
//                                     name: 'i_would_like_to_click_a_box',
//                                     rich_text: ''
//                                 },

//                                 question_choices: {},

//                                 annotation: {
//                                     show_help: false,
//                                     always_expanded: false,
//                                     help_tag: ''
//                                 },

//                                 type_specifications: {
//                                     variable_width: '100%'
//                                 },

//                                 comments_for_developers: '',

//                                 impacts_reporting: false
//                             },
//                         },
//                         groups: {
//                             'group-1': {
//                                 id: 'group-1',
//                                 title: 'Request detail',
//                                 column_count: 2,
//                                 fieldIds: ['field-1', 'field-5', 'field-6']
//                             },
//                             'group-2': {
//                                 id: 'group-2',
//                                 title: '',
//                                 column_count: 1,
//                                 fieldIds: ['field-2', 'field-3']
//                             }
//                         },
//                         groupsOrder: ['group-1', 'group-2']

//                 },
//                 '2':{
//                     form: {
//                         title: 'Example Form',
//                         description: 'Description of the form here...',
//                         instructions: 'Instructions on how to fill out the form',
//                         categories: 'Category, Subcategory',
//                         purpose: 'Form Purpose',
//                         related_help_articles: 'related_help_articles',
//                         meta_tags: 'meta_tags',
//                         default_case_priority: '', //TODO check that this is determined at a record producer levdefault_case_priorityel
//                         short_description: 'short_description',
//                         portal_or_ingestion_channel: 'portal_or_ingestion_channel',
//                         portal_visibility: 'form_visibility',
//                         case_visibility: 'case_visibility',
//                         submitter_of_the_form: 'submitter_of_the_form',
//                         fulfiller_of_the_case: 'fulfiller_of_the_case',
//                         name_of_key_stakeholder: 'name_of_key_stakeholder',
//                         other_users: 'other_users'
//                     },
//                     fields: {
//                         'field-1': {
//                             id: 'field-1',
//                             map_to_field: false,
//                             field_to_map_to: '',
//                             type: 'single_line_text',
//                             mandatory: false,
//                             active: true,

//                             question: {
//                                 question_text: 'First Name3.2',
//                                 name: 'first_name',
//                                 rich_text: ''
//                             },

//                             question_choices: {},

//                             annotation: {
//                                 show_help: false,
//                                 always_expanded: false,
//                                 help_tag: ''
//                             },

//                             type_specifications: {
//                                 variable_width: '100%'
//                             },

//                             comments_for_developers: '',

//                             impacts_reporting: false
//                         },
//                         'field-5': {
//                             id: 'field-5',
//                             map_to_field: false,
//                             field_to_map_to: '',
//                             type: 'single_line_text',
//                             mandatory: false,
//                             active: true,

//                             question: {
//                                 question_text: 'Last Name',
//                                 name: 'last_name',
//                                 rich_text: ''
//                             },

//                             question_choices: {},

//                             annotation: {
//                                 show_help: false,
//                                 always_expanded: false,
//                                 help_tag: ''
//                             },

//                             type_specifications: {
//                                 variable_width: '100%'
//                             },

//                             comments_for_developers: '',

//                             impacts_reporting: false
//                         },
//                         'field-6': {
//                             id: 'field-6',
//                             map_to_field: false,
//                             field_to_map_to: '',
//                             type: 'single_line_text',
//                             mandatory: true,
//                             active: true,

//                             question: {
//                                 question_text: 'Account Name',
//                                 name: 'account_name',
//                                 rich_text: ''
//                             },

//                             question_choices: {},

//                             annotation: {
//                                 show_help: false,
//                                 always_expanded: false,
//                                 help_tag: ''
//                             },

//                             type_specifications: {
//                                 variable_width: '100%'
//                             },

//                             comments_for_developers: '',

//                             impacts_reporting: false
//                         },
//                         'field-2': {
//                             id: 'field-2',
//                             map_to_field: false,
//                             field_to_map_to: '',
//                             type: 'select_box',
//                             mandatory: false,
//                             active: true,

//                             question: {
//                                 question_text: 'Select Account',
//                                 name: 'select_account',
//                                 rich_text: 'rich text'
//                             },

//                             question_choices: {
//                                 'Cheque': {id: 'Cheque', value: 'Cheque'},
//                                 'Savings': {id: 'Savings', value: 'Savings'},
//                                 'Credit': {id: 'Credit', value: 'Credit'}
//                             },

//                             annotation: {
//                                 show_help: true,
//                                 always_expanded: true,
//                                 help_tag: 'This is a help_tag annotation'
//                             },

//                             type_specifications: {
//                                 variable_width: '100%'
//                             },

//                             comments_for_developers: '',

//                             impacts_reporting: false
//                         },
//                         'field-3': {
//                             id: 'field-3',
//                             map_to_field: false,
//                             field_to_map_to: '',
//                             type: 'checkbox',
//                             mandatory: true,
//                             active: true,

//                             question: {
//                                 question_text: 'I would like to tick a box',
//                                 name: 'i_would_like_to_click_a_box',
//                                 rich_text: ''
//                             },

//                             question_choices: {},

//                             annotation: {
//                                 show_help: false,
//                                 always_expanded: false,
//                                 help_tag: ''
//                             },

//                             type_specifications: {
//                                 variable_width: '100%'
//                             },

//                             comments_for_developers: '',

//                             impacts_reporting: false
//                         },
//                     },
//                     groups: {
//                         'group-1': {
//                             id: 'group-1',
//                             title: 'Request detail',
//                             column_count: 2,
//                             fieldIds: ['field-1', 'field-5', 'field-6']
//                         },
//                         'group-2': {
//                             id: 'group-2',
//                             title: '',
//                             column_count: 1,
//                             fieldIds: ['field-2', 'field-3']
//                         }
//                     },
//                     groupsOrder: ['group-1', 'group-2']

//                 }
//             }
//         },
//     }
// };
