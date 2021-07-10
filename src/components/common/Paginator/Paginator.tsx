import s from "./Paginator.module.css";
import React, {useState} from "react";
import classNames from 'classnames/bind';
import cn from 'classnames';

type PropsType = {
    onPageChange: (pageNumber: number) => void
    currentPage: number
    pageSize: number
    totalUsersCount: number
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({onPageChange, currentPage,
                                            pageSize, totalUsersCount,
                                            portionSize = 10}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    // let cn = classNames.bind(s)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={cn(s.paginator)}>

            <button onClick={() => setPortionNumber(portionNumber - 1)}
                    disabled={!(portionNumber > 1)}>Prev</button>

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                return <span key={p} onClick={(e) => onPageChange(p)}
                             className={cn({[s.selectedPage]: currentPage === p}, s.page)}>{p}</span>
            })}
            <button onClick={() => setPortionNumber(portionNumber + 1)}
                    disabled={!(portionCount > portionNumber)}>Next</button>
        </div>
    )

}

export default Paginator;
