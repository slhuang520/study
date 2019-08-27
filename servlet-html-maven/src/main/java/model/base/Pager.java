package model.base;

import net.sf.json.JSONObject;

import java.io.Serializable;

/**
 * Page entity
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 *
 */
public class Pager implements Serializable {
    private int pageNo;
    private int pageSize;
    private int total;
    private int start;
    private int end;
    private int records;

    public int getPageNo() {
        return pageNo > 0 ? pageNo : 1;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPageSize() {
        return pageSize > 0 ? pageSize : 5;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getStart() {
        return start > 0 ? start : 1;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getEnd() {
        return end > 0 ? end : total;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public int getRecords() {
        return records;
    }

    public void setRecords(int records) {
        this.records = records;
    }

    @Override
    public String toString() {
        return JSONObject.fromObject(this).toString();
    }
}
