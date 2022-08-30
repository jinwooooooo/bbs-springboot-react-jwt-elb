package lotte.com.a.service;

import java.util.List;

import lotte.com.a.dto.CommentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lotte.com.a.dao.BbsDao;
import lotte.com.a.dto.BbsDto;
import lotte.com.a.dto.BbsParam;

@Service
@Transactional
public class BbsService {

	@Autowired
	BbsDao dao;
	
	public List<BbsDto> getBbsList() {
		return dao.getBbsList();
	}
	
	public boolean writeBbs(BbsDto dto) {
		int n = dao.writeBbs(dto);
		return n>0;
	}
	
	public List<BbsDto> getBbsSearchList(BbsParam param) {
		return dao.getBbsSearchList(param);
	}
	
	public List<BbsDto> getBbsSearchPageList(BbsParam param) {
		return dao.getBbsSearchPageList(param);
	}
	
	public int getBbsCount(BbsParam param) {
		return dao.getBbsCount(param);
	}

	public BbsDto getDetailPage(int seq) {
		return dao.getDetailPage(seq);
	}

	public void updateCount(int seq, String userId) {
		if (dao.getLog(seq, userId) == 0) {
			dao.updateCount(seq);
			dao.insertLog(seq,userId);
		}
	}

	public int updateBbs(BbsDto dto) {
		return dao.updateBbs(dto);
	}

	public int deleteBbs(int seq) {
		dao.deleteReview(seq);
		return dao.deleteBbs(seq);
	}

	public int writeReview(BbsDto dto) {
		dao.updateReview(dto);
		return dao.writeReview(dto);
	}

	public int writeComment(CommentDto dto) {
		return dao.writeComment(dto);
	}

	public List<CommentDto> getComment(int seq) {
		return dao.getComment(seq);
	}
}