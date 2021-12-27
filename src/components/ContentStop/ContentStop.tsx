import './styles.css'

interface Props{
    time: Time
}

interface Time{
    line: string, 
    dir: string,
    estHour: string,
    timeUntil: string
}

const ContentStop = ({time}: Props) =>{

    return(
        <div className="timenode">
            <span>{time.line}</span>
            <span>{time.dir}</span>
            <span>{time.estHour}</span>
            <span>{time.timeUntil ? time.timeUntil : "0min"}</span>
        </div>
    );
}

export default ContentStop; 