
type PriceTagProps = {
    price: number;
    };

export default function PriceTag( {price } : PriceTagProps)  {
    
    return (
        <div className="price-tag">
            <span className="currency">$</span>
            <span className="amount">{price}</span>

        </div>
    );
};

