package service.base;

import java.sql.SQLException;
import java.util.List;

public interface Service<T> {

    T get(String id) throws SQLException;

    T find(T t) throws SQLException;

    List<T> findAll() throws SQLException;

    List<T> findAll(T t) throws SQLException;

    int insert(T t) throws SQLException;

    int update(T t) throws SQLException;

    int delete(T t) throws SQLException;

    int delete(String id) throws SQLException;
}
