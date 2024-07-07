const titleAttributes = ['type', 'title'];

const richTextLabelAttributes = [
  'type',
  'rich_text',
  'mandatory',
  'active',
  'instructions',
  'annotation.show_help',
  'annotation.always_expanded',
  'annotation.help_tag',
  'comments_for_developers',
  'impacts_reporting',
];

const defaultAttributes = [
  'type',
  'question.question_text',
  'question.name',
  'mandatory',
  'active',
  'instructions',
  'annotation.show_help',
  'annotation.always_expanded',
  'annotation.help_tag',
  'comments_for_developers',
  'impacts_reporting',
];

const booleanTypeAttributes = [
  'map_to_field',
  'mandatory',
  'active',
  'annotation.show_help',
  'annotation.always_expanded',
  'impacts_reporting',
];

const uniqueAttributes = [
  ...new Set([
    ...titleAttributes,
    ...richTextLabelAttributes,
    ...defaultAttributes,
  ]),
];

const defaultObject = {
  id: '',
  map_to_field: false,
  field_to_map_to: '',
  type: '',
  mandatory: false,
  active: true,

  question: {
    question_text: '',
    name: '',
  },

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
};

const richTextLabelObject = {
  id: '',
  map_to_field: false,
  field_to_map_to: '',
  type: '',
  mandatory: false,
  active: true,

  question: {
    question_text: '',
    name: '',
    rich_text: '',
  },

  type_specifications: {
    variable_width: '100%',
  },

  comments_for_developers: '',

  impacts_reporting: false,
};

const checkboxObject = {
  id: '',
  map_to_field: false,
  field_to_map_to: '',
  type: '',
  mandatory: false,
  active: true,

  question: {
    question_text: '',
    name: '',
    rich_text: '',
  },

  type_specifications: {
    variable_width: '100%',
  },

  comments_for_developers: '',

  impacts_reporting: false,
};

const titleObject = {
  type: 'title',
  title: '',
};

const allTypeAttributes = { //TODO this should be defined programmatically based off of the keys of the default objects
  attachment: [...defaultAttributes],
  checkbox: [...defaultAttributes],
  date: [...defaultAttributes],
  email: [...defaultAttributes],
  label: [...defaultAttributes],
  lookup_select_box: [...defaultAttributes],
  multi_line_text: [...defaultAttributes],
  multiple_choice: [...defaultAttributes, 'question_choices', 'choice_direction'],
  reference: [...defaultAttributes],
  rich_text_label: [
    ...richTextLabelAttributes, //richTextLabelAttributes
  ],
  title: [
    // aka Section or Container Start with title
    ...titleAttributes, // titleAttributes
  ],
  select_box: [...defaultAttributes, 'question_choices'],
  single_line_text: [...defaultAttributes],
  url: [...defaultAttributes],
  yes_no: [...defaultAttributes],
};

const allDefaultObjects = {
  attachment: {
    ...defaultObject,
    type: 'attachment',
  },
  checkbox: {
    ...checkboxObject,
    type: 'checkbox',
  },
  date: {
    ...defaultObject,
    type: 'date',
  },
  email: {
    ...defaultObject,
    type: 'email',
  },
  label: {
    ...defaultObject,
    type: 'label',
  },
  lookup_select_box: {
    ...defaultObject,
    type: 'lookup_select_box',
  },
  multi_line_text: {
    ...defaultObject,
    type: 'multi_line_text',
  },
  multiple_choice: {
    ...defaultObject,
    type: 'multiple_choice',
    question_choices: {},
    choice_direction: 'down'
  },
  reference: {
    ...defaultObject,
    type: 'reference',
  },
  rich_text_label: {
    ...richTextLabelObject, //richTextLabelAttributes
    type: 'rich_text_label',
  },
  title: {
    // aka Section or Container Start with title
    ...titleObject, // titleAttributes
  },
  select_box: {
    ...defaultObject,
    type: 'select_box',
    question_choices: {},
  },
  single_line_text: {
    ...defaultObject,
    type: 'single_line_text',
  },
  url: {
    ...defaultObject,
    type: 'url',
  },
  yes_no: {
    ...defaultObject,
    type: 'yes_no',
  },
};

export {
  uniqueAttributes,
  allTypeAttributes,
  defaultAttributes,
  booleanTypeAttributes,
  allDefaultObjects,
};
