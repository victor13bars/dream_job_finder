import React from 'react';
import s from '../../index.module.css';
import ReactPaginate from "react-paginate";
import ArrowRight from "./ArrowRight";
import ArrowLeft from "./ArrowLeft";


type PaginationPropsType = {
    total: number | undefined
    page: number
    itemCount: number
    changePage: (selectedItem: { selected: number }) => void
}

const Pagination: React.FC<PaginationPropsType> = ({
                                                       total,
                                                       page,
                                                       itemCount,
                                                       changePage
                                                   }) => {
    if (!total) {
        return null
    }

    const startRepoIndex = page * itemCount - 3
    const endRepoIndex = page * itemCount
    const pageCount = Math.ceil(total / itemCount)

    return (
        <div className={s.pagination}>
            <ReactPaginate
                previousLabel={<ArrowLeft/>}
                nextLabel={<ArrowRight/>}
                forcePage={page - 1}
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={changePage}
                containerClassName={s.paginationButtons}
                previousClassName={s.arrowsPosition}
                nextClassName={s.arrowsPosition}
                // previousLinkClassName={s.previous_btn}
                // nextLinkClassName={s.next_btn}
                disabledClassName={s.pagination__disabled}
                activeClassName={s.pagination__active}
            />
        </div>
    );
};

export default Pagination;