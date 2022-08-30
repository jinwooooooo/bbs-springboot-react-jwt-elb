package lotte.com.a.dto;

public class CommentDto {

    private int seq;
    private String id;
    private String content;

    private String wdate;
    private int detailSeq;

    public CommentDto(){

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getDetailSeq() {
        return detailSeq;
    }

    public void setDetailSeq(int detailSeq) {
        this.detailSeq = detailSeq;
    }

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public String getWdate() {
        return wdate;
    }

    public void setWdate(String wdate) {
        this.wdate = wdate;
    }
}
