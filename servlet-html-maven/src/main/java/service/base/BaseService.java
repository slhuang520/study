package service.base;

import model.base.BaseModel;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class BaseService<T extends BaseModel> {

    public static final String LOGIN_USER = "login_user";
    private HttpSession session;

    public BaseService(HttpSession session) {
        this.session = session;
    }

    protected void preInsert(T t){
        t.setId(UUID.randomUUID().toString().replaceAll("-", ""));
        t.setCreatorId(((BaseModel)session.getAttribute(LOGIN_USER)).getId());
        t.setCreateDate(new Date());
        t.setUpdaterId(((BaseModel)session.getAttribute(LOGIN_USER)).getId());
        t.setUpdateDate(new Date());
        t.setDelFlg(0);
    }

    protected void preUpdate(T t) {
        t.setUpdaterId(((BaseModel)session.getAttribute(LOGIN_USER)).getId());
        t.setUpdateDate(new Date());
    }

    protected void addOperatorSearch(BaseModel model, List<Object> params, StringBuffer sql) {
        if (Objects.isNull(model.getCreator())) {
            params.add(model.getCreator().getId());
            sql.append(" and create_by = ?");
        }

        if (model.getCreateDate() != null) {
            params.add(model.getCreateDate());
            sql.append(" and create_date = ?");
        }

        if (Objects.isNull(model.getUpdater())) {
            params.add(model.getUpdater().getId());
            sql.append(" and update_by = ?");
        }

        if (model.getUpdateDate() != null){
            params.add(model.getUpdateDate());
            sql.append(" and update_date = ?");
        }
    }
}
