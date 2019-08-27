package utils;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 * Date With Json Processor
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 */
public class DateJsonValueProcessor implements JsonValueProcessor {

    private static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";
    private DateFormat dateFormat;

    public DateJsonValueProcessor() {
        this(FORMAT);
    }

    public DateJsonValueProcessor(String format) {
        try {
            dateFormat = new SimpleDateFormat(format);
        } catch (Exception ex) {
            dateFormat = new SimpleDateFormat(DEFAULT_DATE_PATTERN);
        }
    }

    public Object processArrayValue(Object value, JsonConfig jsonConfig) {
        return null;
    }

    public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {
        if (value == null) {
            return "";
        }

        if (value instanceof java.sql.Timestamp) {
            return dateFormat.format((java.sql.Timestamp) value);
        }

        if (value instanceof java.util.Date) {
            return dateFormat.format((java.util.Date) value);
        }

        return value.toString();
    }
}
