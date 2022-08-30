import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



function Login(){

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const insertId = (e) => setUserId(e.target.value);
    const insertPassword = (e) => setPassword(e.target.value);

    let history = useNavigate();

    const insertData = async (u, p) => {
        await axios.get("http://kjw-bbs-backend.ap-northeast-2.elasticbeanstalk.com/login", { params:{ "id":u, "pwd":p } })
        .then(function(resp){
            //alert(resp.data.token);
            
            if(resp.data.token != null){
             if(!alert('로그인 완료!')){
                localStorage.setItem("user",resp.data.id);
                localStorage.setItem("ACCESS_TOKEN",resp.data.token);
                window.location.href="/bbslist";
             };
            }else{
             if(!alert('다시 로그인 해주세요!')){
                 window.location.href="/login";
             };
            }
         })
         .catch(function(error){
             alert('error');
         })
    }

    const writeBtn = () => {

        insertData(userId, password);
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
                    <td colspan="2" align="center">
                        <button type="button" id="btn" class="btn btn-primary" onClick={writeBtn}>로그인</button>
                            &nbsp;&nbsp;
                        <Link className="btn btn-primary" to={"/join"}>회원가입</Link>
                    </td>	
                </tr>
            </table>
        </div>        
    )
}

export default Login;