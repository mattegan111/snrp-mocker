const fields = [
    {
        id: '1',
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
    {
        id: '5',
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
    {
        id: '2',
        map_to_field: false,
        field: '', // Which field to map to
        type: 'Select Box',
        mandatory: true,
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
    {
        id: '3',
        map_to_field: false,
        field: '', // Which field to map to
        type: 'CheckBox',
        mandatory: false,
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
    }
];

export default fields;