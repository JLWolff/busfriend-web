import ContentStop from '../ContentStop/ContentStop';

import { FiRefreshCcw } from 'react-icons/fi';

import './ContentView.css';

interface Props{
    title: string,
    data: Time[],
    handleRefresh: Function
}

interface Time{
    line: string, 
    dir: string,
    estHour: string,
    timeUntil: string
}


const ContentView = ({title, data, handleRefresh}: Props) =>{
    console.log(data)
    return(
        <div>
            <div className='title-times'>
            <h2>{title}</h2>
            <span onClick={() => handleRefresh()} ><FiRefreshCcw /></span>
            </div>
            
            <div className="contentBox">
                <div className='contentTitle'>
                    <span>Linha</span>
                    <span>Direção</span>
                    <span>Hora estimada</span>
                    <span>Tempo restante</span>
                </div>
                
                {/* <div> */}
                    {data.map(time => (<ContentStop key={time.estHour}time={time}/>))}
                {/* </div> */}
            </div>
        </div>
    );
}

export default ContentView; 

