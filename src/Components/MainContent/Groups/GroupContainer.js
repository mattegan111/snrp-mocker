import { Group } from './Group';

export function GroupContainer({ groups, groupId, fields }) {
  const group = groups[groupId];
  const fieldsOfGroup = group.fieldIds.map((fieldId) => fields[fieldId]);
  return <Group key={group.id} group={group} fields={fieldsOfGroup} />;
}
