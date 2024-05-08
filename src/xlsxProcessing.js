function prepareFieldsForExcel(fields) {
    const output = [];

    // Loop through each field
    Object.values(fields).forEach((field, i) => {
        if(field.active === true){
            if(i === 0){
                const row = [];
                row.push('id');
                row.push('name');
                row.push('type');
                row.push('mandatory');
                row.push('question_text');
                row.push('rich_text');
                row.push('question_choices');
                row.push('help_tag');
                row.push('always_expanded');
                row.push('impacts_reporting');
                row.push('comments_for_developers');
        
                output.push(row);
            }
            const row = [];
            row.push(field.id);
            row.push(field.question.name);
            row.push(field.type);
            row.push(field.mandatory);
            row.push(field.question.question_text);
            row.push(field.question.rich_text);
            row.push(JSON.stringify(field.question_choices));
            row.push(field.annotation.help_tag);
            row.push(field.annotation.always_expanded);
            row.push(field.impacts_reporting);
            row.push(field.comments_for_developers);
    
            output.push(row);
        }
    });

    return output;
}

function compareVersionObjects(oldData, newData) {
    const changes = new Set();
    Object.keys(newData.fields).forEach(fieldId => {
        const oldField = oldData.fields[fieldId];
        const newField = newData.fields[fieldId];
        if (JSON.stringify(oldField) !== JSON.stringify(newField)) {
            changes.add(fieldId);
        }
    });
    return changes;
}




export { prepareFieldsForExcel, compareVersionObjects,  }
