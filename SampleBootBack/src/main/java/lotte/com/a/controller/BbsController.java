package lotte.com.a.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lotte.com.a.dto.CommentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lotte.com.a.dto.BbsDto;
import lotte.com.a.dto.BbsParam;
import lotte.com.a.service.BbsService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class BbsController {

	@Autowired
	BbsService service;

	@RequestMapping(value = "/getBbsList", method = RequestMethod.GET)
	public List<BbsDto> getBbsList(@AuthenticationPrincipal String userId){
		System.out.println("BbsController getBbsList " + new Date());
		System.out.println("userId : "+userId);
		List<BbsDto> list = service.getBbsList();
		return list;
	}
	
	@RequestMapping(value = "/writeBbs", method = RequestMethod.GET)
	public String writeBbs(BbsDto dto) {
		System.out.println("BbsController writeBbs " + new Date());
		
		boolean b = service.writeBbs(dto);
		if(!b) {
			return "NO";
		}
		return "OK";
	}	
	
	@RequestMapping(value = "/getBbsSearchList", method = RequestMethod.GET)
	public List<BbsDto> getBbsSearchList(BbsParam param){
		System.out.println("BbsController getBbsSearchList " + new Date());
		
		List<BbsDto> list = service.getBbsSearchList(param);
		return list;
	}
	
	@RequestMapping(value = "/getBbsSearchPageList", method = RequestMethod.GET)
	public List<BbsDto> getBbsSearchPageList(BbsParam param){
		System.out.println("BbsController getBbsSearchPageList " + new Date());
		
		// 페이지 설정
		int sn = param.getPageNumber(); // 0 1 2 3
		int start = sn * 10 + 1;	// 1  11
		int end = (sn + 1) * 10;	// 10 20
		
		param.setStart(start);
		param.setEnd(end);
		
		return service.getBbsSearchPageList(param);		
	}

	@RequestMapping(value = "/getBbsReactList", method = RequestMethod.GET)
	public Map<String, Object> getBbsReactList(BbsParam param){
		System.out.println("BbsController getBbsSearchPageList " + new Date());

		// 페이지 설정
		int sn = param.getPageNumber(); // 0 1 2 3
		int start = sn * 10 + 1;	// 1  11
		int end = (sn + 1) * 10;	// 10 20

		param.setStart(start);
		param.setEnd(end);

		List<BbsDto> list = service.getBbsSearchPageList(param);
		int count = service.getBbsCount(param);

		Map<String, Object> map = new HashMap<>();
		map.put("bbslist", list);
		map.put("cnt", count);

		return map;
	}
	
	@RequestMapping(value = "/getBbsCount", method = RequestMethod.GET)
	public int getBbsCount(BbsParam param) {
		System.out.println("BbsController getBbsCount " + new Date());
		
		return service.getBbsCount(param);
	}

	@RequestMapping(value = "/getDetailPage", method = RequestMethod.GET)
	public BbsDto getDetailPage(int seq, String userId, HttpServletRequest request,
								HttpServletResponse response){
		System.out.println("BbsController getDetailPage " + new Date());

		BbsDto dto = service.getDetailPage(seq);
		service.updateCount(seq,userId);
		/*Cookie[] cookies = request.getCookies();
		System.out.println("cookies : "+cookies);
		System.out.println(request.getParameter("seq"));
		if (cookies != null) {
			for (Cookie cookie : cookies) {

				if (!cookie.getValue().contains(request.getParameter("seq"))) {
					cookie.setValue(cookie.getValue() + "_" + request.getParameter("seq"));
					cookie.setMaxAge(60 * 60 * 2);  *//* 쿠키 시간 *//*
					response.addCookie(cookie);
					service.updateCount(seq);
				}
			}
		} else {
			Cookie newCookie = new Cookie("visit_cookie", request.getParameter("seq"));
			newCookie.setMaxAge(60 * 60 * 2);
			response.addCookie(newCookie);
			service.updateCount(seq);
		}*/
		return dto;
	}

	@RequestMapping(value = "/updateBbs", method = RequestMethod.GET)
	public String updateBbs(BbsDto dto){
		System.out.println("BbsController updateBbs " + new Date());

		int count = service.updateBbs(dto);
		return count>=1?"OK":"FAIL";
	}

	@RequestMapping(value = "/deleteBbs", method = RequestMethod.GET)
	public String deleteBbs(int seq){
		System.out.println("BbsController deleteBbs " + new Date());

		int count = service.deleteBbs(seq);
		return count>=0?"OK":"FAIL";
	}

	@RequestMapping(value = "/writeReview", method = RequestMethod.GET)
	public String writeReview(BbsDto dto){
		System.out.println("BbsController writeReview " + new Date());

		int count = service.writeReview(dto);
		return count>=1?"OK":"FAIL";
	}

	@RequestMapping(value = "/writeComment", method = RequestMethod.GET)
	public String writeComment(CommentDto dto){
		System.out.println("BbsController writeComment " + new Date());

		int count = service.writeComment(dto);
		return count>=1?"OK":"FAIL";
	}

	@RequestMapping(value = "/getComment", method = RequestMethod.GET)
	public List<CommentDto> getComment(int seq){
		System.out.println("BbsController getComment " + new Date());

		List<CommentDto> dto = service.getComment(seq);
		return dto;
	}
}
