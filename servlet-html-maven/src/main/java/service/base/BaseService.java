package service.base;

import model.base.BaseModel;
import model.base.Pager;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

/**
 * Base service
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 *
 * @param <T>
 */
public class BaseService<T extends BaseModel> {

    public static final String LOGIN_USER = "login_user";
    protected static final String NAME_SEARCH_SQL = " and a.name like concat('%',?,'%')";

    private HttpSession session;
    public BaseService(HttpSession session) {
        this.session = session;
    }

    protected void preInsert(T entity) {
        entity.setId(UUID.randomUUID().toString().replaceAll("-", ""));
        entity.setCreateId(((BaseModel)session.getAttribute(LOGIN_USER)).getId());
        entity.setCreateDate(new Timestamp(new Date().getTime()));
        entity.setUpdateId(((BaseModel)session.getAttribute(LOGIN_USER)).getId());
        entity.setUpdateDate(new Timestamp(new Date().getTime()));
    }

    protected void preUpdate(T entity) {
        entity.setUpdateId(((BaseModel)session.getAttribute(LOGIN_USER)).getId());
        entity.setUpdateDate(new Timestamp(new Date().getTime()));
    }

    protected void addOperatorSearch(BaseModel model, List<Object> params, StringBuffer sql) {
        if (!Objects.isNull(model.getCreator())) {
            params.add(model.getCreator().getId());
            sql.append(" and a.create_by = ?");
        }

        if (model.getCreateDate() != null) {
            params.add(model.getCreateDate());
            sql.append(" and a.create_date = ?");
        }

        if (!Objects.isNull(model.getUpdater())) {
            params.add(model.getUpdater().getId());
            sql.append(" and a.update_by = ?");
        }

        if (model.getUpdateDate() != null) {
            params.add(model.getUpdateDate());
            sql.append(" and a.update_date = ?");
        }
    }

    protected void addPageSearch(Pager pager, StringBuffer sql) {
        sql.append(" limit ");
        sql.append((pager.getPageNo() - 1) * pager.getPageSize());
        sql.append(" , ");
        sql.append(pager.getPageSize());
    }

    protected void updateOperator(BaseModel model, List<Object> params, StringBuffer sql) {
        if (!Objects.isNull(model.getUpdater())) {
            params.add(model.getUpdater().getId());
            sql.append(", update_by = ? ");
        }

        if (model.getUpdateDate() != null) {
            params.add(model.getUpdateDate());
            sql.append(", update_date = ? ");
        }
    }

    protected void insertOperatorParams(BaseModel model, List<Object> params) {
        params.add(model.getCreator().getId());
        params.add(model.getCreateDate());
        params.add(model.getUpdater().getId());
        params.add(model.getUpdateDate());
    }
}
