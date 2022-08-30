package lotte.com.a.controller;

import java.util.Date;

import lotte.com.a.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lotte.com.a.dto.MemberDto;
import lotte.com.a.service.MemberService;

@RestController
public class MemberController {

	@Autowired
	MemberService service;

	@Autowired
	TokenProvider tokenProvider;

	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@RequestMapping(value = "/getId", method = RequestMethod.POST)
	public String getId(MemberDto dto) {
		System.out.println("MemberController getId " + new Date());
		boolean b = service.getId(dto);
		if (b) {
			return "NO";
		} else {
			return "OK";
		}
	}

	@RequestMapping(value = "/account", method = RequestMethod.GET)
	public String account(MemberDto dto) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		System.out.println("MemberController account " + new Date());
		dto.setPwd(passwordEncoder.encode(dto.getPwd()));

		boolean b = service.account(dto);
		if (!b) {
			return "NO";
		}

		return "OK";
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public MemberDto login(MemberDto dto) {
		System.out.println("MemberController login " + new Date());
		MemberDto mem = service.login(dto, passwordEncoder);

		if (mem != null){
			final String token = tokenProvider.create(mem);
			mem.setToken(token);
		}
		return mem;
	}
}



