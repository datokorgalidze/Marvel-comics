import { useState, useEffect, useRef,useMemo } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';


const setContent = (process, Component, newItemLoading) => {
     switch(process){
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process');                
     }
}


const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(199);
    const [charEnded, setCharEnded] = useState(false);

   
    const  { getAllCharacters,process,setProcess} =  MarvelService();

    useEffect(() => {
        onRequest(offset,true);
          // eslint-disable-next-line
    },[])


    const  onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))         
    }
        
   
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 6) {
            ended = true;
        }

        setCharList([...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset + 9);
        setCharEnded(ended);

    }


    const  itemRefs = useRef([]);

   
      
    const focusOnItem = (id) => {
         itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
         itemRefs.current[id].classList.add('char__item_selected')
         itemRefs.current[id].focus();
     } 
     

    function  renderItems(arr) {
        const items =  arr.map((item,i) => {
           
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={`${item.id}_${i}`}
                    ref={elem => itemRefs.current[i] = elem}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
   
        return (
            <ul className="char__grid">
                {items}          
            </ul>
        )
    }
       
    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading);
        // eslint-disable-next-line
    }, [process])
        
        return (
            <div className="char__list">
               <div className='Char-list-grid'> {elements} </div>
                <button className ="button button__main button__long"
                disabled = {newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick = {() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

   


export default CharList;



