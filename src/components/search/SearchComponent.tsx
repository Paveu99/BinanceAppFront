import React, {FormEvent, useContext, useState} from "react";
import {SearchContext} from "./SearchContext";

interface Props {
    page: (pageNumber: number) => void
}

export const SearchComponent = (props: Props) => {

    const {search, setSearch} = useContext(SearchContext)

    const [inputVal, setInputVal] = useState<string>(search)

    function submitHandler(e: FormEvent) {
        e.preventDefault();
    }

    return <>
        <form onSubmit={submitHandler}>
            <input
                className="btn"
                type = "search"
                placeholder = "Type in trade name"
                value={inputVal}
                onChange={e => {
                    setInputVal(e.target.value)
                    setSearch(e.target.value)
                    props.page(1)
                    }
                }
            />
        </form>
    </>

}