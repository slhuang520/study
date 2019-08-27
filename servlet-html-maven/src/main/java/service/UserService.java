package service;

import model.User;
import service.base.Service;

import java.sql.SQLException;

public interface UserService extends Service<User> {
    User find(User user) throws SQLException;
}
