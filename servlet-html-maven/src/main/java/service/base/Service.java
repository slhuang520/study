package service.base;

import java.sql.SQLException;
import java.util.Map;

/**
 * Service Interface
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 * @param <T>
 */
public interface service<T> {

    Map<String, Object> findAll() throws SQLException;

    Map<String, Object> findAll(T t) throws SQLException;

    int insert(T t) throws SQLException;

    int update(T t) throws SQLException;

    int delete(String id) throws SQLException;

    int delete(T t) throws SQLException;

    int deleteByLogic(String id) throws SQLException;

    int deleteByLogic(T t) throws SQLException;

    T get(String id) throws SQLException;
}
