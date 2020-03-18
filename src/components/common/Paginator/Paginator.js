import React, {useState} from 'react';
import classes from './Paginator.module.css';


let Paginator = (props, portionSize=10) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize); // определяет сколько должно получиться страниц, делим общее колво пользоателей на размер отображаемых на странице. Math.ceil() окрушляет в большую сторону

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let {portionNumber, setPortionNumber} = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={classes.paginator}>

            {portionNumber > 1 &&
                <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>
            }

                    { pages
                        .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                        .map(page => {
                        return <button className={props.currentPage === page && classes.selectedPage}
                                       onClick={ () => {props.onPageChanged(page)} }>{page}</button>
                    })}

            {portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>
            }

        </div>
    )
};

export default Paginator;