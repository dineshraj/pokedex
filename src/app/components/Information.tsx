import Dots from './Dots';

interface InformationProps {
  name: string;
  loading: boolean;
  description: string;
}

const Information = ({ name, loading, description }: InformationProps) => {
  return (
    <div
      data-testid="information"
      className="absolute font-mono top-[31%] right-[8.5%] w-[30%] h-[9%] flex items-center overflow-hidden"
    >
      <div className="information relative whitespace-nowrap">
        
          {
            loading ? 
              <Dots /> : 
              <>
                <span className="capitalise mr-2">{name}: </span> 
                <span>{description}</span>
              </>
          }
        
      </div>
    </div>
  );
};

export default Information;
