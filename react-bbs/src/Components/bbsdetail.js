import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./bbsdetail.css";
function Bbsdetail(){

    let data = useParams();

    // link 용(함수)
    let history = useNavigate();

    const [seq, setSeq] = useState(data.seq);
    const [bbsDetail, setBbsDetail] = useState("");
    const [detailComment, setDetailComment] = useState([]);

    const [userId, setUserId] = useState(localStorage.getItem("user"));
    const [content, setContent] = useState("");

    const insertId = (e) => setUserId(e.target.value);
    const insertContent = (e) => setContent(e.target.value);

    //로컬 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const fetchData = async (s) => {
        await axios.get("http://kjw-bbs-backend.ap-northeast-2.elasticbeanstalk.com/getDetailPage",
         { params:{ "seq":s, "userId":userId },
           headers:{ Authorization : "Bearer " + accessToken} })
            .then(function(resp){
               //console.log(resp.data);
               setBbsDetail(resp.data);
            })
            .catch(function(error){
                console.log(error);
            })
    }

    const fetchComment = async (s) => {
        await axios.get("http://kjw-bbs-backend.ap-northeast-2.elasticbeanstalk.com/getComment",
         { params:{ "seq":s },
           headers:{ Authorization : "Bearer " + accessToken} })
            .then(function(resp){
               //console.log(resp.data);
               setDetailComment(resp.data);
            })
            .catch(function(error){
                console.log(error);
            })
    }

    const deleteData = async (s) => {
        await axios.get("http://kjw-bbs-backend.ap-northeast-2.elasticbeanstalk.com/deleteBbs",
         { params:{ "seq":s },
           headers:{ Authorization : "Bearer " + accessToken} })
        .then(function(resp){
            if(resp.data === "OK"){
             if(!alert('글 삭제 완료!')){
                 window.location.href="/bbslist";
             };
            }else{
             if(!alert('글 삭제 실패!')){
                 window.location.href="/bbslist";
             };
            }
         })
         .catch(function(error){
             alert('error');
         })
            .catch(function(error){
                console.log(error);
            })
    }

    const insertData = async (u, c, d) => {
        await axios.get("http://kjw-bbs-backend.ap-northeast-2.elasticbeanstalk.com/writeComment",
         { params:{ "id":u, "content":c, "detailSeq":d},
           headers:{ Authorization : "Bearer " + accessToken} })
        .then(function(resp){
            if(resp.data === "OK"){
             if(!alert('코멘트 작성 완료!')){
                fetchComment(seq);
             };
            }else{
             if(!alert('코멘트 작성 실패!')){
                window.location.href="/bbsdetail/"+seq;
             };
            }
         })
         .catch(function(error){
             alert('error');
         })
    }

    useEffect( () => {
        fetchData(seq);
        fetchComment(seq);
    }, []);

    const bbsdelete = () => {
        deleteData(seq);
    }

    const insertComment = () => {
        if (localStorage.getItem("user") != null){
            insertData(userId, content, seq);
        } else {
            alert("로그인 후 댓글 작성 가능합니다.");
        }
    }

    const bbsreply = () => {
        if (localStorage.getItem("user") != null){
            window.location.href="/bbsreply/"+bbsDetail.seq;
        } else {
            alert("로그인 후 댓글 작성 가능합니다.");
        }
    }

    return(
        <div>
            <table class="table">
                <col width="200" /><col width="400" />
                
                <tr>
                    <th class="table-primary">아이디</th>
                    <td>
                        <input readonly="readonly" type="text" class="form-control" id="id" name="id" size="50px" value={bbsDetail.id} />
                    </td>
                </tr>
                
                <tr>
                    <th class="table-primary">제목</th>
                    <td>
                        <input readonly="readonly" type="text" class="form-control" id="title" name="title" size="50px" value={bbsDetail.title} />
                    </td>
                </tr>
                
                <tr>
                    <th class="table-primary">작성일시</th>
                    <td>
                        <input readonly="readonly" type="text" class="form-control" id="title" name="title" size="50px" value={bbsDetail.wdate} />
                    </td>
                </tr>

                <tr>
                    <th class="table-primary">조회수</th>
                    <td>
                        <input readonly="readonly" type="text" class="form-control" id="title" name="title" size="50px" value={bbsDetail.readcount} />
                    </td>
                </tr>

                <tr>
                    <th class="table-primary">내용</th>
                    <td>
                        <textarea readonly="readonly" class="form-control" rows="10" id="content" name="content" value={bbsDetail.content}></textarea>
                    </td>
                </tr>
                <Detaildelete />
                
                <tr><div>&nbsp;</div></tr>
                <tr><div>&nbsp;</div></tr>
                <tr><div>&nbsp;</div></tr>
                <tr>
                    <td colSpan="2" align="center">
                        <th class="table-warning">COMMENT</th>
                    </td>
                </tr>
                <tr>
                    <th class="table-warning">작성자</th>
                    <td>
                        <input readonly="readonly" type="text" class="form-control" id="commentId" name="commentId" value={userId} onChange={insertId} size="50px" />
        
                    </td>
                </tr>
                <tr>
                    <th class="table-warning">내용</th>
                    <td>
                        <textarea class="form-control" rows="5" id="commentContent" name="commentContent" onChange={insertContent}></textarea>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2" align="center">
                    <button type="button" id="btn" class="btn btn-warning" onClick={insertComment}>등록</button>
                    </td>
                </tr>
                <tr><div>&nbsp;</div></tr>
                <tr><div>&nbsp;</div></tr>

                {
                    detailComment.map( function(object, i){ 
                        return (
                            <TableRow obj={object} key={i} cnt={i + 1} />
                        )
                    })
                }
            </table>
        </div>
    )

    function TableRow(props){
        return(
            <div className="commentDiv">
                <tr>
                    <th class="table-success">작성자</th>
                    <td>
                        <input readonly="readonly" type="text" class="form-control" size="50px" value={props.obj.id}/>
    
                    </td>
                </tr>
                <tr>
                    <th class="table-success">작성일자</th>
                    <td>
                    <input readonly="readonly" type="text" class="form-control" size="50px" value={props.obj.wdate}/>
                    </td>
                </tr>
                <tr>
                    <th class="table-success">내용</th>
                    <td>
                        <textarea readonly="readonly" class="form-control" rows="5" value={props.obj.content}></textarea>
                    </td>
                </tr>
                <tr><div>&nbsp;</div></tr>
                <tr><div>&nbsp;</div></tr>
            </div>
      
            
        )
    }

    function Detaildelete(){
        
        if(localStorage.getItem("user") === bbsDetail.id){
            return(
                <tr>
                    <td colSpan="2" align="center">
                    
                    <Link className="btn btn-primary" to={"/bbsupdate/"+bbsDetail.seq}>수정</Link>
                    &nbsp;&nbsp;
                    <button type="button" id="btn" class="btn btn-primary" onClick={bbsdelete}>삭제</button>
                    &nbsp;&nbsp;
                    <button type="button" id="btn" class="btn btn-primary" onClick={bbsreply}>댓글</button>
                    </td>	
                </tr>
            )
        }
        else{
            return(
                <tr>
                    <td colSpan="2" align="center">
                    <button type="button" id="btn" class="btn btn-primary" onClick={bbsreply}>댓글</button>
                    </td>	
                </tr>
            )
        }
    }
}
export default Bbsdetail;