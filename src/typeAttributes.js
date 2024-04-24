const titleAttributes = ['type', 'title'];
const richTextLabelAttributes = ['type', 'rich_text', 'mandatory', 'active', 'instructions', 'annotation.show_help', 'annotation.always_expanded', 'annotation.help_tag', 'comments_for_developers', 'impacts_reporting'];
const defaultAttributes = ['type', 'question_text', 'mandatory', 'active', 'instructions', 'annotation.show_help', 'annotation.always_expanded', 'annotation.help_tag', 'comments_for_developers', 'impacts_reporting'];

export const typeAttributes = {
    attachment: [
        ...defaultAttributes
    ],
    break: [
        ...defaultAttributes
    ],
    checkbox: [
        ...defaultAttributes
    ],
    date: [
        ...defaultAttributes
    ],
    email: [
        ...defaultAttributes
    ],
    label: [
        ...defaultAttributes
    ],
    lookup_select_box: [
        ...defaultAttributes
    ],
    multi_line_text: [
        ...defaultAttributes
    ],
    multiple_choice: [
        ...defaultAttributes,
        'question_choices' 
    ],
    multi_row_variable: [
        'fields_to_include' // by name
    ],
    reference: [
        ...defaultAttributes
    ],
    rich_text_label: [
        {...richTextLabelAttributes} //richTextLabelAttributes
    ],
    title: [ // aka Section or Container Start with title
        {...titleAttributes}, // titleAttributes
    ],
    select_box: [
        ...defaultAttributes,
        'question_choices'
    ],
    single_line_text: [
        ...defaultAttributes
    ],
    url: [
        ...defaultAttributes
    ],
    yes_no: [
        ...defaultAttributes
    ],
}