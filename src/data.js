export const data = {
    fields: {
        'field-1': {
            id: 'field-1',
            map_to_field: false,
            field: '', // Which field to map to
            type: 'Single Line Text',
            mandatory: false,
            active: true,

            question: {
                question_text: 'question_text',
                name: 'First Name',
                rich_text: ''
            },

            question_choices: [],

            annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: ''
            },

            type_specifications: {
                variable_width: '50%'
            },

            comments_for_developers: ''
        },
        'field-5': {
            id: 'field-5',
            map_to_field: false,
            field: '', // Which field to map to
            type: 'Single Line Text',
            mandatory: false,
            active: true,

            question: {
                question_text: 'question_text',
                name: 'Last Name',
                rich_text: ''
            },

            question_choices: [],

            annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: ''
            },

            type_specifications: {
                variable_width: '50%'
            },

            comments_for_developers: ''
        },
        'field-6': {
            id: 'field-6',
            map_to_field: false,
            field: '', // Which field to map to
            type: 'Single Line Text',
            mandatory: true,
            active: true,

            question: {
                question_text: 'question_text',
                name: 'Account Name',
                rich_text: ''
            },

            question_choices: [],

            annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: ''
            },

            type_specifications: {
                variable_width: '50%'
            },

            comments_for_developers: ''
        },
        'field-2': {
            id: 'field-2',
            map_to_field: false,
            field: '', // Which field to map to
            type: 'Select Box',
            mandatory: false,
            active: true,

            question: {
                question_text: 'question_text',
                name: 'Select Account',
                rich_text: 'rich text'
            },

            question_choices: ['Cheque', 'Savings', 'Credit'],

            annotation: {
                show_help: true,
                always_expanded: true,
                help_tag: 'This is a help_tag annotation'
            },

            type_specifications: {
                variable_width: '50%'
            },

            comments_for_developers: ''
        },
        'field-3': {
            id: 'field-3',
            map_to_field: false,
            field: '', // Which field to map to
            type: 'CheckBox',
            mandatory: true,
            active: true,

            question: {
                question_text: 'question_text',
                name: 'I would like to tick a box',
                rich_text: ''
            },

            question_choices: [],

            annotation: {
                show_help: false,
                always_expanded: false,
                help_tag: ''
            },

            type_specifications: {
                variable_width: '100%'
            },

            comments_for_developers: ''
        },
    },
    groups: {
        'group-1': {
            id: 'group-1',
            column_count: 2,
            fieldIds: ['field-1', 'field-5', 'field-6']
        },
        'group-2': {
            id: 'group-2',
            column_count: 1,
            fieldIds: ['field-2', 'field-3']
        }
    },
    groupsOrder: ['group-1', 'group-2']
};