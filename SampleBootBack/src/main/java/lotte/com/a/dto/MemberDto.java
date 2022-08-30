package lotte.com.a.dto;

public class MemberDto {

	private String id;
	private String pwd;
	private String name;
	private String email;
	private int auth;
	private String token;

	public MemberDto() {
	}

	public MemberDto(String id, String pwd, String name, String email, int auth, String token) {
		super();
		this.id = id;
		this.pwd = pwd;
		this.name = name;
		this.email = email;
		this.auth = auth;
		this.token = token;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAuth() {
		return auth;
	}

	public void setAuth(int auth) {
		this.auth = auth;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "MemberDto{" +
				"id='" + id + '\'' +
				", pwd='" + pwd + '\'' +
				", name='" + name + '\'' +
				", email='" + email + '\'' +
				", auth=" + auth +
				", token='" + token + '\'' +
				'}';
	}
}
