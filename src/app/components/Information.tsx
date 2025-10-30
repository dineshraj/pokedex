interface InformationProps {
  name: string;
}

const Information = ({ name }: InformationProps) => {
  return <div data-testid="information">{name}</div>;
};

export default Information;
