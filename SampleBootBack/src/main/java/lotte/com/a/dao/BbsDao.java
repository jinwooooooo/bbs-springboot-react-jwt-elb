package lotte.com.a.dao;

import java.util.List;

import lotte.com.a.dto.CommentDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import lotte.com.a.dto.BbsDto;
import lotte.com.a.dto.BbsParam;

@Mapper
@Repository
public interface BbsDao {

	List<BbsDto> getBbsList();
	List<BbsDto> getBbsSearchList(BbsParam param);
	
	int writeBbs(BbsDto bto);
	
	List<BbsDto> getBbsSearchPageList(BbsParam param);
	int getBbsCount(BbsParam param);

	BbsDto getDetailPage(int seq);

	int updateBbs(BbsDto dto);

	int deleteBbs(int seq);

	void updateCount(int seq);

	void updateReview(BbsDto dto);

	int writeReview(BbsDto dto);

	void deleteReview(int seq);

	int writeComment(CommentDto dto);

	List<CommentDto> getComment(int seq);

	int getLog(int seq, String userId);

	void insertLog(int seq, String userId);
}
