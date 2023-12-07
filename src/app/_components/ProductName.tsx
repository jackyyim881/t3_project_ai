
type NameProps = {
    name: string;
    };

export default function ProductName( {name } : NameProps)  {
    
    return (
       <div className="">
              <span className="">{name}</span>  
       </div>
    );
};

