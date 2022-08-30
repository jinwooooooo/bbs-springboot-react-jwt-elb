import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



function Bbsreply(){

    let data = useParams();

    const [seq, setSeq] = useState(data.seq);
    const [userId, setUserId] = useState(localStorage.getItem("user"));
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const replyId = (e) => setUserId(e.target.value);
    const replyTitle = (e) => setTitle(e.target.value);
    const replyContent = (e) => setContent(e.target.value);

    let history = useNavigate();

    //로컬 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const insertData = async (s, u, t, c) => {
        await axios.get("http://kjw-bbs-backend.ap-northeast-2.elasticbeanstalk.com/writeReview",
         { params:{"seq":s, "id":u, "title":t, "content":c},
           headers:{ Authorization : "Bearer " + accessToken} })
            .then(function(resp){
               if(resp.data === "OK"){
                if(!alert('답글 작성 완료!')){
                    window.location.href="/bbslist";
                };
               }else{
                if(!alert('답글 작성 실패!')){
                    window.location.href="/bbslist";
                };
               }
            })
            .catch(function(error){
                alert('error');
            })
    }

    const writeBtn = () => {

        insertData(seq, userId, title, content);
    }
    return(
        <div>
            <table class="table">
                <col width="200" /><col width="400" />
                
                <tr>
                    <th class="table-primary">아이디</th>
                    <td>
                    <input readonly="readonly" type="text" class="form-control" name="id" size="50px" value={userId} onChange={replyId}/>
                    </td>
                </tr>
                
                <tr>
                    <th class="table-primary">제목</th>
                    <td>
                        <input type="text" class="form-control" name="title" size="50px" onChange={replyTitle}/>
                    </td>
                </tr>
                
                <tr>
                    <th class="table-primary">내용</th>
                    <td>
                        <textarea class="form-control" rows="10" name="content" onChange={replyContent}></textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <button type="button" id="btn" class="btn btn-primary" onClick={writeBtn}>작성완료</button>
                    </td>	
                </tr>
            </table>
        </div>        
    )
}

export default Bbsreply;