const fields = [
    {
        id: '1',
        map_to_field: false,
        field: '', // Which field to map to
        type: 'Single Line Text',
        mandatory: false,
        active: true,
        order: 1,

        question: {
            question_text: 'question_text',
            name: 'name'
        },

        annotation: {
            show_help: true,
            always_expanded: true,
            help_tag: 'This is a help_tag annotation'
        },

        type_specifications: {
            variable_width: '50%'
        },

        comments_for_developers: ''
    }
];

export default fields;