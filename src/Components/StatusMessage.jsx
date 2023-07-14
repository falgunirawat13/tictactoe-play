import react from "react";
const StatusMessage=({winner,isXNext,squares}) => {
 const noMovesLeft=squares.every(squareValue => squareValue !== null);   
  const nextPlayer = isXNext ? 'X' : 'O';
    const renderStatusMessage = () =>
    {
        if(winner){
            return (<div>Winner is <span className={isXNext ? 'text-green' : 'text-orange'}>{winner}</span></div>
            );
        }
        if(!winner && noMovesLeft){
            return (<react.Fragment>There is a tie between 
            <span className="text-orange"> X </span> and
            <span className="text-green"> O </span>
            </react.Fragment>
            
            );
        }
        if(!winner && !noMovesLeft){
            return <>Next player is <span className={isXNext ? 'text-green' : 'text-orange'}>{nextPlayer}</span></>;
        }
        return null;
        };  
        return <h2 className="status-message">{renderStatusMessage()}</h2>
};
export default StatusMessage;
