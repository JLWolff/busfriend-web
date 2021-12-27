import ContentStop from '../ContentStop/ContentStop';

import './ContentView.css';

interface Props{
    title: string,
    data: Time[]
}

interface Time{
    line: string, 
    dir: string,
    estHour: string,
    timeUntil: string
}


const ContentView = ({title, data}: Props) =>{
    console.log(data)
    return(
        <div>
            <h2>{title}</h2>
            <div className="contentBox">
                <div className='contentTitle'>
                    <span>Linha</span>
                    <span>Direção</span>
                    <span>Hora estimada</span>
                    <span>Tempo restante</span>
                </div>
                
                {/* <div> */}
                    {data.map(time => (<ContentStop time={time}/>))}
                {/* </div> */}
            </div>
        </div>
    );
}

export default ContentView; 

