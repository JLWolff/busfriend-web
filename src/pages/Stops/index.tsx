import  { useEffect, useState, ChangeEvent, SetStateAction} from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLinkedin, FiGithub } from 'react-icons/fi';
import api from '../../services/api';

import ContentView from '../../components/ContentView/ContentView';

import './style.css';

import logo from '../../assets/logo.png';

//informar o tipo da variavel

interface RecordStops{
    zone: string,
    code: string,
    name: string,
    address: string,
    sequence: number
}

interface StopsResponse{
    sort: string | null;
    recordsReturned: number,
    totalRecords: number,
    records: Array<RecordStops>,
    startIndex: number,
    dir: string
}

interface Stop{
    code: string,
    name: string
}


interface Record{
    accessibility: number,
    code: string,
    pubcode: string,
    description: string,
}

interface LinesResponse {
    sort: string | null;
    recordsReturned: number,
    totalRecords: number,
    records: Array<Record>
}

interface Line {
    name: string;
    code: string;
}

interface RecordDirection{
    descr: string,
    descr_dir: string,
    dir: number
}

interface DirectionsResponse{
    sort: string | null;
    recordsReturned: number,
    totalRecords: number,
    records: Array<RecordDirection>,
    startIndex: number,
    dir: string
}
interface Dir{
    descr: string,
    dir: number
}
interface Time{
    line: string, 
    dir: string,
    estHour: string,
    timeUntil: string
}

const Stops = () =>{
   const [lines, setLines] = useState<Line[]>([]);
   const [directions, setDirections] = useState<Dir[]>([]);
   const [stops, setStops] = useState<Stop[]>([]);
   const [times, setTimes] = useState<Time[]>([]);


   const [selectedLine, setSelectedLine] = useState<string | undefined>(undefined);
   const [selectedDir, setSelectedDir] = useState<string | undefined>(undefined);
   const [selectedStop, setSelectedStop] = useState<string | undefined>(undefined);

    useEffect(() => {
        api.get<LinesResponse>("lines")
        .then((response: { data: { records: any[]; }; }) => {
            const linesInitial = response.data.records.map((line: { description: any; code: any; }) => ({  
                "name": line.description,
                "code": line.code
            }));
            console.log(linesInitial)
            setLines(linesInitial);
        });
    }, []);

    useEffect(() => {
        if(selectedLine === undefined){
            return;
        }
            api
            .get<DirectionsResponse>(`lines/dir?line=${selectedLine}`)
            .then((response: { data: { records: any[]; }; }) => {
                const dirs = response.data.records.map((result: { descr: any; dir: any; }) => ({
                    "descr": result.descr,
                    "dir": result.dir 
                }));

                setDirections(dirs);
            })
    }, [selectedLine])
    
    useEffect(() => {
        api.get<StopsResponse>(`stops?line=${selectedLine}&dir=${selectedDir}`)
        .then((response: { data: { records: any[]; }; }) => {
            const stops = response.data.records.map((stop: { name: any; code: any; }) => ({  
                "name": stop.name,
                "code": stop.code
            }));
            setStops(stops);
        });
    }, [selectedDir]);

    useEffect(() => {
        handleTimesReq().then(() => {
            console.log("made req");
        })
    }, [selectedStop]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(selectedStop !== undefined){
                handleTimesReq().then(() => {
                    console.log("made req");
                })
            }
        }, 25000);
        return () => clearInterval(interval);
      }, [selectedStop]);

    async function handleTimesReq(){
        console.log("click")
        api.get<Time[]>(`stoptimes?stop=${selectedStop}`)
            .then((response: { data: SetStateAction<Time[]>; }) => {
                console.log(response.data)
                setTimes(response.data);
            });
    }
    function handleSelectLine(event: ChangeEvent<HTMLSelectElement>){
        const line = event.target.value;
        setStops([]);
        setSelectedStop(undefined);
        setDirections([])
        setSelectedDir(undefined);
        setSelectedLine(line); 
    }
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;
        setStops([]);
        setSelectedStop(undefined);
        setSelectedDir(city);
    }

    function handleSelectStop(event: ChangeEvent<HTMLSelectElement>){
        const stop = event.target.value;
        setSelectedStop(stop);
    }

    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="logoSVG" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form>
             <h1>Selecione a linha, a direção e a paragem desejada</h1>
                <fieldset>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Linha de Autocarro</label>
                            <select 
                            name="line" 
                            id="line" 
                            value={selectedLine}
                            onChange={handleSelectLine}
                            >
                                <option value={undefined} >Selecione uma linha</option>
                                {lines.map(uf => (
                                    <option key={uf.code} value={uf.code}>{uf.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Direção</label>
                            <select 
                            name="city" 
                            id="city"
                            value={selectedDir}
                            onChange={handleSelectCity}
                            >
                                <option value={undefined}>Selecione uma direção</option>
                                {directions.map(dir => (
                                    <option key={dir.dir} value={dir.dir}>{dir.descr}</option>
                                ))}
                            </select>
                        </div>


                        <div className="field">
                            <label htmlFor="uf">Paragem</label>
                            <select 
                            name="stop" 
                            id="stop" 
                            value={selectedStop}
                            onChange={handleSelectStop}
                            >
                                <option value={undefined} >Selecione uma paragem</option>
                                {stops.map(stop => (
                                    <option key={stop.code} value={stop.code}>{stop.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                
                {
                    times.length > 0 &&
                        <>
                        <ContentView  title={"Tempos da paragem"} data={times} handleRefresh={handleTimesReq}/>
                        </>
                    }
            </form>
            <div className='footer-class'>
            <footer>
                Developed by Joao Wolff
                <a href="https://www.linkedin.com/in/joao-lucas-wolff-3465131aa/" target="_blank">
                    <span><FiLinkedin/></span>
                </a>
                <a href="https://github.com/JLWolff" target="_blank">
                <span><FiGithub/></span>
                </a>
            </footer>
            </div>
        </div>
    );
}

export default Stops; 

