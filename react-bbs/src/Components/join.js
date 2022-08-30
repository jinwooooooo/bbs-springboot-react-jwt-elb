import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



function Join(){

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const insertId = (e) => setUserId(e.target.value);
    const insertPassword = (e) => setPassword(e.target.value);
    const insertName = (e) => setName(e.target.value);
    const insertEmail = (e) => setEmail(e.target.value);

    let history = useNavigate();

    const insertData = async (u, p, n, e) => {
        await axios.get("http://kjw-bbs-backend.ap-northeast-2.elasticbeanstalk.com/account", { params:{ "id":u, "pwd":p, "name":n, "email":e } })
        .then(function(resp){
            if(resp.data === "OK"){
             if(!alert('회원가입 완료!')){
                window.location.href="/login";
             };
            }else{
             if(!alert('회원가입 실패!')){
                 window.location.href="/join";
             };
            }
         })
         .catch(function(error){
             alert('error');
         })
    }

    const writeBtn = () => {

        insertData(userId, password, name, email);
    }
    return(
        <div>
            <table class="table">
                <col width="200" /><col width="400" />
                
                <tr>
                    <th class="table-primary">아이디</th>
                    <td>
                    <input type="text" class="form-control" name="id" size="50px" onChange={insertId}/>
                    </td>
                </tr>
                
                <tr>
                    <th class="table-primary">비밀번호</th>
                    <td>
                        <input type="password" class="form-control" name="password" size="50px" onChange={insertPassword}/>
                    </td>
                </tr>
                
                <tr>
                    <th class="table-primary">이름</th>
                    <td>
                        <input type="text" class="form-control" name="name" size="50px" onChange={insertName}/>
                    </td>
                </tr>

                <tr>
                    <th class="table-primary">이메일</th>
                    <td>
                        <input type="text" class="form-control" name="email" size="50px" onChange={insertEmail}/>
                    </td>
                </tr>

                <tr>
                    <td colspan="2" align="center">
                        <button type="button" id="btn" class="btn btn-primary" onClick={writeBtn}>가입완료</button>
                            
                    </td>	
                </tr>
            </table>
        </div>        
    )
}

export default Join;