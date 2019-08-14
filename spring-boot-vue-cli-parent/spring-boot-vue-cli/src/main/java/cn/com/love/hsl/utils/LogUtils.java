package cn.com.love.hsl.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogUtils {
    /**
     * Get Business logger
     */
    public static Logger getBusinessLogger() {
        return LoggerFactory.getLogger(LogEnum.BUSINESS.getCategory());
    }

    /**
     * Get Platform logger
     */
    public static Logger getPlatformLogger() {
        return LoggerFactory.getLogger(LogEnum.PLATFORM.getCategory());
    }

    /**
     * Get DB logger
     */
    public static Logger getDBLogger() {
        return LoggerFactory.getLogger(LogEnum.DB.getCategory());
    }

    /**
     * Get normal exception logger
     */
    public static Logger getExceptionLogger() {
        return LoggerFactory.getLogger(LogEnum.EXCEPTION.getCategory());
    }
}
