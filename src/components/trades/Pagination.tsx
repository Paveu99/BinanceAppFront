import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';

interface Props {
    postsPerPage: number,
    totalPosts: number,
    paginate: (pageNumber: number) => void
    page: number
}

export const Pagination = (props: Props) => {
    const [page, setPage] = useState(1)

    return <div style={{margin: "20px"}}>
        <PaginationControl
            page={props.page}
            between={4}
            total={props.totalPosts}
            limit={props.postsPerPage}
            changePage={(page) => {
                setPage(page);
                props.paginate(page)
            }}
            ellipsis={1}
        />
    </div>
}