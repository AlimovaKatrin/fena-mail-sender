import { Card } from './Card';

export const List = ({ jobId, dictionary }) => {
  return dictionary[jobId]?.emails?.map(mail => (
    <Card key={`${jobId}-${mail?.timestamp || Math.random()}`} mail={mail} />
  ));
};
