import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, Route } from "react-router-dom";

import Pagination from "react-js-pagination";

import "./bbslist.css";
import "./page.css";

function Bbslist(){
    const [bbslist, setBbslist] = useState([]);

    // 검색용
    const [choiceValue, setChoiceValue] = useState("");
    const [searchValue, setSearchValue] = useState("");

    // paging
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    // link 용(함수)
    let history = useNavigate();

    //로컬 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const fetchData = async (c, s, p) => {
        await axios.get("http://kjw-bbs-backend.ap-northeast-2.elasticbeanstalk.com/getBbsReactList",
         { params:{ "choice":c, "search":s, "pageNumber":(p-1)},
           headers:{ Authorization : "Bearer " + accessToken} })
            .then(function(resp){
               //console.log(resp.data);
               setBbslist(resp.data.bbslist);

               setTotalCnt(resp.data.cnt);
            })
            .catch(function(error){
                console.log(error);
            })
    }

    useEffect( () => {
        fetchData('', '', 1);
    }, []);

    const choiceChange = (e) => setChoiceValue(e.target.value);

    const searchChange = (e) => setSearchValue(e.target.value);

    const searchBtn = () => {
        //alert(choiceValue);
        //alert(searchValue);

        history('/bbslist');

        fetchData(choiceValue, searchValue, 1);
    }

    const handlePageChange = (page) => {
        setPage(page);
        fetchData(choiceValue, searchValue, page);
    }

    return (
        <div>
            {/* 검색 */}
            <table className="search">
            
            <thead>
                <tr>
                    <td>
                        <select className="custom-select" value={choiceValue} onChange={choiceChange}>
                            <option defaultValue>선택</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                            <option value="writer">작성자</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" className="form-control" placeholder="검색어" 
                            value={searchValue} onChange={searchChange} />
                    </td>
                    <td>
                        <button type="button" className="btn btn-primary" onClick={searchBtn}>검색</button>
                    </td>                
                </tr>
            </thead>   
            </table>
            <br />

            <table className="table table-hover">
            <thead>
            <tr>
                <th>num</th>
                <th>title</th>
                <th>id</th>
                <th>readcount</th>
            </tr>
            </thead>

            <tbody>
            {
                bbslist.map( function(object, i){ 
                    return (
                        <TableRow obj={object} key={i} cnt={i + 1} />
                    )
                })
            }
            </tbody>
            </table>

            <Pagination
                activePage={page}
                itemCountPerPage={10}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange} />

            <div className="my-5 d-flex justify-content-center">
                <Link className="btn btn-primary" to="/bbswrite">글쓰기</Link>                
            </div>

        </div>
    )
}

function TableRow(props){
    
    const space = (props) => {
        const result = [];

        for(let i=0; i<props.obj.depth; i++){
            result.push("　");
        }

        return result;
    }

    return(
        <tr>
            <th>{props.cnt}</th>
            <td className="underline">
                <Link to={"/bbsdetail/"+props.obj.seq}>
                    {
                        space(props)
                    }
                    {
                        props.obj.depth > 0
                        ? <span>└ </span>
                        : null
                    }
                    
                    {props.obj.title}
                </Link>
            </td>
            <td>{props.obj.id}</td>
            <td>{props.obj.readcount}</td>
        </tr>
    )
}

export default Bbslist;