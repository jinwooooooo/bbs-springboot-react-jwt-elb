import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



function Bbswrite(){

    const [userId, setUserId] = useState(localStorage.getItem("user"));
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const insertId = (e) => setUserId(e.target.value);
    const insertTitle = (e) => setTitle(e.target.value);
    const insertContent = (e) => setContent(e.target.value);

    let history = useNavigate();

    //로컬 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const insertData = async (u, t, c) => {
        await axios.get("http://kjw-bbs-backend.ap-northeast-2.elasticbeanstalk.com/writeBbs",
         { params:{ "id":u, "title":t, "content":c},
           headers:{ Authorization : "Bearer " + accessToken} })
        .then(function(resp){
            if(resp.data === "OK"){
             if(!alert('글 작성 완료!')){
                 window.location.href="/bbslist";
             };
            }else{
             if(!alert('글 작성 실패!')){
                 window.location.href="/bbslist";
             };
            }
         })
         .catch(function(error){
             alert('error');
         })
    }

    const writeBtn = () => {

        insertData(userId, title, content);

        window.location.href="/bbslist";
    }
    return(
        <div>
            <table class="table">
                <col width="200" /><col width="400" />
                
                <tr>
                    <th class="table-primary">아이디</th>
                    <td>
                    <input readonly="readonly" type="text" class="form-control" name="id" size="50px" value={userId} onChange={insertId}/>
                    </td>
                </tr>
                
                <tr>
                    <th class="table-primary">제목</th>
                    <td>
                        <input type="text" class="form-control" name="title" size="50px" onChange={insertTitle}/>
                    </td>
                </tr>
                
                <tr>
                    <th class="table-primary">내용</th>
                    <td>
                        <textarea class="form-control" rows="10" name="content" onChange={insertContent}></textarea>
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

export default Bbswrite;